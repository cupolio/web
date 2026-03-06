"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  parseEducation,
  parseWorkExp,
  parseActivity,
  parseLink,
  parseCert,
  toDbDate,
} from "./parse-form";

type ActionResult = { success: true } | { success: false; error: string };

async function getAuthAndMember() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login?next=/resume");
  }

  const admin = createAdminClient();
  const { data: member, error: memberError } = await admin
    .from("member")
    .select("id")
    .eq("uid", user.id)
    .is("deleted", null)
    .maybeSingle();

  if (memberError || !member) {
    redirect("/login?next=/resume");
  }

  return { admin, member: member as { id: number }, user };
}

async function getOrCreateResumeId(
  admin: SupabaseClient,
  memberId: number,
  location = ""
): Promise<number> {
  const { data: existing } = await admin
    .from("resume")
    .select("id")
    .eq("member_id", memberId)
    .is("deleted", null)
    .order("created", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing) {
    return (existing as { id: number }).id;
  }

  const now = new Date().toISOString();
  const { data: newResume, error } = await admin
    .from("resume")
    .insert({
      cid: crypto.randomUUID().slice(0, 8),
      member_id: memberId,
      visibility: 1,
      location: location || "",
      created: now,
      updated: now,
    })
    .select("id")
    .single();

  if (error || !newResume) {
    throw new Error(`이력서 생성에 실패했습니다: ${error?.message ?? "알 수 없는 오류"}`);
  }

  return (newResume as { id: number }).id;
}

export async function saveBasicInfo(
  displayName: string,
  location: string,
  introduction: string
): Promise<ActionResult> {
  try {
    const { admin, member } = await getAuthAndMember();
    const now = new Date().toISOString();

    await admin
      .from("member")
      .update({ display_name: displayName.trim() || null, updated: now })
      .eq("id", member.id);

    const resumeId = await getOrCreateResumeId(admin, member.id, location);

    await admin
      .from("resume")
      .update({ location: location.trim() || "", updated: now })
      .eq("id", resumeId);

    await admin
      .from("introduction")
      .update({ deleted: now })
      .eq("resume_id", resumeId)
      .is("deleted", null);

    if (introduction.trim()) {
      await admin.from("introduction").insert({
        resume_id: resumeId,
        description: introduction.trim(),
        created: now,
        updated: now,
      });
    }

    revalidatePath("/resume");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "저장에 실패했습니다." };
  }
}

export async function savePreference(
  desiredJob: string,
  desiredLocation: string,
  employmentType: string
): Promise<ActionResult> {
  try {
    const { admin, member } = await getAuthAndMember();
    const now = new Date().toISOString();
    const resumeId = await getOrCreateResumeId(admin, member.id);

    await admin
      .from("preference")
      .update({ deleted: now })
      .eq("resume_id", resumeId)
      .is("deleted", null);

    if (desiredJob || desiredLocation || employmentType) {
      await admin.from("preference").insert({
        resume_id: resumeId,
        desired_job: desiredJob.trim() || "-",
        desired_location: desiredLocation.trim() || "-",
        employment_type: employmentType.trim() || "정규직",
        created: now,
        updated: now,
      });
    }

    revalidatePath("/resume");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "저장에 실패했습니다." };
  }
}

export async function saveEducation(educations: unknown[]): Promise<ActionResult> {
  try {
    const { admin, member } = await getAuthAndMember();
    const now = new Date().toISOString();
    const resumeId = await getOrCreateResumeId(admin, member.id);

    await admin
      .from("education")
      .update({ deleted: now })
      .eq("resume_id", resumeId)
      .is("deleted", null);

    for (const e of educations) {
      const ed = parseEducation(e);
      if (!ed.name || !ed.start_date) continue;
      await admin.from("education").insert({
        resume_id: resumeId,
        name: ed.name,
        major: ed.major || null,
        start_date: toDbDate(ed.start_date),
        end_date: ed.end_date ? toDbDate(ed.end_date) : null,
        status: ed.status || "GRADUATED",
        created: now,
        updated: now,
      });
    }

    revalidatePath("/resume");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "저장에 실패했습니다." };
  }
}

export async function saveWorkExperiences(workExperiences: unknown[]): Promise<ActionResult> {
  try {
    const { admin, member } = await getAuthAndMember();
    const now = new Date().toISOString();
    const resumeId = await getOrCreateResumeId(admin, member.id);

    const workExpRows = await admin
      .from("work_experience")
      .select("id")
      .eq("resume_id", resumeId)
      .is("deleted", null);
    const weIds = (workExpRows.data ?? []).map((w) => (w as { id: number }).id);
    if (weIds.length > 0) {
      await admin
        .from("performance")
        .update({ deleted: now })
        .in("work_experience_id", weIds)
        .is("deleted", null);
    }
    await admin
      .from("work_experience")
      .update({ deleted: now })
      .eq("resume_id", resumeId)
      .is("deleted", null);

    for (const w of workExperiences) {
      const we = parseWorkExp(w);
      if (!we.name || !we.position || !we.start_date) continue;
      const { data: weRow } = await admin
        .from("work_experience")
        .insert({
          resume_id: resumeId,
          name: we.name,
          position: we.position,
          start_date: toDbDate(we.start_date),
          end_date: we.employed ? null : we.end_date ? toDbDate(we.end_date) : null,
          employed: we.employed ?? 0,
          created: now,
          updated: now,
        })
        .select("id")
        .single();
      if (weRow && we.performances?.length) {
        const weId = weRow.id as number;
        for (const desc of we.performances) {
          const d = String(desc).trim();
          if (!d) continue;
          await admin.from("performance").insert({
            work_experience_id: weId,
            description: d,
            created: now,
            updated: now,
          });
        }
      }
    }

    revalidatePath("/resume");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "저장에 실패했습니다." };
  }
}

