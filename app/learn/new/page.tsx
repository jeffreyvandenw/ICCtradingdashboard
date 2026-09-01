import { LessonEditor } from "@/components/learn/LessonEditor";

export default function NewLessonPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
      <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
        Nieuwe les
      </h1>
      <LessonEditor />
    </div>
  );
}
