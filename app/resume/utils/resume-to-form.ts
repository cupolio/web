import type { ResumeWithRelations } from "@/lib/resume/types";

export interface FormEducation {
  name: string;
  major: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface FormWorkExperience {
  name: string;
  position: string;
  start_date: string;
  end_date: string;
  employed: number;
  performances: string[];
}

export interface FormActivity {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  finished: number;
}

export interface FormLink {
  url: string;
  type: string;
}

export interface FormCertification {
  name: string;
  organization: string;
  date: string;
  description: string;
  type: string;
}

export interface ResumeFormState {
  location: string;
  desiredJob: string;
  desiredLocation: string;
  employmentType: string;
  introduction: string;
  educations: FormEducation[];
  workExperiences: FormWorkExperience[];
  activities: FormActivity[];
  links: FormLink[];
  certifications: FormCertification[];
  skills: string;
}

export const EMPTY_EDUCATION: FormEducation = {
  name: "",
  major: "",
  start_date: "",
  end_date: "",
  status: "GRADUATED",
};

export const EMPTY_WORK: FormWorkExperience = {
  name: "",
  position: "",
  start_date: "",
  end_date: "",
  employed: 0,
  performances: [""],
};

export const EMPTY_ACTIVITY: FormActivity = {
  name: "",
  description: "",
  start_date: "",
  end_date: "",
  finished: 0,
};

export const EMPTY_LINK: FormLink = { url: "", type: "SNS" };

export const EMPTY_CERT: FormCertification = {
  name: "",
  organization: "",
  date: "",
  description: "",
  type: "CERTIFICATION",
};

export function resumeToFormState(resume: ResumeWithRelations | null): ResumeFormState {
  if (!resume) {
    return {
      location: "",
      desiredJob: "",
      desiredLocation: "",
      employmentType: "정규직",
      introduction: "",
      educations: [EMPTY_EDUCATION],
      workExperiences: [EMPTY_WORK],
      activities: [EMPTY_ACTIVITY],
      links: [EMPTY_LINK],
      certifications: [EMPTY_CERT],
      skills: "",
    };
  }
  const pref = resume.preference;
  const educations =
    (resume.educations ?? []).length > 0
      ? (resume.educations ?? []).map((e) => ({
          name: e.name ?? "",
          major: e.major ?? "",
          start_date: e.start_date ?? "",
          end_date: e.end_date ?? "",
          status: (e as { status?: string }).status ?? "GRADUATED",
        }))
      : [EMPTY_EDUCATION];
  const workExperiences =
    (resume.work_experiences ?? []).length > 0
      ? (resume.work_experiences ?? []).map((w) => ({
          name: w.name ?? "",
          position: w.position ?? "",
          start_date: w.start_date ?? "",
          end_date: w.end_date ?? "",
          employed: w.employed ?? 0,
          performances:
            (w.performances ?? []).length > 0
              ? (w.performances ?? []).map((p) => (p as { description?: string }).description ?? "")
              : [""],
        }))
      : [EMPTY_WORK];
  const activities =
    (resume.activities ?? []).length > 0
      ? (resume.activities ?? []).map((a) => ({
          name: a.name ?? "",
          description: a.description ?? "",
          start_date: a.start_date ?? "",
          end_date: a.end_date ?? "",
          finished: a.finished ?? 0,
        }))
      : [EMPTY_ACTIVITY];
  const links =
    (resume.links ?? []).length > 0
      ? (resume.links ?? []).map((l) => ({ url: l.url ?? "", type: (l as { type?: string }).type ?? "SNS" }))
      : [EMPTY_LINK];
  const certifications =
    (resume.certification_awards ?? []).length > 0
      ? (resume.certification_awards ?? []).map((c) => ({
          name: c.name ?? "",
          organization: c.organization ?? "",
          date: c.date ?? "",
          description: c.description ?? "",
          type: (c as { type?: string }).type ?? "CERTIFICATION",
        }))
      : [EMPTY_CERT];
  const skills = (resume.skills ?? []).map((s) => s.name).join(", ");
  return {
    location: resume.location ?? "",
    desiredJob: pref?.desired_job ?? "",
    desiredLocation: pref?.desired_location ?? "",
    employmentType: pref?.employment_type ?? "정규직",
    introduction: (resume.introduction as { description?: string })?.description ?? "",
    educations,
    workExperiences,
    activities,
    links,
    certifications,
    skills,
  };
}
