import Link from "next/link";
import { format, isSameMonth, isToday } from "date-fns";
import { nl } from "date-fns/locale";
import {
  dayKey,
  formatDayParam,
  getCalendarGrid,
  nextMonthParam,
  previousMonthParam,
} from "@/lib/date";
import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/money";

export interface DayResult {
  count: number;
  netR: number;
  /** Summed P&L of that day's trades that have one; null when none do. */
  pnl: number | null;
}

interface MonthCalendarProps {
  monthDate: Date;
  dailyResults: Map<string, DayResult>;
  basePath?: string;
}

const WEEKDAY_LABELS = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

export function MonthCalendar({
  monthDate,
  dailyResults,
  basePath = "/trading",
}: MonthCalendarProps) {
  const days = getCalendarGrid(monthDate);

  return (
    <div className="rounded-2xl border border-slate-200 bg-surface p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href={`${basePath}?month=${previousMonthParam(monthDate)}`}
          className="rounded-md px-2 py-1 text-sm text-slate-500 hover:bg-slate-100"
        >
          &larr;
        </Link>
        <h2 className="text-base font-semibold text-slate-900 first-letter:uppercase">
          {format(monthDate, "MMMM yyyy", { locale: nl })}
        </h2>
        <Link
          href={`${basePath}?month=${nextMonthParam(monthDate)}`}
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
          const result = dailyResults.get(key);
          const inMonth = isSameMonth(day, monthDate);

          let colorClasses = "bg-slate-50 text-slate-400";
          if (result && result.count > 0) {
            if (result.netR > 0) {
              colorClasses = "bg-emerald-100 text-emerald-900";
            } else if (result.netR < 0) {
              colorClasses = "bg-rose-100 text-rose-900";
            } else {
              colorClasses = "bg-slate-200 text-slate-700";
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
                isToday(day) && "ring-2 ring-gold-600",
              )}
            >
              <span className="font-medium">{format(day, "d")}</span>
              {result && result.count > 0 && (
                <span className="text-[10px] leading-tight">
                  {result.count}x &middot; {result.netR > 0 ? "+" : ""}
                  {result.netR.toFixed(1)}R
                </span>
              )}
              {result && result.pnl != null && (
                <span className="hidden text-[10px] leading-tight font-medium sm:block">
                  {formatMoney(Math.round(result.pnl), { signed: true })}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
