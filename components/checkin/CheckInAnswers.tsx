import { cn } from "@/lib/utils";
import type { CheckIn } from "@/lib/db/schema";

export const DID_AS_PROMISED_QUESTION =
  "Heb je vandaag gedaan wat je zei dat je ging doen?";
export const CONFIDENT_TOMORROW_QUESTION =
  "Heb je er vertrouwen in dat je morgen gaat doen wat je moet doen?";

function Answer({
  question,
  yes,
  note,
}: {
  question: string;
  yes: boolean;
  note: string | null;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-slate-600">{question}</p>
        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold",
            yes
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700",
          )}
        >
          {yes ? "Ja" : "Nee"}
        </span>
      </div>
      {note && (
        <p className="mt-1.5 whitespace-pre-wrap rounded-lg border-l-2 border-amber-400 bg-slate-50 px-3 py-2 text-sm text-slate-700">
          {note}
        </p>
      )}
    </div>
  );
}

/** Read-only view of one day's check-in answers. */
export function CheckInAnswers({ checkIn }: { checkIn: CheckIn }) {
  return (
    <div className="space-y-3">
      <Answer
        question={DID_AS_PROMISED_QUESTION}
        yes={checkIn.didAsPromised}
        note={checkIn.didAsPromisedNote}
      />
      <Answer
        question={CONFIDENT_TOMORROW_QUESTION}
        yes={checkIn.confidentTomorrow}
        note={checkIn.confidentTomorrowNote}
      />
      {checkIn.notes && (
        <div>
          <p className="text-xs font-medium text-slate-500">Verder nog</p>
          <p className="mt-1 whitespace-pre-wrap rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
            {checkIn.notes}
          </p>
        </div>
      )}
    </div>
  );
}
