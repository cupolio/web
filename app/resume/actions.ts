"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ResumeWithRelations } from "@/lib/resume/types";
import { parseFormData } from "./actions/parse-form";
import { insertResumeRelations } from "./actions/insert-resume-relations";

export async function getResumeData(): Promise<{
  resume: ResumeWithRelations | null;
  member: { id: number; email: string; profile_image_url: string } | null;
  displayName: string;
  error?: string;
}> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { resume: null, member: null, displayName: "", error: "unauthorized" };
  }

  let displayName =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split("@")[0] ??
    "회원";

  const admin = createAdminClient();

  const { data: member, error: memberError } = await admin
    .from("member")
    .select("id, email, profile_image_url, display_name")
    .eq("uid", user.id)
    .is("deleted", null)
    .maybeSingle();

  if (memberError || !member) {
    return { resume: null, member: null, displayName, error: "member_not_found" };
  }

  const memberDisplayName = (member as { display_name?: string | null }).display_name?.trim();
  if (memberDisplayName) {
    displayName = memberDisplayName;
  }

  const { data: resumeRow, error: resumeError } = await admin
    .from("resume")
    .select("*")
    .eq("member_id", member.id)
    .is("deleted", null)
    .order("created", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (resumeError) {
    return {
      resume: null,
      member: { ...member, id: member.id as number },
      displayName,
      error: "resume_fetch_error",
    };
  }

  if (!resumeRow) {
    return {
      resume: null,
      member: { ...member, id: member.id as number },
      displayName,
    };
  }

  const resumeId = resumeRow.id as number;

  const [
    workExpRes,
    educationRes,
    activityRes,
    certRes,
    prefRes,
    linkRes,
    introRes,
    resumeSkillRes,
    resumeLangRes,
  ] = await Promise.all([
    admin
      .from("work_experience")
      .select("*")
      .eq("resume_id", resumeId)
      .is("deleted", null)
      .order("start_date", { ascending: false }),
    admin
      .from("education")
      .select("*")
      .eq("resume_id", resumeId)
      .is("deleted", null)
      .order("start_date", { ascending: false }),
    admin
      .from("activity")
      .select("*")
      .eq("resume_id", resumeId)
      .is("deleted", null)
      .order("start_date", { ascending: false }),
    admin
      .from("certification_award")
      .select("*")
      .eq("resume_id", resumeId)
      .is("deleted", null)
      .order("date", { ascending: false }),
    admin
      .from("preference")
      .select("*")
      .eq("resume_id", resumeId)
      .is("deleted", null)
      .maybeSingle(),
    admin.from("link").select("*").eq("resume_id", resumeId).is("deleted", null),
    admin
      .from("introduction")
      .select("*")
      .eq("resume_id", resumeId)
      .is("deleted", null)
      .maybeSingle(),
    admin.from("resume_skill").select("skill_id").eq("resume_id", resumeId).is("deleted", null),
    admin
      .from("resume_language")
      .select("language_id, description")
      .eq("resume_id", resumeId)
      .is("deleted", null),
  ]);

  const skillIds = (resumeSkillRes.data ?? [])
    .map((r) => (r as { skill_id: number }).skill_id)
    .filter(Boolean);
  const skills =
    skillIds.length > 0
      ? ((await admin.from("skill").select("id, name").in("id", skillIds).is("deleted", null))
          .data ?? [])
      : [];

  const langIds = (resumeLangRes.data ?? [])
    .map((r) => (r as { language_id: number }).language_id)
    .filter(Boolean);
  const languages =
    langIds.length > 0
      ? ((await admin.from("language").select("id, name").in("id", langIds).is("deleted", null))
          .data ?? [])
      : [];
  const resumeLanguages = (resumeLangRes.data ?? []).map((r) => {
    const rl = r as { language_id: number; description: string | null };
    const lang = languages.find((l) => (l as { id: number }).id === rl.language_id);
    return {
      name: (lang as { name: string })?.name ?? "",
      description: rl.description,
    };
  });

  const workExpIds = (workExpRes.data ?? []).map((w) => (w as { id: number }).id);
  const performanceRes =
    workExpIds.length > 0
      ? await admin
          .from("performance")
          .select("*")
          .in("work_experience_id", workExpIds)
          .is("deleted", null)
      : { data: [] };

  const performancesByWe = (performanceRes.data ?? []).reduce(
    (acc, p) => {
      const weId = (p as { work_experience_id: number }).work_experience_id;
      if (!acc[weId]) acc[weId] = [];
      acc[weId].push({
        id: (p as { id: number }).id,
        work_experience_id: weId,
        description: (p as { description: string | null }).description,
      });
      return acc;
    },
    {} as Record<number, { id: number; work_experience_id: number; description: string | null }[]>,
  );

  const workExperiences = (workExpRes.data ?? []).map((w) => {
    const we = w as {
      id: number;
      name: string;
      position: string;
      start_date: string;
      end_date: string | null;
      employed: number;
    };
    return {
      id: we.id,
      resume_id: resumeId,
      name: we.name,
      position: we.position,
      start_date: we.start_date,
      end_date: we.end_date,
      employed: we.employed,
      performances: performancesByWe[we.id] ?? [],
    };
  });

  const resume: ResumeWithRelations = {
    ...resumeRow,
    member: { ...member, uid: user.id, id: member.id as number },
    work_experiences: workExperiences,
    educations: educationRes.data ?? [],
    activities: activityRes.data ?? [],
    certification_awards: certRes.data ?? [],
    skills: skills as { id: number; name: string }[],
    preference: prefRes.data ?? undefined,
    links: linkRes.data ?? [],
    introduction: introRes.data ?? undefined,
    resume_languages: resumeLanguages,
  };

  return {
    resume,
    member: { ...member, id: member.id as number },
    displayName,
  };
}

