/** YYYY-MM을 DB date용 YYYY-MM-01로 변환 */
export function toDbDate(d: string): string {
  if (!d?.trim()) return d;
  const t = d.trim();
  if (/^\d{4}-\d{2}$/.test(t)) return t + "-01";
  return t;
}

export function parseJson<T>(s: unknown): T | null {
  if (typeof s !== "string") return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

export function parseEducation(e: unknown): {
  name: string;
  major: string;
  start_date: string;
  end_date: string;
  status: string;
} {
  const x = e as Record<string, unknown>;
  return {
    name: String(x?.name ?? "").trim(),
    major: String(x?.major ?? "").trim(),
    start_date: String(x?.start_date ?? "").trim(),
    end_date: String(x?.end_date ?? "").trim(),
    status: String(x?.status ?? "GRADUATED").trim() || "GRADUATED",
  };
}

export function parseWorkExp(w: unknown): {
  name: string;
  position: string;
  start_date: string;
  end_date: string;
  employed: number;
  performances: string[];
} {
  const x = w as Record<string, unknown>;
  const perf = Array.isArray(x?.performances) ? (x.performances as string[]) : [];
  return {
    name: String(x?.name ?? "").trim(),
    position: String(x?.position ?? "").trim(),
    start_date: String(x?.start_date ?? "").trim(),
    end_date: String(x?.end_date ?? "").trim(),
    employed: Number(x?.employed) || 0,
    performances: perf.map((p) => String(p).trim()).filter(Boolean),
  };
}

export function parseActivity(a: unknown): {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  finished: number;
} {
  const x = a as Record<string, unknown>;
  return {
    name: String(x?.name ?? "").trim(),
    description: String(x?.description ?? "").trim(),
    start_date: String(x?.start_date ?? "").trim(),
    end_date: String(x?.end_date ?? "").trim(),
    finished: Number(x?.finished) || 0,
  };
}

export function parseLink(l: unknown): { url: string; type: string } {
  const x = l as Record<string, unknown>;
  return {
    url: String(x?.url ?? "").trim(),
    type: String(x?.type ?? "SNS").trim() || "SNS",
  };
}

export function parseCert(c: unknown): {
  name: string;
  organization: string;
  date: string | null;
  description: string;
  type: string;
} {
  const x = c as Record<string, unknown>;
  const d = String(x?.date ?? "").trim();
  return {
    name: String(x?.name ?? "").trim(),
    organization: String(x?.organization ?? "").trim(),
    date: d || null,
    description: String(x?.description ?? "").trim(),
    type: String(x?.type ?? "CERTIFICATION").trim() || "CERTIFICATION",
  };
}

export interface ParsedFormData {
  displayName: string;
  location: string;
  desiredJob: string;
  desiredLocation: string;
  employmentType: string;
  introductionDesc: string;
  skillsStr: string;
  educations: unknown[];
  workExperiences: unknown[];
  activities: unknown[];
  links: unknown[];
  certificationAwards: unknown[];
}

export function parseFormData(formData: FormData): ParsedFormData {
  return {
    displayName: (formData.get("display_name") as string)?.trim() ?? "",
    location: (formData.get("location") as string)?.trim() ?? "",
    desiredJob: (formData.get("desired_job") as string)?.trim() ?? "",
    desiredLocation: (formData.get("desired_location") as string)?.trim() ?? "",
    employmentType: (formData.get("employment_type") as string)?.trim() || "정규직",
    introductionDesc: (formData.get("introduction") as string)?.trim() ?? "",
    skillsStr: (formData.get("skills") as string)?.trim() ?? "",
    educations: parseJson<(typeof parseEducation)[]>(formData.get("educations") as string) ?? [],
    workExperiences: parseJson<(typeof parseWorkExp)[]>(formData.get("work_experiences") as string) ?? [],
    activities: parseJson<(typeof parseActivity)[]>(formData.get("activities") as string) ?? [],
    links: parseJson<(typeof parseLink)[]>(formData.get("links") as string) ?? [],
    certificationAwards: parseJson<(typeof parseCert)[]>(formData.get("certification_awards") as string) ?? [],
  };
}
