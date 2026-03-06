"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { useDisplayNameOverride, stripSpecialChars } from "@/lib/display-name-context";
import { getDisplayNameForCurrentUser } from "@/lib/actions/get-display-name";

interface HeaderAuthProps {
  initialMemberDisplayName?: string | null;
}

export default function HeaderAuth({ initialMemberDisplayName }: HeaderAuthProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [memberDisplayName, setMemberDisplayName] = useState<{ userId: string; name: string | null } | null>(null);
  const displayNameOverride = useDisplayNameOverride()?.displayNameOverride ?? null;

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      setUser(u);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const userId = user.id;
    let cancelled = false;
    getDisplayNameForCurrentUser().then((name) => {
      if (!cancelled) setMemberDisplayName({ userId, name });
    });
    return () => {
      cancelled = true;
    };
  }, [user, pathname]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <span className="h-9 w-24 animate-pulse rounded-full bg-[var(--muted)]" />
      </div>
    );
  }

  if (user) {
    const fetchedDbName =
      memberDisplayName && memberDisplayName.userId === user.id ? memberDisplayName.name : null;
    const dbName = fetchedDbName ?? initialMemberDisplayName ?? null;
    const raw =
      displayNameOverride !== null
        ? displayNameOverride
        : dbName ??
          user.user_metadata?.full_name ??
          user.user_metadata?.name ??
          user.email?.split("@")[0] ??
          "회원";
    const displayName = stripSpecialChars(raw) || "회원";
    return (
      <div className="group relative flex cursor-pointer items-center gap-1.5 py-2">
        <span
          className="max-w-[120px] truncate text-sm font-medium text-[#444444] sm:max-w-[140px]"
          title={user.email ?? undefined}
        >
          {displayName} 님
        </span>
        <svg
          className="h-4 w-4 text-[var(--muted-foreground)] transition-transform group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>

        <div className="invisible absolute right-0 top-full z-50 -mt-1 min-w-[180px] rounded-lg border border-[var(--border)] bg-white py-2 pt-3 shadow-lg opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <Link
            href="/resume"
            className="block cursor-pointer px-4 py-2.5 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
          >
            이력서
          </Link>
          <Link
            href="/likes"
            className="block cursor-pointer px-4 py-2.5 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
          >
            관심 목록
          </Link>
          <Link
            href="/settings"
            className="block cursor-pointer px-4 py-2.5 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
          >
            설정
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="block w-full cursor-pointer px-4 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            로그아웃
          </button>
        </div>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-full bg-[#ea580c] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#c2410c]"
    >
      회원가입 · 로그인
    </Link>
  );
}
