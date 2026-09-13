export default function ProgressBar({
  value,
  max,
  label,
}: {
  value: number;
  max: number;
  label?: string;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div>
      {label && (
        <div className="mb-1.5 flex justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>{label}</span>
          <span>
            {value}/{max} ({pct}%)
          </span>
        </div>
      )}
      <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-teal-400 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
