import Link from "next/link";
import { PageHero } from "@/components/ui";

const items = [
  { href: "/", title: "Home", ru: "Главная", emoji: "🏠", grad: "from-sky-400 to-indigo-500" },
  { href: "/writing", title: "Writing", ru: "Письмо", emoji: "✍️", grad: "from-amber-400 to-orange-600" },
  { href: "/vocabulary", title: "Words", ru: "Словарь", emoji: "📚", grad: "from-emerald-400 to-teal-600" },
  { href: "/lessons", title: "All lessons", ru: "Все уроки", emoji: "🎓", grad: "from-fuchsia-500 to-purple-600" },
  { href: "/progress", title: "Progress", ru: "Прогресс", emoji: "📊", grad: "from-lime-400 to-green-600" },
  { href: "/settings", title: "Settings", ru: "Настройки", emoji: "⚙️", grad: "from-slate-500 to-slate-700" },
  { href: "/admin", title: "Admin", ru: "Учитель", emoji: "👩‍🏫", grad: "from-slate-600 to-indigo-700" },
];

export default function MorePage() {
  return (
    <div className="space-y-6">
      <PageHero title="More" subtitle="Extra sections" emoji="✨" gradient="from-violet-400 to-purple-600" />
      <div className="grid grid-cols-2 gap-4">
        {items.map((i) => (
          <Link key={i.href} href={i.href} className={`pop-in rounded-3xl p-5 text-white shadow-lg bg-gradient-to-br ${i.grad} hover:scale-[1.03] transition`}>
            <div className="text-4xl">{i.emoji}</div>
            <div className="mt-2 text-xl font-bold">{i.title}</div>
            <div className="text-sm opacity-90">{i.ru}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
