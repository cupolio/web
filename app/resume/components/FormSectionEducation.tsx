"use client";

import { EDUCATION_STATUS } from "./form-constants";
import { SectionCard } from "./SectionCard";

export interface EducationItem {
  name: string;
  major: string;
  start_date: string;
  end_date: string;
  status: string;
}

function formatMonth(d: string) {
  if (!d) return "";
  const yymm = d.slice(0, 7);
  return yymm ? yymm.replace("-", ".") : "";
}

interface FormSectionEducationProps {
  educations: EducationItem[];
  onAdd: () => void;
  onUpdate: (i: number, field: string, value: string) => void;
  onRemove: (i: number) => void;
  isEditing?: boolean;
  onEnterEdit?: () => void;
  onCancelEdit?: () => void;
  onSave?: () => void | Promise<void>;
  isSaving?: boolean;
  saveError?: string | null;
}

export function FormSectionEducation({ educations, onAdd, onUpdate, onRemove, isEditing = false, onEnterEdit, onCancelEdit, onSave, isSaving, saveError }: FormSectionEducationProps) {
  const filtered = educations.filter((e) => e.name || e.major);
  return (
    <SectionCard title="학력" isEditing={isEditing} onEnterEdit={onEnterEdit} onCancelEdit={onCancelEdit} onSave={onSave} isSaving={isSaving} saveError={saveError}>
      {isEditing ? (
      <>
      {educations.map((edu, i) => (
        <div key={i} className="mb-6 space-y-4 rounded-lg border border-[var(--border)] p-4 last:mb-0">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">학교명</label>
              <input
                type="text"
                value={edu.name}
                onChange={(e) => onUpdate(i, "name", e.target.value)}
                placeholder="학교명"
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">학과</label>
              <input
                type="text"
                value={edu.major}
                onChange={(e) => onUpdate(i, "major", e.target.value)}
                placeholder="학과명"
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium">입학일</label>
              <input
                type="month"
                value={edu.start_date?.slice(0, 7) || ""}
                onChange={(e) => onUpdate(i, "start_date", e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">졸업일</label>
              <input
                type="month"
                value={edu.end_date?.slice(0, 7) || ""}
                onChange={(e) => onUpdate(i, "end_date", e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">상태</label>
              <select
                value={edu.status}
                onChange={(e) => onUpdate(i, "status", e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              >
                {EDUCATION_STATUS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
          {educations.length > 1 && (
            <button type="button" onClick={() => onRemove(i)} className="text-sm text-red-600 hover:underline">
              삭제
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={onAdd} className="mt-2 flex items-center gap-2 text-sm text-[#ea580c] hover:underline">
        <span>+</span> 학력 추가
      </button>
      </>
      ) : (
        <ul className="space-y-3 text-sm">
          {filtered.length > 0 ? filtered.map((edu, i) => (
            <li key={i}>
              <span className="font-medium">{edu.name}</span>
              {edu.major && <span className="text-[var(--muted-foreground)]"> · {edu.major}</span>}
              {(edu.start_date || edu.end_date) && (
                <span className="text-[var(--muted-foreground)]"> · {formatMonth(edu.start_date)}{edu.end_date ? ` - ${formatMonth(edu.end_date)}` : ""}</span>
              )}
              {edu.status && edu.status !== "GRADUATED" && (
                <span className="text-[var(--muted-foreground)]"> · {EDUCATION_STATUS.find((s) => s.value === edu.status)?.label}</span>
              )}
            </li>
          )) : <p className="text-[var(--muted-foreground)]">—</p>}
        </ul>
      )}
    </SectionCard>
  );
}
