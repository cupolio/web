import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) next = "/";

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    ? process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "")
    : origin;

  const cookieStore = await cookies();
  const savedState = cookieStore.get("oauth_state")?.value;
  cookieStore.delete("oauth_state");

  if (!code || !state || state !== savedState) {
    return NextResponse.redirect(`${baseUrl}/login?error=auth`);
  }

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `${baseUrl}/auth/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${baseUrl}/login?error=auth`);
  }

  const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(`${baseUrl}/login?error=auth`);
  }

  const tokens = await tokenRes.json();
  const idToken = tokens.id_token;
  if (!idToken) {
    return NextResponse.redirect(`${baseUrl}/login?error=auth`);
  }

  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: idToken,
  });

  if (authError || !authData.user) {
    return NextResponse.redirect(`${baseUrl}/login?error=auth`);
  }

  const user = authData.user;
  const meta = user.user_metadata ?? {};
  const avatarUrl = meta.avatar_url ?? meta.picture ?? "";
  const displayName = meta.full_name ?? meta.name ?? user.email?.split("@")[0] ?? "";
  const provider = "google";
  const providerId =
    (() => {
      try {
        const payload = JSON.parse(
          Buffer.from(idToken.split(".")[1], "base64url").toString()
        );
        return payload.sub ?? user.id;
      } catch {
        return user.id;
      }
    })();

  const admin = createAdminClient();
  const now = new Date().toISOString();
  const memberRow = {
    uid: user.id,
    type: "unknown" as const,
    email: user.email ?? "",
    profile_image_url: avatarUrl || "",
    display_name: displayName || null,
    provider,
    provider_id: String(providerId),
    created: now,
    updated: now,
  };

  const { data: existing } = await admin
    .from("member")
    .select("id")
    .eq("uid", user.id)
    .is("deleted", null)
    .maybeSingle();

  const memberError = existing
    ? (
        await admin
          .from("member")
          .update({
            email: memberRow.email,
            profile_image_url: memberRow.profile_image_url,
            updated: now,
          })
          .eq("uid", user.id)
      ).error
    : (await admin.from("member").insert(memberRow)).error;

  if (memberError) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${baseUrl}/login?error=auth`);
  }

  return NextResponse.redirect(`${baseUrl}${next}`);
}
