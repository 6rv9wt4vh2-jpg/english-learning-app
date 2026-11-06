import type { ReactNode } from "react";

export function PageHero({ title, subtitle, emoji, gradient = "from-sky-400 to-indigo-500", breadcrumb, children }: {
  title: string; subtitle?: string; emoji?: string; gradient?: string; breadcrumb?: ReactNode; children?: ReactNode;
}) {
  return (
    <header className={`pop-in relative overflow-hidden rounded-3xl p-6 text-white shadow-xl bg-gradient-to-br ${gradient}`}>
      <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/15" />
      <div className="absolute right-10 -bottom-10 h-24 w-24 rounded-full bg-white/10" />
      {breadcrumb && <div className="relative mb-4">{breadcrumb}</div>}
      <div className="relative flex items-start gap-4">
        {emoji && <div className="float text-4xl sm:text-5xl drop-shadow">{emoji}</div>}
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1 text-sm sm:text-base opacity-90">{subtitle}</p>}
          {children}
        </div>
      </div>
    </header>
  );
}

export function Chip({ active, onClick, children, color = "bg-gradient-to-r from-sky-500 to-indigo-600" }: {
  active: boolean; onClick: () => void; children: ReactNode; color?: string;
}) {
  return (
    <button type="button" onClick={onClick} className={`chip ${active ? `chip-active ${color}` : ""}`}>
      {children}
    </button>
  );
}

export function FilterRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function Loading() {
  return <div className="text-slate-500 animate-pulse">Loading… / Загрузка…</div>;
}
