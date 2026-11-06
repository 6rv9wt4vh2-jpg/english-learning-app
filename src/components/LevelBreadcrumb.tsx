import Link from "next/link";
import type { Level } from "@/data/course";
import { levelListHref } from "@/lib/levelFilter";

/** Breadcrumb for lesson headers on a gradient background (Cards-style pills). */
export default function LevelBreadcrumb({
  sectionHref,
  sectionLabel,
  level,
  currentTitle,
}: {
  sectionHref: string;
  sectionLabel: string;
  level: Level;
  currentTitle?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm font-semibold">
      <Link href={sectionHref} className="rounded-full bg-white/25 px-3 py-1 hover:bg-white/40">
        {sectionLabel}
      </Link>
      <span className="opacity-70">›</span>
      <Link href={levelListHref(sectionHref, level)} className="rounded-full bg-white/25 px-3 py-1 hover:bg-white/40">
        {level}
      </Link>
      {currentTitle ? (
        <>
          <span className="opacity-70">›</span>
          <span className="rounded-full bg-white px-3 py-1 text-slate-900 max-w-[14rem] truncate">{currentTitle}</span>
        </>
      ) : null}
    </nav>
  );
}
