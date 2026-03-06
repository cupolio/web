"use server";

import { cookies } from "next/headers";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

function generateState() {
  return Array.from(crypto.getRandomValues(new Uint8Array(24)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getBaseUrl(origin: string): string {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  return origin;
}

export async function getGoogleAuthUrl(origin: string) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) throw new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set");

  const baseUrl = getBaseUrl(origin);
  const state = generateState();
  const cookieStore = await cookies();
  cookieStore.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });

  const redirectUri = `${baseUrl}/auth/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
  });

  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}
