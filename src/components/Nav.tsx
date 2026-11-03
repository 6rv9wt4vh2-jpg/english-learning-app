"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", icon: "🏠", grad: "from-sky-400 to-indigo-500" },
  { href: "/cards", label: "Cards", icon: "🃏", grad: "from-amber-400 to-orange-500" },
  { href: "/grammar", label: "Grammar", icon: "📐", grad: "from-fuchsia-500 to-purple-600" },
  { href: "/reading", label: "Reading", icon: "📖", grad: "from-cyan-400 to-blue-600" },
  { href: "/writing", label: "Writing", icon: "✍️", grad: "from-amber-400 to-orange-600" },
  { href: "/speaking", label: "Speaking", icon: "🎙️", grad: "from-rose-400 to-pink-600" },
  { href: "/vocabulary", label: "Words", icon: "📚", grad: "from-emerald-400 to-teal-500" },
  { href: "/listening", label: "Listening", icon: "🎧", grad: "from-cyan-400 to-blue-600" },
  { href: "/progress", label: "Progress", icon: "📊", grad: "from-lime-400 to-green-600" },
  { href: "/settings", label: "Settings", icon: "⚙️", grad: "from-slate-400 to-slate-600" },
];
const mobile = [...links.slice(0, 6), { href: "/more", label: "More", icon: "✨", grad: "from-violet-400 to-purple-600" }];
const moreRoutes = ["/more", "/vocabulary", "/listening", "/progress", "/settings", "/practice"];
const LESSON_TYPE: Record<string, string> = { g: "/grammar", r: "/reading", w: "/writing" };

function isActive(pathname: string, href: string) {
  const m = pathname.match(/^\/lessons\/[a-z0-9]+-([grw])-/);
  if (m) return LESSON_TYPE[m[1]] === href;
  if (href === "/more") return moreRoutes.some((r) => pathname.startsWith(r));
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

export default function Nav() {
  const pathname = usePathname();
  return (
    <>
      <aside className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 border-r border-white/50 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur z-40">
        <div className="px-5 py-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🇬🇧</span>
            <div>
              <div className="font-extrabold bg-gradient-to-r from-sky-500 to-pink-500 bg-clip-text text-transparent">English RU</div>
              <div className="text-xs text-slate-500">A1–C1 · для русскоязычных</div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {links.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link key={l.href} href={l.href}
                className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${
                  active ? `bg-gradient-to-r ${l.grad} text-white shadow-md` : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"}`}>
                <span aria-hidden>{l.icon}</span>{l.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/50 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur safe-bottom">
        <div className="flex justify-between px-0.5 py-1.5">
          {mobile.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link key={l.href} href={l.href} className="flex flex-col items-center gap-0.5 min-w-0 flex-1 px-0 py-0.5 text-[9px] font-semibold">
                <span className={`flex h-8 w-9 items-center justify-center rounded-xl text-lg leading-none transition ${
                  active ? `bg-gradient-to-br ${l.grad} shadow-md scale-110` : ""}`}>{l.icon}</span>
                <span className={active ? "text-slate-900 dark:text-white" : "text-slate-500"}>{l.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
