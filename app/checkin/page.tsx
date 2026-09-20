import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { getCheckIns, getFirstCheckInDay } from "@/lib/checkins";
import { CheckInCalendar } from "@/components/checkin/CheckInCalendar";
import {
  dayKey,
  formatMonthParam,
  parseDayParam,
  parseMonthParam,
} from "@/lib/date";
import type { CheckIn } from "@/lib/db/schema";

export default async function CheckInPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const { month } = await searchParams;
  const monthDate = parseMonthParam(month);

  const [checkIns, firstDay] = await Promise.all([
    getCheckIns(),
    getFirstCheckInDay(),
  ]);

  const checkInsByDay = new Map<string, CheckIn>();
  for (const entry of checkIns) checkInsByDay.set(entry.day, entry);

  const todayKey = dayKey(new Date());
  const monthPrefix = formatMonthParam(monthDate);
  const monthEntries = checkIns
    .filter((entry) => entry.day.startsWith(monthPrefix))
    .sort((a, b) => (a.day < b.day ? 1 : -1));

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-6 py-6">
      <h1 className="text-xl font-semibold text-slate-900">Check-in</h1>

      <CheckInCalendar
        monthDate={monthDate}
        checkInsByDay={checkInsByDay}
        todayKey={todayKey}
        firstDay={firstDay}
      />

      {monthEntries.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500">Deze maand</p>
          {monthEntries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-900">
                {format(parseDayParam(entry.day), "EEEE d MMMM", {
                  locale: nl,
                })}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-4 text-xs text-slate-500">
                <span>
                  Gisteren gedaan wat je zei:{" "}
                  <span className="font-medium text-slate-700">
                    {entry.didYesterday ? "Ja" : "Nee"}
                  </span>
                </span>
                <span>
                  Vertrouwen voor die dag:{" "}
                  <span className="font-medium text-slate-700">
                    {entry.confidentToday ? "Ja" : "Nee"}
                  </span>
                </span>
              </div>
              {entry.notes && (
                <p className="mt-2 rounded-lg bg-slate-50 p-2.5 text-sm text-slate-700">
                  {entry.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
