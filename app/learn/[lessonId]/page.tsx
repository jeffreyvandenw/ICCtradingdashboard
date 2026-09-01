import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson } from "@/lib/lessons";
import { LessonQuiz } from "@/components/learn/LessonQuiz";
import { MarkCompleteButton } from "@/components/learn/MarkCompleteButton";
import { DeleteLessonButton } from "@/components/learn/DeleteLessonButton";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = await getLesson(lessonId);
  if (!lesson) notFound();

  const backtestHref = lesson.suggestedHypothesis
    ? `/backtest?lessonId=${lesson.id}&hypothesis=${encodeURIComponent(lesson.suggestedHypothesis)}`
    : `/backtest?lessonId=${lesson.id}`;

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          {lesson.title}
        </h1>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href={`/learn/${lesson.id}/edit`}
            className="text-xs text-neutral-500 hover:underline"
          >
            Bewerken
          </Link>
          <DeleteLessonButton lessonId={lesson.id} />
        </div>
      </div>

      {lesson.videoRef && (
        <a
          href={lesson.videoRef}
          target="_blank"
          rel="noreferrer"
          className="block text-sm text-sky-600 hover:underline"
        >
          Video / bron bekijken
        </a>
      )}

      {lesson.content && (
        <div className="whitespace-pre-wrap rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
          {lesson.content}
        </div>
      )}

      {lesson.quiz && lesson.quiz.questions.length > 0 ? (
        <LessonQuiz
          lessonId={lesson.id}
          quiz={lesson.quiz}
          initialScore={lesson.quizScore}
        />
      ) : (
        <MarkCompleteButton lessonId={lesson.id} completed={lesson.completed} />
      )}

      <Link
        href={backtestHref}
        className="inline-block rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
      >
        Start backtest-sessie over dit onderwerp
      </Link>

      <div>
        <Link
          href="/learn"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          &larr; Terug naar lesprogramma
        </Link>
      </div>
    </div>
  );
}
