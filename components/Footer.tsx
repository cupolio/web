import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  서비스: [
    { label: "바리스타 찾기", href: "/baristas" },
    { label: "채용공고", href: "/jobs" },
    { label: "이용안내", href: "/about" },
  ],
  정책: [
    { label: "이용약관", href: "/terms" },
    { label: "개인정보처리방침", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--footer-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/text-logo.png"
                alt="cupolio"
                width={90}
                height={26}
                className="h-6 w-auto object-contain object-left"
                unoptimized
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-[var(--muted-foreground)]">
              바리스타의 커리어 플랫폼
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              서비스
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.서비스.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              정책
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.정책.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-8">
          <p className="text-center text-sm text-[var(--muted-foreground)]">
            © {new Date().getFullYear()} cupolio
          </p>
        </div>
      </div>
    </footer>
  );
}
