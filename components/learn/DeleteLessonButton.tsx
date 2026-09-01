"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteLesson } from "@/lib/lessons";

export function DeleteLessonButton({ lessonId }: { lessonId: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="text-xs text-red-600 hover:underline"
      >
        Verwijderen
      </button>
    );
  }

  return (
    <span className="flex items-center gap-2 text-xs">
      Zeker weten?
      <button
        type="button"
        disabled={deleting}
        onClick={async () => {
          setDeleting(true);
          await deleteLesson(lessonId);
          router.push("/learn");
          router.refresh();
        }}
        className="text-red-600 hover:underline disabled:opacity-50"
      >
        Ja, verwijderen
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="text-neutral-500 hover:underline"
      >
        Annuleren
      </button>
    </span>
  );
}
