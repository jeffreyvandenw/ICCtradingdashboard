"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteBacktestSession } from "@/lib/backtest";

export function DeleteSessionButton({
  sessionId,
  label,
  redirectTo,
}: {
  sessionId: string;
  label: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (
      !window.confirm(
        `Backtest "${label}" met alle trades verwijderen? Dit kan niet ongedaan worden gemaakt.`,
      )
    ) {
      return;
    }
    startTransition(async () => {
      await deleteBacktestSession(sessionId);
      if (redirectTo) router.push(redirectTo);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-xs font-medium text-slate-400 hover:text-rose-600 disabled:opacity-50"
    >
      {isPending ? "Verwijderen..." : "Verwijderen"}
    </button>
  );
}
