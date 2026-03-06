import { redirect } from "next/navigation";
import { getResumeData } from "./actions";
import { ResumeForm } from "./ResumeForm";

export default async function ResumePage() {
  const { resume, displayName, error } = await getResumeData();

  if (error === "unauthorized") {
    redirect("/login?next=/resume");
  }

  return (
    <div className="bg-[var(--background)]">
      <div className="mx-auto max-w-[75rem] px-4 py-8 sm:px-6 lg:px-8">
        <ResumeForm key={resume?.id ?? "new"} displayName={displayName} initialData={resume ?? undefined} />
      </div>
    </div>
  );
}
