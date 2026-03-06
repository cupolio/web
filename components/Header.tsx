import Link from "next/link";
import Image from "next/image";
import HeaderAuth from "./HeaderAuth";

interface HeaderProps {
  initialMemberDisplayName?: string | null;
}

export default function Header({ initialMemberDisplayName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-90"
        >
          <Image
            src="/text-logo.png"
            alt="cupolio"
            width={110}
            height={32}
            className="h-8 w-auto object-contain object-left"
            unoptimized
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="메인 메뉴">
          <Link
            href="/baristas"
            className="text-sm font-medium text-[#444444] transition-colors hover:text-[var(--foreground)]"
          >
            바리스타 찾기
          </Link>
          <Link
            href="/jobs"
            className="text-sm font-medium text-[#444444] transition-colors hover:text-[var(--foreground)]"
          >
            채용공고
          </Link>
        </nav>

        <HeaderAuth initialMemberDisplayName={initialMemberDisplayName} />
      </div>
    </header>
  );
}
