import Link from "next/link";

export default function LikesPage() {
  return (
    <div className="bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
          관심 목록
        </h1>
        <p className="mt-4 text-[var(--muted-foreground)]">
          준비 중입니다. 곧 만나요.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex text-sm font-medium text-[#ea580c] hover:underline"
        >
          ← 홈으로
        </Link>
      </div>
    </div>
  );
}
