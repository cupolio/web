import { redirect } from "next/navigation";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const query = params.type ? `?type=${params.type}` : "";
  redirect(`/login${query}`);
}
