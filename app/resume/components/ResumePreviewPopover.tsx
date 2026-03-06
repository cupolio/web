"use client";

import Image from "next/image";
import type { ResumeFormState } from "../utils/resume-to-form";

interface ResumePreviewPopoverProps {
  displayName: string;
  profileImageUrl?: string | null;
  data: ResumeFormState;
  children: React.ReactNode;
}

function formatDateRange(start: string, end: string, isCurrent: boolean) {
  if (!start) return "";
  const s = start ? new Date(start + (start.length === 7 ? "-01" : "")).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit" }) : "";
  const e = isCurrent ? "현재" : end ? new Date(end + (end.length === 7 ? "-01" : "")).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit" }) : "";
  return e ? `${s} - ${e}` : s;
}

function formatMonth(d: string) {
  if (!d) return "";
  const yymm = d.slice(0, 7);
  return yymm ? yymm.replace("-", ".") : "";
}

export function ResumePreviewPopover({ displayName, profileImageUrl, data, children }: ResumePreviewPopoverProps) {
  const skillList = data.skills ? data.skills.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const desiredJobs = data.desiredJob ? data.desiredJob.split(",").map((s) => s.trim()).filter(Boolean) : [];

  return (
    <div className="group relative inline-block">
      {children}
      <div className="invisible absolute right-0 top-full z-50 mt-2 w-[380px] max-h-[80vh] overflow-y-auto rounded-xl border border-[var(--border)] bg-white p-5 shadow-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <div className="space-y-5 text-sm">
          <div className="flex gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[var(--muted)]">
              {profileImageUrl ? (
                <Image src={profileImageUrl} alt={displayName} fill className="object-cover" unoptimized />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xl text-[var(--muted-foreground)]">👤</div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-[var(--foreground)]">{displayName}</h3>
              {data.location && (
                <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">{data.location}</p>
              )}
              {desiredJobs.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {desiredJobs.map((j) => (
                    <span
                      key={j}
                      className="rounded-full border border-[var(--border)] bg-[var(--muted)]/50 px-2.5 py-0.5 text-xs"
                    >
                      {j}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {(data.desiredJob || data.desiredLocation || data.employmentType) && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-[var(--muted-foreground)]">구직 조건</p>
              <p className="text-[var(--foreground)]">
                {[data.desiredJob, data.desiredLocation, data.employmentType].filter(Boolean).join(" · ")}
              </p>
            </div>
          )}

          {data.educations.some((e) => e.name || e.major) && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-[var(--muted-foreground)]">학력</p>
              <ul className="space-y-2">
                {data.educations
                  .filter((e) => e.name || e.major)
                  .map((e, i) => (
                    <li key={i}>
                      <span className="font-medium">{e.name}</span>
                      {e.major && <span className="text-[var(--muted-foreground)]"> {e.major}</span>}
                      {e.start_date && (
                        <span className="ml-1 text-xs text-[var(--muted-foreground)]">
                          {formatDateRange(e.start_date, e.end_date, false)}
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {data.workExperiences.some((w) => w.name || w.position) && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-[var(--muted-foreground)]">경력</p>
              <ul className="space-y-3">
                {data.workExperiences
                  .filter((w) => w.name || w.position)
                  .map((w, i) => (
                    <li key={i}>
                      <div className="font-medium">{w.name}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">{w.position}</div>
                      {w.start_date && (
                        <div className="mt-0.5 text-xs text-[var(--muted-foreground)]">
                          {formatDateRange(w.start_date, w.end_date, w.employed === 1)}
                        </div>
                      )}
                      {w.performances?.filter(Boolean).length ? (
                        <ul className="mt-1 list-inside list-disc text-xs text-[var(--muted-foreground)]">
                          {w.performances.filter(Boolean).slice(0, 3).map((p, pi) => (
                            <li key={pi}>{p}</li>
                          ))}
                          {(w.performances?.filter(Boolean).length ?? 0) > 3 && (
                            <li>외 {(w.performances?.filter(Boolean).length ?? 0) - 3}건</li>
                          )}
                        </ul>
                      ) : null}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {data.activities.some((a) => a.name) && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-[var(--muted-foreground)]">관련 활동</p>
              <ul className="space-y-2">
                {data.activities
                  .filter((a) => a.name)
                  .map((a, i) => (
                    <li key={i}>
                      <span className="font-medium">{a.name}</span>
                      {a.start_date && (
                        <span className="ml-1 text-xs text-[var(--muted-foreground)]">
                          {formatDateRange(a.start_date, a.end_date, a.finished === 1)}
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {skillList.length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-[var(--muted-foreground)]">보유 스킬</p>
              <div className="flex flex-wrap gap-1.5">
                {skillList.slice(0, 8).map((s, i) => (
                  <span
                    key={i}
                    className="rounded-md border border-[var(--border)] bg-[var(--muted)]/30 px-2 py-0.5 text-xs"
                  >
                    {s}
                  </span>
                ))}
                {skillList.length > 8 && (
                  <span className="text-xs text-[var(--muted-foreground)]">+{skillList.length - 8}</span>
                )}
              </div>
            </div>
          )}

          {data.introduction && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-[var(--muted-foreground)]">자기소개</p>
              <p className="line-clamp-4 text-[var(--foreground)]">{data.introduction}</p>
            </div>
          )}

          {data.certifications.some((c) => c.name) && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-[var(--muted-foreground)]">자격증 및 수상</p>
              <ul className="space-y-1">
                {data.certifications
                  .filter((c) => c.name)
                  .map((c, i) => (
                    <li key={i}>
                      <span className="font-medium">{c.name}</span>
                      {c.organization && (
                        <span className="text-[var(--muted-foreground)]"> · {c.organization}</span>
                      )}
                      {c.date && (
                        <span className="ml-1 text-xs text-[var(--muted-foreground)]">{formatMonth(c.date)}</span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {data.links.some((l) => l.url) && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-[var(--muted-foreground)]">첨부 링크</p>
              <ul className="space-y-1">
                {data.links
                  .filter((l) => l.url)
                  .map((l, i) => (
                    <li key={i}>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate text-[#ea580c] hover:underline"
                      >
                        {l.url}
                      </a>
                      {l.type && (
                        <span className="ml-1 text-xs text-[var(--muted-foreground)]">({l.type})</span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
