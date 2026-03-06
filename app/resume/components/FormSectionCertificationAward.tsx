"use client";

import { CERT_TYPES } from "./form-constants";
import { SectionCard } from "./SectionCard";

export interface CertificationItem {
  name: string;
  organization: string;
  date: string;
  description: string;
  type: string;
}

function formatMonth(d: string) {
  if (!d) return "";
  const yymm = d.slice(0, 7);
  return yymm ? yymm.replace("-", ".") : "";
}

interface FormSectionCertificationAwardProps {
  certifications: CertificationItem[];
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

export function FormSectionCertificationAward({
  certifications,
  onAdd,
  onUpdate,
  onRemove,
  isEditing = false,
  onEnterEdit,
  onCancelEdit,
  onSave,
  isSaving,
  saveError,
}: FormSectionCertificationAwardProps) {
  const filtered = certifications.filter((c) => c.name);
  return (
    <SectionCard title="자격증 및 수상" isEditing={isEditing} onEnterEdit={onEnterEdit} onCancelEdit={onCancelEdit} onSave={onSave} isSaving={isSaving} saveError={saveError}>
      {isEditing ? (
      <>
      {certifications.map((c, i) => (
        <div key={i} className="mb-6 space-y-4 rounded-lg border border-[var(--border)] p-4 last:mb-0">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">이름</label>
              <input
                type="text"
                value={c.name}
                onChange={(e) => onUpdate(i, "name", e.target.value)}
                placeholder="예: 바리스타 2급"
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">분류</label>
              <select
                value={c.type}
                onChange={(e) => onUpdate(i, "type", e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              >
                {CERT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">기관명</label>
              <input
                type="text"
                value={c.organization}
                onChange={(e) => onUpdate(i, "organization", e.target.value)}
                placeholder="예: 한국바리스타협회"
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">취득일</label>
              <input
                type="month"
                value={c.date?.slice(0, 7) || ""}
                onChange={(e) => onUpdate(i, "date", e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">설명</label>
            <textarea
              value={c.description}
              onChange={(e) => onUpdate(i, "description", e.target.value)}
              placeholder="추가 설명"
              rows={2}
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
            />
          </div>
          {certifications.length > 1 && (
            <button type="button" onClick={() => onRemove(i)} className="text-sm text-red-600 hover:underline">
              삭제
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={onAdd} className="mt-2 flex items-center gap-2 text-sm text-[#ea580c] hover:underline">
        <span>+</span> 자격증/수상 추가
      </button>
      </>
      ) : (
        <ul className="space-y-3 text-sm">
          {filtered.length > 0 ? filtered.map((c, i) => (
            <li key={i}>
              <span className="font-medium">{c.name}</span>
              {c.organization && <span className="text-[var(--muted-foreground)]"> · {c.organization}</span>}
              {c.date && <span className="text-[var(--muted-foreground)]"> · {formatMonth(c.date)}</span>}
            </li>
          )) : <p className="text-[var(--muted-foreground)]">—</p>}
        </ul>
      )}
    </SectionCard>
  );
}
