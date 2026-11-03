"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Главная", icon: "🏠" },
  { href: "/vocabulary", label: "Слова", icon: "📚" },
  { href: "/practice", label: "Карточки", icon: "🧠" },
  { href: "/b2", label: "B2 карточки", icon: "🎓" },
  { href: "/lessons", label: "Уроки", icon: "📖" },
  { href: "/listening", label: "Аудирование", icon: "🎧" },
  { href: "/progress", label: "Прогресс", icon: "📊" },
  { href: "/settings", label: "Настройки", icon: "⚙️" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 border-r border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm z-40">
        <div className="px-5 py-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🇬🇧</span>
            <div>
              <div className="font-semibold text-slate-900 dark:text-slate-100">English RU</div>
              <div className="text-xs text-slate-500">A1–B2 для русскоязычных</div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-sky-100 text-sky-900 dark:bg-sky-900/40 dark:text-sky-100 font-medium"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                }`}
              >
                <span aria-hidden>{l.icon}</span>
                {l.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm safe-bottom">
        <div className="flex justify-around px-1 py-1.5">
          {links.slice(0, 5).map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] ${
                  active ? "text-sky-600 dark:text-sky-400" : "text-slate-500"
                }`}
              >
                <span className="text-lg leading-none">{l.icon}</span>
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/progress"
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] ${
              pathname === "/progress" || pathname === "/settings"
                ? "text-sky-600 dark:text-sky-400"
                : "text-slate-500"
            }`}
          >
            <span className="text-lg leading-none">⋯</span>
            Ещё
          </Link>
        </div>
      </nav>
    </>
  );
}
