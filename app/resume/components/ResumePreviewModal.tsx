"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { ResumeFormState } from "../utils/resume-to-form";

interface ResumePreviewModalProps {
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

export function ResumePreviewModal({ displayName, profileImageUrl, data, children }: ResumePreviewModalProps) {
  const [open, setOpen] = useState(false);
  const skillList = data.skills ? data.skills.split(",").map((s) => s.trim()).filter(Boolean) : [];

  useEffect(() => {
    if (!open) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open]);
  const desiredJobs = data.desiredJob ? data.desiredJob.split(",").map((s) => s.trim()).filter(Boolean) : [];

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-title"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div
            className="relative z-10 flex max-h-[90vh] w-full max-w-[700px] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--border)] px-6 py-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                title="준비 중"
              >
                <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                PDF로 저장
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                닫기
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="relative h-[54px] w-[54px] shrink-0 overflow-hidden rounded-full bg-[var(--muted)]">
                    {profileImageUrl ? (
                      <Image src={profileImageUrl} alt={displayName} fill className="object-cover" unoptimized />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-2xl text-[var(--muted-foreground)]">👤</div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 id="preview-title" className="text-lg font-bold text-[var(--foreground)]">
                      {displayName}
                    </h2>
                    {data.location && (
                      <p className="mt-1 text-sm text-[var(--muted-foreground)]">{data.location}</p>
                    )}
                    {desiredJobs.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {desiredJobs.map((j) => (
                          <span
                            key={j}
                            className="rounded-full border border-[var(--border)] bg-[var(--section-alt)] px-3 py-1 text-sm"
                          >
                            {j}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {(data.desiredJob || data.desiredLocation || data.employmentType) && (
                  <section>
                    <h3 className="mb-3 text-sm font-semibold text-[var(--foreground)]">구직 조건</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {[data.desiredJob, data.desiredLocation, data.employmentType].filter(Boolean).join(" · ")}
                    </p>
                  </section>
                )}

                {data.introduction && (
                  <section>
                    <h3 className="mb-3 text-sm font-semibold text-[var(--foreground)]">자기소개</h3>
                    <p className="whitespace-pre-wrap text-sm text-[var(--foreground)]">{data.introduction}</p>
                  </section>
                )}

                {skillList.length > 0 && (
                  <section>
                    <h3 className="mb-3 text-sm font-semibold text-[var(--foreground)]">보유 스킬</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((s, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-[var(--border)] bg-[var(--muted)]/30 px-3 py-1.5 text-sm"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {data.educations.some((e) => e.name || e.major) && (
                  <section>
                    <h3 className="mb-3 text-sm font-semibold text-[var(--foreground)]">학력</h3>
                    <ul className="space-y-4">
                      {data.educations
                        .filter((e) => e.name || e.major)
                        .map((e, i) => (
                          <li key={i} className="flex gap-3">
                            <div className="h-12 w-12 shrink-0 rounded-lg bg-[var(--muted)]" />
                            <div>
                              <div className="font-medium">{e.name}</div>
                              {e.major && <div className="text-sm text-[var(--muted-foreground)]">{e.major}</div>}
                              {e.start_date && (
                                <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                                  {formatDateRange(e.start_date, e.end_date, false)}
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                    </ul>
                  </section>
                )}

                {data.workExperiences.some((w) => w.name || w.position) && (
                  <section>
                    <h3 className="mb-3 text-sm font-semibold text-[var(--foreground)]">경력</h3>
                    <ul className="space-y-6">
                      {data.workExperiences
                        .filter((w) => w.name || w.position)
                        .map((w, i) => (
                          <li key={i}>
                            <div className="flex gap-3">
                              <div className="h-12 w-12 shrink-0 rounded-lg bg-[var(--muted)]" />
                              <div className="min-w-0 flex-1">
                                <div className="font-medium">{w.name}</div>
                                <div className="text-sm text-[var(--muted-foreground)]">{w.position}</div>
                                {w.start_date && (
                                  <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                                    {formatDateRange(w.start_date, w.end_date, w.employed === 1)}
                                  </div>
                                )}
                              </div>
                            </div>
                            {w.performances?.filter(Boolean).length ? (
                              <ul className="mt-3 list-inside list-disc space-y-1 pl-4 text-sm text-[var(--muted-foreground)]">
                                {w.performances.filter(Boolean).map((p, pi) => (
                                  <li key={pi}>{p}</li>
                                ))}
                              </ul>
                            ) : null}
                          </li>
                        ))}
                    </ul>
                  </section>
                )}

                {data.activities.some((a) => a.name) && (
                  <section>
                    <h3 className="mb-3 text-sm font-semibold text-[var(--foreground)]">직무 관련 활동</h3>
                    <ul className="space-y-4">
                      {data.activities
                        .filter((a) => a.name)
                        .map((a, i) => (
                          <li key={i}>
                            <div className="font-medium">{a.name}</div>
                            {a.description && (
                              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{a.description}</p>
                            )}
                            {a.start_date && (
                              <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                                {formatDateRange(a.start_date, a.end_date, a.finished === 1)}
                              </div>
                            )}
                          </li>
                        ))}
                    </ul>
                  </section>
                )}

                {data.certifications.some((c) => c.name) && (
                  <section>
                    <h3 className="mb-3 text-sm font-semibold text-[var(--foreground)]">자격증 및 수상</h3>
                    <ul className="space-y-4">
                      {data.certifications
                        .filter((c) => c.name)
                        .map((c, i) => (
                          <li key={i} className="flex gap-3">
                            <div className="h-12 w-12 shrink-0 rounded-lg bg-[var(--muted)]" />
                            <div>
                              <div className="font-medium">{c.name}</div>
                              {c.organization && (
                                <div className="text-sm text-[var(--muted-foreground)]">{c.organization}</div>
                              )}
                              {c.date && (
                                <div className="mt-1 text-xs text-[var(--muted-foreground)]">{formatMonth(c.date)}</div>
                              )}
                              {c.description && (
                                <p className="mt-2 text-sm text-[var(--muted-foreground)]">{c.description}</p>
                              )}
                            </div>
                          </li>
                        ))}
                    </ul>
                  </section>
                )}

                {data.links.some((l) => l.url) && (
                  <section>
                    <h3 className="mb-3 text-sm font-semibold text-[var(--foreground)]">첨부 링크</h3>
                    <ul className="space-y-2">
                      {data.links
                        .filter((l) => l.url)
                        .map((l, i) => (
                          <li key={i}>
                            <a
                              href={l.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-[#ea580c] hover:underline"
                            >
                              {l.url}
                            </a>
                            {l.type && (
                              <span className="ml-2 text-xs text-[var(--muted-foreground)]">({l.type})</span>
                            )}
                          </li>
                        ))}
                    </ul>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
