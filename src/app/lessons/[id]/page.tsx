import { allUnits, getUnit } from "@/data/course";
import { lessons } from "@/data/lessons";
import LegacyLesson from "@/components/lesson/LegacyLesson";
import UnitClient from "@/components/lesson/UnitClient";

export function generateStaticParams() {
  return [...allUnits.map((u) => ({ id: u.id })), ...lessons.map((l) => ({ id: l.id }))];
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const unit = getUnit(id);
  if (unit) return <UnitClient unit={unit} />;
  return <LegacyLesson id={id} />;
}
