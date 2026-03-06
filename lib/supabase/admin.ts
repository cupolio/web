import { createClient } from "@supabase/supabase-js";

/**
 * Service role 클라이언트 - RLS 우회, 서버 전용.
 * auth callback 등 member 삽입 등에만 사용.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for admin client");
  }
  return createClient(url, key);
}
