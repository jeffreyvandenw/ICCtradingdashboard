import Link from "next/link";
import { format, isSameMonth, isToday } from "date-fns";
import {
  dayKey,
  getCalendarGrid,
  nextMonthParam,
  previousMonthParam,
} from "@/lib/date";
import { checkInDayStatus } from "@/lib/checkin-status";
import { cn } from "@/lib/utils";
import type { CheckIn } from "@/lib/db/schema";

const WEEKDAY_LABELS = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

export function CheckInCalendar({
  monthDate,
  checkInsByDay,
  todayKey,
  firstDay,
}: {
  monthDate: Date;
  checkInsByDay: Map<string, CheckIn>;
  todayKey: string;
  firstDay: string | null;
}) {
  const days = getCalendarGrid(monthDate);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href={`/checkin?month=${previousMonthParam(monthDate)}`}
          className="rounded-md px-2 py-1 text-sm text-slate-500 hover:bg-slate-100"
        >
          &larr;
        </Link>
        <h2 className="text-base font-semibold text-slate-900">
          {format(monthDate, "MMMM yyyy")}
        </h2>
        <Link
          href={`/checkin?month=${nextMonthParam(monthDate)}`}
          className="rounded-md px-2 py-1 text-sm text-slate-500 hover:bg-slate-100"
        >
          &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-400">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="py-1">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const key = dayKey(day);
          const inMonth = isSameMonth(day, monthDate);
          const status = checkInDayStatus({
            day: key,
            today: todayKey,
            firstDay,
            hasEntry: checkInsByDay.has(key),
          });

          const colorClasses =
            status === "green"
              ? "bg-emerald-100 text-emerald-900"
              : status === "red"
                ? "bg-rose-100 text-rose-900"
                : "bg-slate-50 text-slate-400";

          return (
            <div
              key={key}
              className={cn(
                "flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition-colors",
                colorClasses,
                !inMonth && "opacity-40",
                isToday(day) && "ring-2 ring-indigo-600",
              )}
            >
              <span className="font-medium">{format(day, "d")}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          Ingevuld
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          Gemist
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          Niet van toepassing
        </span>
      </div>
    </div>
  );
}
