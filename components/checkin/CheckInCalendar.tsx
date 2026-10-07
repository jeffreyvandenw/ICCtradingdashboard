import Link from "next/link";
import { format, isSameMonth, isToday } from "date-fns";
import { nl } from "date-fns/locale";
import {
  dayKey,
  formatMonthParam,
  getCalendarGrid,
  nextMonthParam,
  previousMonthParam,
} from "@/lib/date";
import { checkInDayStatus, type CheckInDayStatus } from "@/lib/checkin-status";
import { cn } from "@/lib/utils";
import type { CheckIn } from "@/lib/db/schema";

const WEEKDAY_LABELS = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

const STATUS_CLASSES: Record<CheckInDayStatus, string> = {
  green: "bg-emerald-100 text-emerald-900 hover:bg-emerald-200",
  orange: "bg-amber-100 text-amber-900 hover:bg-amber-200",
  red: "bg-rose-100 text-rose-900 hover:bg-rose-200",
  neutral: "bg-slate-50 text-slate-400 hover:bg-slate-100",
};

export function CheckInCalendar({
  monthDate,
  checkInsByDay,
  todayKey,
  firstDay,
  selectedDay,
}: {
  monthDate: Date;
  checkInsByDay: Map<string, CheckIn>;
  todayKey: string;
  firstDay: string | null;
  selectedDay: string;
}) {
  const days = getCalendarGrid(monthDate);

  return (
    <div className="rounded-2xl border border-slate-200 bg-surface p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href={`/checkin?month=${previousMonthParam(monthDate)}`}
          className="rounded-md px-2 py-1 text-sm text-slate-500 hover:bg-slate-100"
        >
          &larr;
        </Link>
        <h2 className="text-base font-semibold text-slate-900 first-letter:uppercase">
          {format(monthDate, "MMMM yyyy", { locale: nl })}
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
            entry: checkInsByDay.get(key),
          });

          return (
            <Link
              key={key}
              href={`/checkin?month=${formatMonthParam(day)}&day=${key}`}
              scroll={false}
              className={cn(
                "flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition-colors",
                STATUS_CLASSES[status],
                !inMonth && "opacity-40",
                isToday(day) && "ring-1 ring-gold-500",
                key === selectedDay && "ring-2 ring-slate-900",
              )}
            >
              <span className="font-medium">{format(day, "d")}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Gedaan wat je moest
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          Ingevuld, niet alles &lsquo;ja&rsquo;
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          Niet ingevuld
        </span>
      </div>
    </div>
  );
}
