import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DisplayNameOverrideProvider } from "@/lib/display-name-context";
import { getDisplayNameForCurrentUser } from "@/lib/actions/get-display-name";

export const metadata: Metadata = {
  title: "커폴리오 | 바리스타 커리어 플랫폼",
  description:
    "바리스타의 이력서·포트폴리오를 관리하고, 카페와 연결하는 커리어 플랫폼이에요.",
  icons: {
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialMemberDisplayName = await getDisplayNameForCurrentUser();

  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased font-sans">
        <DisplayNameOverrideProvider>
          <Header initialMemberDisplayName={initialMemberDisplayName} />
          <main className="flex-1">{children}</main>
          <Footer />
        </DisplayNameOverrideProvider>
      </body>
    </html>
  );
}
