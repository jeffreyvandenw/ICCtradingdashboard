import Link from "next/link";
import { format, isSameMonth, isToday } from "date-fns";
import {
  dayKey,
  formatDayParam,
  getCalendarGrid,
  nextMonthParam,
  previousMonthParam,
} from "@/lib/date";
import { cn } from "@/lib/utils";

export interface DayResult {
  count: number;
  netR: number;
}

interface MonthCalendarProps {
  monthDate: Date;
  dailyResults: Map<string, DayResult>;
}

const WEEKDAY_LABELS = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

export function MonthCalendar({ monthDate, dailyResults }: MonthCalendarProps) {
  const days = getCalendarGrid(monthDate);

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href={`/?month=${previousMonthParam(monthDate)}`}
          className="rounded-md px-2 py-1 text-sm text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          &larr;
        </Link>
        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          {format(monthDate, "MMMM yyyy")}
        </h2>
        <Link
          href={`/?month=${nextMonthParam(monthDate)}`}
          className="rounded-md px-2 py-1 text-sm text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-neutral-400">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="py-1">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const key = dayKey(day);
          const result = dailyResults.get(key);
          const inMonth = isSameMonth(day, monthDate);

          let colorClasses =
            "bg-neutral-50 dark:bg-neutral-800/50 text-neutral-400";
          if (result && result.count > 0) {
            if (result.netR > 0) {
              colorClasses =
                "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200";
            } else if (result.netR < 0) {
              colorClasses =
                "bg-red-100 text-red-900 dark:bg-red-900/40 dark:text-red-200";
            } else {
              colorClasses =
                "bg-neutral-200 text-neutral-700 dark:bg-neutral-700/50 dark:text-neutral-200";
            }
          }

          return (
            <Link
              key={key}
              href={`/day/${formatDayParam(day)}`}
              className={cn(
                "flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition-colors",
                colorClasses,
                !inMonth && "opacity-40",
                isToday(day) && "ring-2 ring-neutral-900 dark:ring-neutral-100",
              )}
            >
              <span className="font-medium">{format(day, "d")}</span>
              {result && result.count > 0 && (
                <span className="text-[10px]">
                  {result.count}x &middot; {result.netR > 0 ? "+" : ""}
                  {result.netR.toFixed(1)}R
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
