import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { getCheckIns, getFirstCheckInDay } from "@/lib/checkins";
import { CheckInCalendar } from "@/components/checkin/CheckInCalendar";
import { CheckInAnswers } from "@/components/checkin/CheckInAnswers";
import { checkInDayStatus } from "@/lib/checkin-status";
import { dayKey, parseDayParam, parseMonthParam } from "@/lib/date";
import type { CheckIn } from "@/lib/db/schema";

const DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export default async function CheckInPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; day?: string }>;
}) {
  const { month, day } = await searchParams;
  const monthDate = parseMonthParam(month);

  const [checkIns, firstDay] = await Promise.all([
    getCheckIns(),
    getFirstCheckInDay(),
  ]);

  const checkInsByDay = new Map<string, CheckIn>();
  for (const entry of checkIns) checkInsByDay.set(entry.day, entry);

  const todayKey = dayKey(new Date());
  const selectedDay = day && DAY_PATTERN.test(day) ? day : todayKey;
  const selectedEntry = checkInsByDay.get(selectedDay);
  const selectedStatus = checkInDayStatus({
    day: selectedDay,
    today: todayKey,
    firstDay,
    entry: selectedEntry,
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-6 py-6">
      <h1 className="text-xl font-semibold text-slate-900">Check-in</h1>

      <CheckInCalendar
        monthDate={monthDate}
        checkInsByDay={checkInsByDay}
        todayKey={todayKey}
        firstDay={firstDay}
        selectedDay={selectedDay}
      />

      <div className="rounded-2xl border border-slate-200 bg-surface p-5 shadow-sm">
        <p className="mb-3 text-sm font-semibold text-slate-900 first-letter:uppercase">
          {format(parseDayParam(selectedDay), "EEEE d MMMM yyyy", {
            locale: nl,
          })}
        </p>
        {selectedEntry ? (
          <CheckInAnswers checkIn={selectedEntry} />
        ) : selectedStatus === "red" ? (
          <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
            Niets ingevuld op deze dag.
          </p>
        ) : (
          <p className="text-sm text-slate-400">
            {selectedDay === todayKey
              ? "Vandaag nog niet ingecheckt — dat doe je op het dashboard."
              : "Geen check-in voor deze dag."}
          </p>
        )}
      </div>
    </div>
  );
}