export async function createResumeWithData(formData: FormData) {
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

  const cid = crypto.randomUUID().slice(0, 8);
  const now = new Date().toISOString();
  const memberId = member.id as number;
  const data = parseFormData(formData);

  await admin
    .from("member")
    .update({ display_name: data.displayName || null, updated: now })
    .eq("id", memberId);

  const { data: resumeRow, error: resumeErr } = await admin
    .from("resume")
    .insert({
      cid,
      member_id: memberId,
      visibility: 1,
      location: data.location || "",
      created: now,
      updated: now,
    })
    .select("id")
    .single();

  if (resumeErr || !resumeRow) {
    console.error("[createResumeWithData] resume insert:", resumeErr);
    throw new Error(`이력서 생성에 실패했습니다: ${resumeErr?.message ?? "알 수 없는 오류"}`);
  }

  const resumeId = resumeRow.id as number;
  await insertResumeRelations(admin, resumeId, data, now);

  revalidatePath("/resume");
  redirect("/resume");
}

export async function updateResumeWithData(resumeId: number, formData: FormData) {
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

  const { data: existingResume } = await admin
    .from("resume")
    .select("id")
    .eq("id", resumeId)
    .eq("member_id", member.id)
    .is("deleted", null)
    .maybeSingle();

  if (!existingResume) {
    throw new Error("이력서를 찾을 수 없습니다.");
  }

  const now = new Date().toISOString();
  const data = parseFormData(formData);

  await admin
    .from("member")
    .update({ display_name: data.displayName || null, updated: now })
    .eq("id", member.id);

  await admin
    .from("resume")
    .update({ location: data.location || "", updated: now })
    .eq("id", resumeId);

  await Promise.all([
    admin.from("preference").update({ deleted: now }).eq("resume_id", resumeId).is("deleted", null),
    admin.from("education").update({ deleted: now }).eq("resume_id", resumeId).is("deleted", null),
    admin.from("activity").update({ deleted: now }).eq("resume_id", resumeId).is("deleted", null),
    admin
      .from("certification_award")
      .update({ deleted: now })
      .eq("resume_id", resumeId)
      .is("deleted", null),
    admin.from("link").update({ deleted: now }).eq("resume_id", resumeId).is("deleted", null),
    admin
      .from("introduction")
      .update({ deleted: now })
      .eq("resume_id", resumeId)
      .is("deleted", null),
    admin
      .from("resume_skill")
      .update({ deleted: now })
      .eq("resume_id", resumeId)
      .is("deleted", null),
  ]);

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

  await insertResumeRelations(admin, resumeId, data, now);

  revalidatePath("/resume");
  redirect("/resume");
}
