"use client";

import { SectionCard } from "./SectionCard";

interface FormSectionSkillsProps {
  skills: string;
  onSkillsChange: (v: string) => void;
  isEditing?: boolean;
  onEnterEdit?: () => void;
  onCancelEdit?: () => void;
  onSave?: () => void | Promise<void>;
  isSaving?: boolean;
  saveError?: string | null;
}

export function FormSectionSkills({ skills, onSkillsChange, isEditing = false, onEnterEdit, onCancelEdit, onSave, isSaving, saveError }: FormSectionSkillsProps) {
  const skillList = skills ? skills.split(",").map((s) => s.trim()).filter(Boolean) : [];
  return (
    <SectionCard title="보유 스킬" isEditing={isEditing} onEnterEdit={onEnterEdit} onCancelEdit={onCancelEdit} onSave={onSave} isSaving={isSaving} saveError={saveError}>
      {isEditing ? (
        <div>
          <label className="block text-sm font-medium">스킬 (쉼표로 구분)</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => onSkillsChange(e.target.value)}
            placeholder="예: 에스프레소, 라테아트, 원두 로스팅"
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm"
          />
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 text-sm">
          {skillList.length > 0 ? skillList.map((s, i) => (
            <span key={i} className="rounded-lg border border-[var(--border)] bg-[var(--muted)]/30 px-3 py-1.5">{s}</span>
          )) : <p className="text-[var(--muted-foreground)]">—</p>}
        </div>
      )}
    </SectionCard>
  );
}
