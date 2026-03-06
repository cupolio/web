"use client";

interface SectionCardProps {
  id?: string;
  title: string;
  titleSuffix?: React.ReactNode;
  children: React.ReactNode;
  isEditing?: boolean;
  onEnterEdit?: () => void;
  onCancelEdit?: () => void;
  onSave?: () => void | Promise<void>;
  isSaving?: boolean;
  saveError?: string | null;
}

export function SectionCard({
  id,
  title,
  titleSuffix,
  children,
  isEditing = false,
  onEnterEdit,
  onCancelEdit,
  onSave,
  isSaving,
  saveError,
}: SectionCardProps) {
  const canEdit = !!onEnterEdit;
  const showSave = !!onSave && isEditing;

  return (
    <section id={id} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8" data-section={id}>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-base font-semibold text-[var(--foreground)]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#24D59E]/20 text-[#24D59E]">
            ✓
          </span>
          {title}
          {titleSuffix}
        </h2>
        {canEdit && (
          <button
            type="button"
            onClick={isEditing ? onCancelEdit : onEnterEdit}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
            aria-label={isEditing ? "수정 취소" : "수정"}
          >
            {isEditing ? (
              <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" className="h-4 w-4">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" className="h-4 w-4">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            )}
          </button>
        )}
      </div>
      <div
        className={canEdit && !isEditing ? "cursor-pointer" : ""}
        onClick={canEdit && !isEditing ? onEnterEdit : undefined}
        onKeyDown={canEdit && !isEditing ? (e) => e.key === "Enter" && onEnterEdit?.() : undefined}
        role={canEdit && !isEditing ? "button" : undefined}
        tabIndex={canEdit && !isEditing ? 0 : undefined}
      >
        {children}
      </div>
      {showSave && (
        <div className="mt-6 flex flex-col items-end gap-2">
          {saveError && (
            <p className="w-full text-sm text-red-600">{saveError}</p>
          )}
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="rounded-full bg-[#ea580c] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#c2410c] disabled:opacity-50"
          >
            {isSaving ? "저장 중..." : "저장"}
          </button>
        </div>
      )}
    </section>
  );
}
