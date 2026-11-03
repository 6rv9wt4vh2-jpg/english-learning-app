const GRADS = ["from-orange-400 to-rose-500", "from-emerald-400 to-teal-600", "from-sky-400 to-indigo-600", "from-fuchsia-500 to-purple-600"];
export default function StatCard({ label, value, hint, emoji, index = 0 }: {
  label: string; value: string | number; hint?: string; emoji?: string; index?: number;
}) {
  return (
    <div className={`pop-in rounded-3xl p-4 text-white shadow-lg bg-gradient-to-br ${GRADS[index % GRADS.length]}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="text-xs font-semibold opacity-90">{label}</div>
        {emoji && <span className="text-xl">{emoji}</span>}
      </div>
      <div className="mt-1 text-2xl font-extrabold">{value}</div>
      {hint && <div className="mt-1 text-xs opacity-85">{hint}</div>}
    </div>
  );
}
