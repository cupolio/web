"use client";

const SECTIONS: { id: string; label: string }[] = [
  { id: "section-basicInfo", label: "기본 정보" },
  { id: "section-preference", label: "구직 조건" },
  { id: "section-introduction", label: "자기소개" },
  { id: "section-skills", label: "보유 스킬" },
  { id: "section-education", label: "학력" },
  { id: "section-career", label: "직무 경험" },
  { id: "section-activity", label: "관련 활동" },
  { id: "section-certifications", label: "자격증 및 수상" },
  { id: "section-links", label: "첨부 링크" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ResumeSectionNav() {
  return (
    <aside
      className="fixed right-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-64 flex-col overflow-y-auto border-l border-[var(--border)] bg-[var(--card)] p-4 lg:flex"
      aria-label="이력서 섹션 바로가기"
    >
      <p className="mb-3 text-sm font-semibold text-[var(--foreground)]">
        작성 항목
      </p>
      <nav className="flex flex-col gap-0.5">
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSection(id)}
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#24D59E]/20 text-[#24D59E]">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
