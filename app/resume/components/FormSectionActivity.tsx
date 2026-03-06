"use client";

import { SectionCard } from "./SectionCard";

export interface ActivityItem {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  finished: number;
}

function formatMonth(d: string) {
  if (!d) return "";
  const yymm = d.slice(0, 7);
  return yymm ? yymm.replace("-", ".") : "";
}

interface FormSectionActivityProps {
  activities: ActivityItem[];
  onAdd: () => void;
  onUpdate: (i: number, field: string, value: string | number) => void;
  onRemove: (i: number) => void;
  isEditing?: boolean;
  onEnterEdit?: () => void;
  onCancelEdit?: () => void;
  onSave?: () => void | Promise<void>;
  isSaving?: boolean;
  saveError?: string | null;
}

export function FormSectionActivity({
  activities,
  onAdd,
  onUpdate,
  onRemove,
  isEditing = false,
  onEnterEdit,
  onCancelEdit,
  onSave,
  isSaving,
  saveError,
}: FormSectionActivityProps) {
  const filtered = activities.filter((a) => a.name);
  return (
    <SectionCard title="관련 활동" isEditing={isEditing} onEnterEdit={onEnterEdit} onCancelEdit={onCancelEdit} onSave={onSave} isSaving={isSaving} saveError={saveError}>
      {isEditing ? (
      <>
      {activities.map((a, i) => (
        <div key={i} className="mb-6 space-y-4 rounded-lg border border-[var(--border)] p-4 last:mb-0">
          <div>
            <label className="block text-sm font-medium">활동명</label>
            <input
              type="text"
              value={a.name}
              onChange={(e) => onUpdate(i, "name", e.target.value)}
              placeholder="예: 바리스타 대회 참가"
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">설명</label>
            <textarea
              value={a.description}
              onChange={(e) => onUpdate(i, "description", e.target.value)}
              placeholder="활동 내용"
              rows={3}
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">시작일</label>
              <input
                type="month"
                value={a.start_date?.slice(0, 7) || ""}
                onChange={(e) => onUpdate(i, "start_date", e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">종료일</label>
              <input
                type="month"
                value={a.end_date?.slice(0, 7) || ""}
                onChange={(e) => onUpdate(i, "end_date", e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              />
            </div>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={a.finished === 1}
              onChange={(e) => onUpdate(i, "finished", e.target.checked ? 1 : 0)}
              className="rounded border-[var(--border)]"
            />
            <span className="text-sm">진행중</span>
          </label>
          {activities.length > 1 && (
            <button type="button" onClick={() => onRemove(i)} className="text-sm text-red-600 hover:underline">
              삭제
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={onAdd} className="mt-2 flex items-center gap-2 text-sm text-[#ea580c] hover:underline">
        <span>+</span> 활동 추가
      </button>
      </>
      ) : (
        <ul className="space-y-3 text-sm">
          {filtered.length > 0 ? filtered.map((a, i) => (
            <li key={i}>
              <span className="font-medium">{a.name}</span>
              {(a.start_date || a.end_date) && (
                <span className="text-[var(--muted-foreground)]"> · {formatMonth(a.start_date)}{a.finished === 1 ? " - 진행중" : a.end_date ? ` - ${formatMonth(a.end_date)}` : ""}</span>
              )}
            </li>
          )) : <p className="text-[var(--muted-foreground)]">—</p>}
        </ul>
      )}
    </SectionCard>
  );
}
