import { notFound } from "next/navigation";
import { allListening, getListening } from "@/data/listening";
import ListeningLesson from "@/components/listening/ListeningLesson";

export function generateStaticParams() { return allListening.map((l) => ({ id: l.id })); }

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getListening(id);
  if (!lesson) notFound();
  return <ListeningLesson lesson={lesson} />;
}
