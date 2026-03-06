"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/** 로그인한 사용자의 member.display_name 조회 (헤더 등 전역 표시용) */
export async function getDisplayNameForCurrentUser(): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const admin = createAdminClient();
  const { data: member } = await admin
    .from("member")
    .select("display_name")
    .eq("uid", user.id)
    .is("deleted", null)
    .maybeSingle();

  const name = (member as { display_name?: string | null } | null)?.display_name?.trim();
  return name || null;
}