export async function saveActivities(activities: unknown[]): Promise<ActionResult> {
  try {
    const { admin, member } = await getAuthAndMember();
    const now = new Date().toISOString();
    const resumeId = await getOrCreateResumeId(admin, member.id);

    await admin
      .from("activity")
      .update({ deleted: now })
      .eq("resume_id", resumeId)
      .is("deleted", null);

    for (const a of activities) {
      const ac = parseActivity(a);
      if (!ac.name || !ac.start_date) continue;
      await admin.from("activity").insert({
        resume_id: resumeId,
        name: ac.name,
        description: ac.description || null,
        finished: ac.finished ?? 0,
        start_date: toDbDate(ac.start_date),
        end_date: ac.end_date ? toDbDate(ac.end_date) : null,
        created: now,
        updated: now,
      });
    }

    revalidatePath("/resume");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "저장에 실패했습니다." };
  }
}

export async function saveSkills(skills: string): Promise<ActionResult> {
  try {
    const { admin, member } = await getAuthAndMember();
    const now = new Date().toISOString();
    const resumeId = await getOrCreateResumeId(admin, member.id);

    await admin
      .from("resume_skill")
      .update({ deleted: now })
      .eq("resume_id", resumeId)
      .is("deleted", null);

    const skillNames = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const name of skillNames) {
      const { data: existing } = await admin
        .from("skill")
        .select("id")
        .ilike("name", name)
        .is("deleted", null)
        .maybeSingle();
      let skillId: number;
      if (existing) {
        skillId = (existing as { id: number }).id;
      } else {
        const { data: newSkill } = await admin
          .from("skill")
          .insert({ name, created: now, updated: now })
          .select("id")
          .single();
        skillId = (newSkill as { id: number })?.id;
      }
      if (skillId) {
        await admin.from("resume_skill").insert({
          resume_id: resumeId,
          skill_id: skillId,
          created: now,
          updated: now,
        });
      }
    }

    revalidatePath("/resume");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "저장에 실패했습니다." };
  }
}

export async function saveLinks(links: unknown[]): Promise<ActionResult> {
  try {
    const { admin, member } = await getAuthAndMember();
    const now = new Date().toISOString();
    const resumeId = await getOrCreateResumeId(admin, member.id);

    await admin
      .from("link")
      .update({ deleted: now })
      .eq("resume_id", resumeId)
      .is("deleted", null);

    for (const l of links) {
      const ln = parseLink(l);
      if (!ln.url?.trim()) continue;
      await admin.from("link").insert({
        resume_id: resumeId,
        url: ln.url.trim(),
        type: ln.type || "SNS",
        created: now,
        updated: now,
      });
    }

    revalidatePath("/resume");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "저장에 실패했습니다." };
  }
}

export async function saveIntroduction(introduction: string): Promise<ActionResult> {
  try {
    const { admin, member } = await getAuthAndMember();
    const now = new Date().toISOString();
    const resumeId = await getOrCreateResumeId(admin, member.id);

    await admin
      .from("introduction")
      .update({ deleted: now })
      .eq("resume_id", resumeId)
      .is("deleted", null);

    if (introduction.trim()) {
      await admin.from("introduction").insert({
        resume_id: resumeId,
        description: introduction.trim(),
        created: now,
        updated: now,
      });
    }

    revalidatePath("/resume");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "저장에 실패했습니다." };
  }
}

export async function saveCertifications(certifications: unknown[]): Promise<ActionResult> {
  try {
    const { admin, member } = await getAuthAndMember();
    const now = new Date().toISOString();
    const resumeId = await getOrCreateResumeId(admin, member.id);

    await admin
      .from("certification_award")
      .update({ deleted: now })
      .eq("resume_id", resumeId)
      .is("deleted", null);

    for (const c of certifications) {
      const ca = parseCert(c);
      if (!ca.name) continue;
      await admin.from("certification_award").insert({
        resume_id: resumeId,
        name: ca.name,
        organization: ca.organization || null,
        date: ca.date ? toDbDate(ca.date) : null,
        description: ca.description || "",
        type: ca.type || "CERTIFICATION",
        created: now,
        updated: now,
      });
    }

    revalidatePath("/resume");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "저장에 실패했습니다." };
  }
}
