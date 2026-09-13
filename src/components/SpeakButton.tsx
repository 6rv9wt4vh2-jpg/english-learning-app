"use client";

import { speakEnglish } from "@/lib/speech";

export default function SpeakButton({
  text,
  label = "Произнести",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => speakEnglish(text)}
      className={`inline-flex items-center gap-1.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200 px-3 py-1.5 text-sm font-medium hover:bg-sky-200 dark:hover:bg-sky-800/60 transition ${className}`}
      aria-label={label}
    >
      <span aria-hidden>🔊</span>
      {label}
    </button>
  );
}
