"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDisplayNameOverride, stripSpecialChars } from "@/lib/display-name-context";
import {
  saveBasicInfo,
  savePreference,
  saveEducation,
  saveWorkExperiences,
  saveActivities,
  saveSkills,
  saveLinks,
  saveIntroduction,
  saveCertifications,
} from "./actions/section-actions";
import {
  FormSectionBasicInfo,
  FormSectionPreference,
  FormSectionEducation,
  FormSectionCareer,
  FormSectionActivity,
  FormSectionSkills,
  FormSectionLinks,
  FormSectionIntroduction,
  FormSectionCertificationAward,
} from "./components";
import type { ResumeWithRelations } from "@/lib/resume/types";
import {
  resumeToFormState,
  EMPTY_EDUCATION,
  EMPTY_WORK,
  EMPTY_ACTIVITY,
  EMPTY_LINK,
  EMPTY_CERT,
} from "./utils/resume-to-form";
import type { ResumeFormState } from "./utils/resume-to-form";
import { ResumePreviewModal } from "./components/ResumePreviewModal";
import { ResumeSectionNav } from "./components/ResumeSectionNav";

interface ResumeFormProps {
  displayName: string;
  initialData?: ResumeWithRelations | null;
}

export function ResumeForm({ displayName: initialDisplayName, initialData }: ResumeFormProps) {
  const router = useRouter();
  const setDisplayNameOverride = useDisplayNameOverride()?.setDisplayNameOverride;
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveErrorSection, setSaveErrorSection] = useState<string | null>(null);

  const initialState = useMemo(() => resumeToFormState(initialData ?? null), [initialData]);

  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    if (!setDisplayNameOverride) return;
    const stripped = stripSpecialChars(displayName);
    setDisplayNameOverride(stripped || null);
    return () => setDisplayNameOverride(null);
  }, [displayName, setDisplayNameOverride]);
  const [location, setLocation] = useState(initialState.location);
  const [desiredJob, setDesiredJob] = useState(initialState.desiredJob);
  const [desiredLocation, setDesiredLocation] = useState(initialState.desiredLocation);
  const [employmentType, setEmploymentType] = useState(initialState.employmentType);
  const [introduction, setIntroduction] = useState(initialState.introduction);

  const [educations, setEducations] = useState(initialState.educations);
  const [workExperiences, setWorkExperiences] = useState(initialState.workExperiences);
  const [activities, setActivities] = useState(initialState.activities);
  const [links, setLinks] = useState(initialState.links);
  const [certifications, setCertifications] = useState(initialState.certifications);
  const [skills, setSkills] = useState(initialState.skills);

  const addEducation = () =>
    setEducations((p) => [...p, { ...EMPTY_EDUCATION }]);
  const addWork = () =>
    setWorkExperiences((p) => [...p, { ...EMPTY_WORK }]);
  const addActivity = () => setActivities((p) => [...p, { ...EMPTY_ACTIVITY }]);
  const addLink = () => setLinks((p) => [...p, { ...EMPTY_LINK }]);
  const addCert = () => setCertifications((p) => [...p, { ...EMPTY_CERT }]);

  const updateEducation = (i: number, f: string, v: string) =>
    setEducations((p) => {
      const n = [...p];
      (n[i] as unknown as Record<string, string>)[f] = v;
      return n;
    });
  const updateWork = (i: number, f: string, v: string | number) =>
    setWorkExperiences((p) => {
      const n = [...p];
      (n[i] as unknown as Record<string, unknown>)[f] = v;
      return n;
    });
  const updateWorkPerf = (wi: number, pi: number, v: string) =>
    setWorkExperiences((p) => {
      const n = [...p];
      const perf = [...(n[wi].performances ?? [""])];
      perf[pi] = v;
      n[wi].performances = perf;
      return n;
    });
  const addWorkPerf = (wi: number) =>
    setWorkExperiences((p) => {
      const n = [...p];
      n[wi].performances = [...(n[wi].performances ?? [""]), ""];
      return n;
    });
  const removeWorkPerf = (wi: number, pi: number) =>
    setWorkExperiences((p) => {
      const n = [...p];
      n[wi].performances = (n[wi].performances ?? []).filter((_, j) => j !== pi);
      return n;
    });
  const removeWork = (i: number) => setWorkExperiences((p) => p.filter((_, j) => j !== i));
  const removeActivity = (i: number) => setActivities((p) => p.filter((_, j) => j !== i));
  const removeLink = (i: number) => setLinks((p) => p.filter((_, j) => j !== i));
  const removeCert = (i: number) => setCertifications((p) => p.filter((_, j) => j !== i));
  const updateActivity = (i: number, f: string, v: string | number) =>
    setActivities((p) => {
      const n = [...p];
      (n[i] as unknown as Record<string, unknown>)[f] = v;
      return n;
    });
  const updateLink = (i: number, f: string, v: string) =>
    setLinks((p) => {
      const n = [...p];
      (n[i] as unknown as Record<string, string>)[f] = v;
      return n;
    });
  const updateCert = (i: number, f: string, v: string) =>
    setCertifications((p) => {
      const n = [...p];
      (n[i] as unknown as Record<string, string>)[f] = v;
      return n;
    });

  async function handleSaveSection(
    section: string,
    saveFn: () => Promise<{ success: true } | { success: false; error: string }>
  ) {
    setSavingSection(section);
    setSaveError(null);
    setSaveErrorSection(null);
    const result = await saveFn();
    setSavingSection(null);
    if (result.success) {
      setEditingSection(null);
      router.refresh();
    } else {
      setSaveError(result.error);
      setSaveErrorSection(section);
    }
  }

  const handleSaveBasicInfo = () =>
    handleSaveSection("basicInfo", () => saveBasicInfo(displayName, location, introduction));
  const handleSavePreference = () =>
    handleSaveSection("preference", () => savePreference(desiredJob, desiredLocation, employmentType));
  const handleSaveEducation = () =>
    handleSaveSection("education", () => saveEducation(educations));
  const handleSaveWorkExperiences = () =>
    handleSaveSection("career", () => saveWorkExperiences(workExperiences));
  const handleSaveActivities = () =>
    handleSaveSection("activity", () => saveActivities(activities));
  const handleSaveSkills = () =>
    handleSaveSection("skills", () => saveSkills(skills));
  const handleSaveLinks = () =>
    handleSaveSection("links", () => saveLinks(links));
  const handleSaveIntroduction = () =>
    handleSaveSection("introduction", () => saveIntroduction(introduction));
  const handleSaveCertifications = () =>
    handleSaveSection("certifications", () => saveCertifications(certifications));

  const cancelEdit = (section: string) => {
    setEditingSection(null);
    setSaveError(null);
    setSaveErrorSection(null);
    if (section === "basicInfo") {
      setDisplayName(initialDisplayName);
      setLocation(initialState.location);
      setIntroduction(initialState.introduction);
    } else if (section === "preference") {
      setDesiredJob(initialState.desiredJob);
      setDesiredLocation(initialState.desiredLocation);
      setEmploymentType(initialState.employmentType);
    } else if (section === "introduction") setIntroduction(initialState.introduction);
    else if (section === "skills") setSkills(initialState.skills);
    else if (section === "education") setEducations(initialState.educations);
    else if (section === "career") setWorkExperiences(initialState.workExperiences);
    else if (section === "activity") setActivities(initialState.activities);
    else if (section === "certifications") setCertifications(initialState.certifications);
    else if (section === "links") setLinks(initialState.links);
  };

  const previewData: ResumeFormState = {
    location,
    desiredJob,
    desiredLocation,
    employmentType,
    introduction,
    educations,
    workExperiences,
    activities,
    links,
    certifications,
    skills,
  };

  const profileImageUrl = initialData?.member?.profile_image_url;

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <div className="min-w-0 flex-1 space-y-8 lg:pr-64">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
              내 이력서
            </h1>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              {!initialData
                ? "아래 항목을 채워 넣고 각 섹션의 저장 버튼을 눌러 저장하세요."
                : "각 섹션을 수정한 뒤 해당 섹션의 저장 버튼을 눌러 저장하세요."}
            </p>
          </div>
          <ResumePreviewModal
            displayName={displayName}
            profileImageUrl={profileImageUrl}
            data={previewData}
          >
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
            >
              <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              미리보기
            </button>
          </ResumePreviewModal>
        </div>

        <div id="section-basicInfo">
          <FormSectionBasicInfo
        displayName={displayName}
        onDisplayNameChange={setDisplayName}
        jobTitle={jobTitle}
        onJobTitleChange={setJobTitle}
        location={location}
        onLocationChange={setLocation}
        email={initialData?.member?.email ?? ""}
        oneLineIntro={introduction}
        onOneLineIntroChange={setIntroduction}
        profileImageUrl={profileImageUrl}
        isEditing={editingSection === "basicInfo"}
        onEnterEdit={() => setEditingSection("basicInfo")}
        onCancelEdit={() => cancelEdit("basicInfo")}
        onSave={handleSaveBasicInfo}
        isSaving={savingSection === "basicInfo"}
        saveError={saveErrorSection === "basicInfo" ? saveError : null}
          />
        </div>
        <div id="section-preference">
          <FormSectionPreference
        desiredJob={desiredJob}
        desiredLocation={desiredLocation}
        employmentType={employmentType}
        onDesiredJobChange={setDesiredJob}
        onDesiredLocationChange={setDesiredLocation}
        onEmploymentTypeChange={setEmploymentType}
        isEditing={editingSection === "preference"}
        onEnterEdit={() => setEditingSection("preference")}
        onCancelEdit={() => cancelEdit("preference")}
        onSave={handleSavePreference}
        isSaving={savingSection === "preference"}
        saveError={saveErrorSection === "preference" ? saveError : null}
          />
        </div>
        <div id="section-introduction">
          <FormSectionIntroduction
        introduction={introduction}
        onIntroductionChange={setIntroduction}
        isEditing={editingSection === "introduction"}
        onEnterEdit={() => setEditingSection("introduction")}
        onCancelEdit={() => cancelEdit("introduction")}
        onSave={handleSaveIntroduction}
        isSaving={savingSection === "introduction"}
        saveError={saveErrorSection === "introduction" ? saveError : null}
          />
        </div>
        <div id="section-skills">
          <FormSectionSkills
        skills={skills}
        onSkillsChange={setSkills}
        isEditing={editingSection === "skills"}
        onEnterEdit={() => setEditingSection("skills")}
        onCancelEdit={() => cancelEdit("skills")}
        onSave={handleSaveSkills}
        isSaving={savingSection === "skills"}
        saveError={saveErrorSection === "skills" ? saveError : null}
          />
        </div>
        <div id="section-education">
          <FormSectionEducation
        educations={educations}
        onAdd={addEducation}
        onUpdate={updateEducation}
        onRemove={(i) => setEducations((p) => p.filter((_, j) => j !== i))}
        isEditing={editingSection === "education"}
        onEnterEdit={() => setEditingSection("education")}
        onCancelEdit={() => cancelEdit("education")}
        onSave={handleSaveEducation}
        isSaving={savingSection === "education"}
        saveError={saveErrorSection === "education" ? saveError : null}
          />
        </div>
        <div id="section-career">
          <FormSectionCareer
        workExperiences={workExperiences}
        onWorkAdd={addWork}
        onWorkUpdate={updateWork}
        onWorkPerfUpdate={updateWorkPerf}
        onWorkPerfAdd={addWorkPerf}
        onWorkPerfRemove={removeWorkPerf}
        onWorkRemove={removeWork}
        isEditing={editingSection === "career"}
        onEnterEdit={() => setEditingSection("career")}
        onCancelEdit={() => cancelEdit("career")}
        onSave={handleSaveWorkExperiences}
        isSaving={savingSection === "career"}
        saveError={saveErrorSection === "career" ? saveError : null}
          />
        </div>
        <div id="section-activity">
          <FormSectionActivity
        activities={activities}
        onAdd={addActivity}
        onUpdate={updateActivity}
        onRemove={removeActivity}
        isEditing={editingSection === "activity"}
        onEnterEdit={() => setEditingSection("activity")}
        onCancelEdit={() => cancelEdit("activity")}
        onSave={handleSaveActivities}
        isSaving={savingSection === "activity"}
        saveError={saveErrorSection === "activity" ? saveError : null}
          />
        </div>
        <div id="section-certifications">
          <FormSectionCertificationAward
        certifications={certifications}
        onAdd={addCert}
        onUpdate={updateCert}
        onRemove={removeCert}
        isEditing={editingSection === "certifications"}
        onEnterEdit={() => setEditingSection("certifications")}
        onCancelEdit={() => cancelEdit("certifications")}
        onSave={handleSaveCertifications}
        isSaving={savingSection === "certifications"}
        saveError={saveErrorSection === "certifications" ? saveError : null}
          />
        </div>
        <div id="section-links">
          <FormSectionLinks
        links={links}
        onAdd={addLink}
        onUpdate={updateLink}
        onRemove={removeLink}
        isEditing={editingSection === "links"}
        onEnterEdit={() => setEditingSection("links")}
        onCancelEdit={() => cancelEdit("links")}
        onSave={handleSaveLinks}
        isSaving={savingSection === "links"}
        saveError={saveErrorSection === "links" ? saveError : null}
          />
        </div>

        <div className="flex justify-end">
          <Link
            href="/"
            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            ← 홈으로
          </Link>
        </div>
      </div>

      <ResumeSectionNav />
    </div>
  );
}
