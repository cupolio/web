"use client";

import { SectionCard } from "./SectionCard";

interface FormSectionIntroductionProps {
  introduction: string;
  onIntroductionChange: (v: string) => void;
  isEditing?: boolean;
  onEnterEdit?: () => void;
  onCancelEdit?: () => void;
  onSave?: () => void | Promise<void>;
  isSaving?: boolean;
  saveError?: string | null;
}

export function FormSectionIntroduction({ introduction, onIntroductionChange, isEditing = false, onEnterEdit, onCancelEdit, onSave, isSaving, saveError }: FormSectionIntroductionProps) {
  return (
    <SectionCard title="자기소개" isEditing={isEditing} onEnterEdit={onEnterEdit} onCancelEdit={onCancelEdit} onSave={onSave} isSaving={isSaving} saveError={saveError}>
      {isEditing ? (
        <textarea
          value={introduction}
          onChange={(e) => onIntroductionChange(e.target.value)}
          placeholder="자기소개를 작성해주세요."
          rows={6}
          className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-sm"
        />
      ) : (
        <p className="whitespace-pre-wrap text-sm text-[var(--foreground)]">{introduction || "—"}</p>
      )}
    </SectionCard>
  );
}
