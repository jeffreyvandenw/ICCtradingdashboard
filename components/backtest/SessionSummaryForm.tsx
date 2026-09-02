"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBacktestSessionSummary } from "@/lib/backtest";

export function SessionSummaryForm({
  sessionId,
  initialSummary,
}: {
  sessionId: string;
  initialSummary: string | null;
}) {
  const router = useRouter();
  const [summary, setSummary] = useState(initialSummary ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await updateBacktestSessionSummary(sessionId, summary);
    setSaving(false);
    setSaved(true);
    router.refresh();
  }

  return (
    <div className="space-y-2 rounded-lg border border-neutral-200 bg-white p-4">
      <label className="block text-xs font-medium text-neutral-600">
        Samenvatting achteraf
        <textarea
          rows={3}
          className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
          value={summary}
          onChange={(e) => {
            setSummary(e.target.value);
            setSaved(false);
          }}
        />
      </label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 disabled:opacity-50"
        >
          {saving ? "Opslaan..." : "Samenvatting opslaan"}
        </button>
        {saved && <span className="text-xs text-emerald-600">Opgeslagen</span>}
      </div>
    </div>
  );
}
