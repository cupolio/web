"use client";

import { SectionCard } from "./SectionCard";

export interface WorkExperienceItem {
  name: string;
  position: string;
  start_date: string;
  end_date: string;
  employed: number;
  performances: string[];
}

function formatMonth(d: string) {
  if (!d) return "";
  const yymm = d.slice(0, 7);
  return yymm ? yymm.replace("-", ".") : "";
}

interface FormSectionCareerProps {
  workExperiences: WorkExperienceItem[];
  onWorkAdd: () => void;
  onWorkUpdate: (i: number, field: string, value: string | number) => void;
  onWorkPerfUpdate: (wi: number, pi: number, value: string) => void;
  onWorkPerfAdd: (wi: number) => void;
  onWorkPerfRemove: (wi: number, pi: number) => void;
  onWorkRemove: (i: number) => void;
  isEditing?: boolean;
  onEnterEdit?: () => void;
  onCancelEdit?: () => void;
  onSave?: () => void | Promise<void>;
  isSaving?: boolean;
  saveError?: string | null;
}

export function FormSectionCareer({
  workExperiences,
  onWorkAdd,
  onWorkUpdate,
  onWorkPerfUpdate,
  onWorkPerfAdd,
  onWorkPerfRemove,
  onWorkRemove,
  isEditing = false,
  onEnterEdit,
  onCancelEdit,
  onSave,
  isSaving,
  saveError,
}: FormSectionCareerProps) {
  const filtered = workExperiences.filter((w) => w.name || w.position);
  return (
    <SectionCard title="직무 경험" isEditing={isEditing} onEnterEdit={onEnterEdit} onCancelEdit={onCancelEdit} onSave={onSave} isSaving={isSaving} saveError={saveError}>
      {isEditing ? (
        <>
        {workExperiences.map((we, i) => (
          <div key={i} className="mb-6 space-y-4 rounded-lg border border-[var(--border)] p-4 last:mb-0">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">회사/카페명</label>
                <input
                  type="text"
                  value={we.name}
                  onChange={(e) => onWorkUpdate(i, "name", e.target.value)}
                  placeholder="회사명"
                  className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">직책</label>
                <input
                  type="text"
                  value={we.position}
                  onChange={(e) => onWorkUpdate(i, "position", e.target.value)}
                  placeholder="예: 바리스타"
                  className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium">시작일</label>
                <input
                  type="month"
                  value={we.start_date?.slice(0, 7) || ""}
                  onChange={(e) => onWorkUpdate(i, "start_date", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">종료일</label>
                <input
                  type="month"
                  value={we.end_date?.slice(0, 7) || ""}
                  onChange={(e) => onWorkUpdate(i, "end_date", e.target.value)}
                  disabled={we.employed === 1}
                  className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm disabled:opacity-50"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={we.employed === 1}
                    onChange={(e) => onWorkUpdate(i, "employed", e.target.checked ? 1 : 0)}
                    className="rounded border-[var(--border)]"
                  />
                  <span className="text-sm">재직중</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">주요 업무/성과</label>
              {(we.performances ?? [""]).map((p, pi) => (
                <div key={pi} className="mt-1 flex gap-2">
                  <input
                    type="text"
                    value={p}
                    onChange={(e) => onWorkPerfUpdate(i, pi, e.target.value)}
                    placeholder="업무 내용"
                    className="flex-1 rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
                  />
                  {(we.performances?.length ?? 0) > 1 && (
                    <button type="button" onClick={() => onWorkPerfRemove(i, pi)} className="text-sm text-red-600">
                      삭제
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => onWorkPerfAdd(i)} className="mt-2 text-sm text-[#ea580c] hover:underline">
                + 업무 추가
              </button>
            </div>
            {workExperiences.length > 1 && (
              <button type="button" onClick={() => onWorkRemove(i)} className="text-sm text-red-600 hover:underline">
                삭제
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={onWorkAdd} className="mt-2 flex items-center gap-2 text-sm text-[#ea580c] hover:underline">
          <span>+</span> 경력 추가
        </button>
        </>
      ) : (
        <ul className="space-y-3 text-sm">
          {filtered.length > 0 ? filtered.map((we, i) => (
            <li key={i}>
              <span className="font-medium">{we.name}</span>
              {we.position && <span className="text-[var(--muted-foreground)]"> · {we.position}</span>}
              {(we.start_date || we.end_date) && (
                <span className="text-[var(--muted-foreground)]"> · {formatMonth(we.start_date)}{we.employed === 1 ? " - 현재" : we.end_date ? ` - ${formatMonth(we.end_date)}` : ""}</span>
              )}
            </li>
          )) : <p className="text-[var(--muted-foreground)]">—</p>}
        </ul>
      )}
    </SectionCard>
  );
}
