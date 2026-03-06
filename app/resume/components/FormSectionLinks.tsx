"use client";

import { LINK_TYPES } from "./form-constants";
import { SectionCard } from "./SectionCard";

export interface LinkItem {
  url: string;
  type: string;
}

interface FormSectionLinksProps {
  links: LinkItem[];
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

export function FormSectionLinks({ links, onAdd, onUpdate, onRemove, isEditing = false, onEnterEdit, onCancelEdit, onSave, isSaving, saveError }: FormSectionLinksProps) {
  const filtered = links.filter((l) => l.url);
  return (
    <SectionCard title="첨부 링크" isEditing={isEditing} onEnterEdit={onEnterEdit} onCancelEdit={onCancelEdit} onSave={onSave} isSaving={isSaving} saveError={saveError}>
      {isEditing ? (
      <>
      {links.map((link, i) => (
        <div key={i} className="mb-4 flex gap-2">
          <input
            type="url"
            value={link.url}
            onChange={(e) => onUpdate(i, "url", e.target.value)}
            placeholder="https://"
            className="flex-1 rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
          />
          <select
            value={link.type}
            onChange={(e) => onUpdate(i, "type", e.target.value)}
            className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
          >
            {LINK_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          {links.length > 1 && (
            <button type="button" onClick={() => onRemove(i)} className="text-sm text-red-600">
              삭제
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={onAdd} className="mt-2 flex items-center gap-2 text-sm text-[#ea580c] hover:underline">
        <span>+</span> 링크 추가
      </button>
      </>
      ) : (
        <ul className="space-y-2 text-sm">
          {filtered.length > 0 ? filtered.map((link, i) => (
            <li key={i}>
              <a href={link.url} target="_blank" rel="noreferrer" className="text-[#ea580c] hover:underline" onClick={(e) => e.stopPropagation()}>
                {link.url}
              </a>
              {link.type && <span className="ml-2 text-[var(--muted-foreground)]">({LINK_TYPES.find((t) => t.value === link.type)?.label ?? link.type})</span>}
            </li>
          )) : <p className="text-[var(--muted-foreground)]">—</p>}
        </ul>
      )}
    </SectionCard>
  );
}
