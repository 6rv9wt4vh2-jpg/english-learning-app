import Link from "next/link";
import { LEVEL_META, type Level } from "@/data/course";
import { levelListHref } from "@/lib/levelFilter";

/** End-of-exercise actions: back to the same level list + optional next lesson. */
export default function AfterLessonNav({
  level,
  sectionHref,
  nextHref,
  nextTitle,
}: {
  level: Level;
  sectionHref: string;
  nextHref?: string;
  nextTitle?: string;
}) {
  const lm = LEVEL_META[level];
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={levelListHref(sectionHref, level)}
        className={`inline-flex items-center rounded-3xl px-5 py-3 text-sm font-bold text-white shadow-lg bg-gradient-to-r ${lm.gradient} hover:scale-[1.02] transition`}
      >
        Back to {level} list
      </Link>
      {nextHref ? (
        <Link
          href={nextHref}
          className="inline-flex items-center rounded-3xl px-5 py-3 text-sm font-bold text-white shadow-lg bg-gradient-to-r from-sky-500 to-indigo-600 hover:scale-[1.02] transition"
        >
          Next lesson{nextTitle ? ` · ${nextTitle}` : ""}
        </Link>
      ) : null}
    </div>
  );
}
