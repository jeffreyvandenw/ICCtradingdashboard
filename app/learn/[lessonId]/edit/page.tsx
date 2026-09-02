import { notFound } from "next/navigation";
import { getLesson } from "@/lib/lessons";
import { LessonEditor } from "@/components/learn/LessonEditor";

export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = await getLesson(lessonId);
  if (!lesson) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
      <h1 className="text-xl font-semibold text-neutral-900">
        Les bewerken
      </h1>
      <LessonEditor lesson={lesson} />
    </div>
  );
}
