export default function StatCard({
  label,
  value,
  hint,
  emoji,
}: {
  label: string;
  value: string | number;
  hint?: string;
  emoji?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
        {emoji && <span className="text-xl">{emoji}</span>}
      </div>
      <div className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-50">{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}
