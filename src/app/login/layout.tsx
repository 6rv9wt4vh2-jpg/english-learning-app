import { Suspense } from "react";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="text-slate-500 p-8">Loading…</div>}>{children}</Suspense>;
}
