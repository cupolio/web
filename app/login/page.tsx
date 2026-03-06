import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center">로딩 중이에요</div>}>
      <LoginForm />
    </Suspense>
  );
}
