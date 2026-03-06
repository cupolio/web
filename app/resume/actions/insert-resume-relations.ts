import type { SupabaseClient } from "@supabase/supabase-js";
import {
  parseEducation,
  parseWorkExp,
  parseActivity,
  parseLink,
  parseCert,
  toDbDate,
  type ParsedFormData,
} from "./parse-form";

export async function insertResumeRelations(
  admin: SupabaseClient,
  resumeId: number,
  data: ParsedFormData,
  now: string
) {
  const {
    desiredJob,
    desiredLocation,
    employmentType,
    introductionDesc,
    skillsStr,
    educations,
    workExperiences,
    activities,
    links,
    certificationAwards,
  } = data;

  if (desiredJob || desiredLocation || employmentType) {
    await admin.from("preference").insert({
      resume_id: resumeId,
      desired_job: desiredJob || "-",
      desired_location: desiredLocation || "-",
      employment_type: employmentType || "-",
      created: now,
      updated: now,
    });
  }

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

  const skillNames = skillsStr
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

  if (introductionDesc) {
    await admin.from("introduction").insert({
      resume_id: resumeId,
      description: introductionDesc,
      created: now,
      updated: now,
    });
  }

  for (const c of certificationAwards) {
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
}
