"use client";

import Image from "next/image";
import { SectionCard } from "./SectionCard";

interface FormSectionBasicInfoProps {
  displayName: string;
  onDisplayNameChange: (v: string) => void;
  jobTitle: string;
  onJobTitleChange: (v: string) => void;
  location: string;
  onLocationChange: (v: string) => void;
  email: string;
  oneLineIntro: string;
  onOneLineIntroChange: (v: string) => void;
  profileImageUrl?: string | null;
  isEditing?: boolean;
  onEnterEdit?: () => void;
  onCancelEdit?: () => void;
  onSave?: () => void | Promise<void>;
  isSaving?: boolean;
  saveError?: string | null;
}

export function FormSectionBasicInfo({
  displayName,
  onDisplayNameChange,
  jobTitle,
  onJobTitleChange,
  location,
  onLocationChange,
  email,
  oneLineIntro,
  onOneLineIntroChange,
  profileImageUrl,
  isEditing = false,
  onEnterEdit,
  onCancelEdit,
  onSave,
  isSaving,
  saveError,
}: FormSectionBasicInfoProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--muted-foreground)]">
        프로필명은 나에게만 보여요!
      </p>
      <h2 className="font-display text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
        {displayName ? `${displayName}의 프로필` : "프로필"}
      </h2>

      <SectionCard
        title="기본 정보"
        titleSuffix={<span className="text-sm font-normal text-red-500">*필수</span>}
        isEditing={isEditing}
        onEnterEdit={onEnterEdit}
        onCancelEdit={onCancelEdit}
        onSave={onSave}
        isSaving={isSaving}
        saveError={saveError}
      >
        {isEditing ? (
          <div className="space-y-6">
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="flex shrink-0 flex-col">
                <div className="flex h-[200px] w-[200px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--muted)]/30">
                  {profileImageUrl ? (
                    <div className="relative h-full w-full overflow-hidden rounded-xl">
                      <Image
                        src={profileImageUrl}
                        alt={displayName || "프로필"}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <>
                      <svg
                        className="mb-2 h-12 w-12 text-[var(--muted-foreground)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7"
                        />
                      </svg>
                      <p className="text-center text-sm text-[var(--muted-foreground)]">
                        이미지를 여기에 드래그 하거나
                        <br />
                        클릭하세요.
                      </p>
                      <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                        권장 600px (5MB 이하)
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="min-w-0 flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]">
                    이름
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => onDisplayNameChange(e.target.value)}
                    placeholder="이름을 입력해 주세요."
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]">
                    직업
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => onJobTitleChange(e.target.value)}
                    placeholder="직업을 입력해 주세요."
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--muted)]/50 px-4 py-2.5 text-sm text-[var(--muted-foreground)]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]">
                한줄소개
              </label>
              <input
                type="text"
                value={oneLineIntro}
                onChange={(e) => onOneLineIntroChange(e.target.value)}
                placeholder="한 줄로 자신을 소개해 주세요."
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]">
                희망 근무 지역
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                placeholder="예: 서울 강남구"
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-sm"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-xl bg-[var(--muted)]">
                {profileImageUrl ? (
                  <Image
                    src={profileImageUrl}
                    alt={displayName || "프로필"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl text-[var(--muted-foreground)]">
                    👤
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1 space-y-2 text-sm">
                <p>
                  <span className="font-medium text-[var(--muted-foreground)]">이름</span>{" "}
                  {displayName || "—"}
                </p>
                <p>
                  <span className="font-medium text-[var(--muted-foreground)]">직업</span>{" "}
                  {jobTitle || "—"}
                </p>
                <p>
                  <span className="font-medium text-[var(--muted-foreground)]">이메일</span>{" "}
                  {email || "—"}
                </p>
              </div>
            </div>
            {oneLineIntro && (
              <p className="text-sm text-[var(--foreground)]">{oneLineIntro}</p>
            )}
            <p>
              <span className="font-medium text-[var(--muted-foreground)]">희망 근무 지역</span>{" "}
              {location || "—"}
            </p>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
