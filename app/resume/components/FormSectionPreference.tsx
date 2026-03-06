"use client";

import { EMPLOYMENT_TYPES } from "./form-constants";
import { SectionCard } from "./SectionCard";

interface FormSectionPreferenceProps {
  desiredJob: string;
  desiredLocation: string;
  employmentType: string;
  onDesiredJobChange: (v: string) => void;
  onDesiredLocationChange: (v: string) => void;
  onEmploymentTypeChange: (v: string) => void;
  isEditing?: boolean;
  onEnterEdit?: () => void;
  onCancelEdit?: () => void;
  onSave?: () => void | Promise<void>;
  isSaving?: boolean;
  saveError?: string | null;
}

export function FormSectionPreference({
  desiredJob,
  desiredLocation,
  employmentType,
  onDesiredJobChange,
  onDesiredLocationChange,
  onEmploymentTypeChange,
  isEditing = false,
  onEnterEdit,
  onCancelEdit,
  onSave,
  isSaving,
  saveError,
}: FormSectionPreferenceProps) {
  return (
    <SectionCard
      title="구직 조건"
      isEditing={isEditing}
      onEnterEdit={onEnterEdit}
      onCancelEdit={onCancelEdit}
      onSave={onSave}
      isSaving={isSaving}
      saveError={saveError}
    >
      {isEditing ? (
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">희망 직무</label>
          <input
            type="text"
            value={desiredJob}
            onChange={(e) => onDesiredJobChange(e.target.value)}
            placeholder="예: 바리스타"
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">희망 지역</label>
          <input
            type="text"
            value={desiredLocation}
            onChange={(e) => onDesiredLocationChange(e.target.value)}
            placeholder="예: 서울 전체"
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">고용 형태</label>
          <select
            value={employmentType}
            onChange={(e) => onEmploymentTypeChange(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm"
          >
            {EMPLOYMENT_TYPES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>
      ) : (
        <div className="space-y-3 text-sm">
          <p><span className="font-medium text-[var(--muted-foreground)]">희망 직무</span> {desiredJob || "—"}</p>
          <p><span className="font-medium text-[var(--muted-foreground)]">희망 지역</span> {desiredLocation || "—"}</p>
          <p><span className="font-medium text-[var(--muted-foreground)]">고용 형태</span> {(EMPLOYMENT_TYPES.find((o) => o.value === employmentType)?.label ?? employmentType) || "—"}</p>
        </div>
      )}
    </SectionCard>
  );
}
