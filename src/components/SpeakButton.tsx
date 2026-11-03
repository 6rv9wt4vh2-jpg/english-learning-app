"use client";

import { speakEnglish } from "@/lib/speech";

export default function SpeakButton({
  text,
  label = "Pronounce word",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); speakEnglish(text); }}
      className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-3.5 py-1.5 text-sm font-semibold shadow-md hover:scale-105 active:scale-95 transition ${className}`}
      aria-label={label}
    >
      <span aria-hidden>🔊</span>
      {label}
    </button>
  );
}
