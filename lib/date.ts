import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  parse,
  startOfMonth,
  startOfWeek,
} from "date-fns";

const MONTH_PARAM_FORMAT = "yyyy-MM";
const DAY_PARAM_FORMAT = "yyyy-MM-dd";

export function parseMonthParam(month: string | undefined): Date {
  if (!month) return startOfMonth(new Date());
  try {
    return startOfMonth(parse(month, MONTH_PARAM_FORMAT, new Date()));
  } catch {
    return startOfMonth(new Date());
  }
}

export function formatMonthParam(date: Date): string {
  return format(date, MONTH_PARAM_FORMAT);
}

export function parseDayParam(day: string): Date {
  return parse(day, DAY_PARAM_FORMAT, new Date());
}

export function formatDayParam(date: Date): string {
  return format(date, DAY_PARAM_FORMAT);
}

export function dayKey(date: Date): string {
  return format(date, DAY_PARAM_FORMAT);
}

export function previousMonthParam(monthDate: Date): string {
  return formatMonthParam(addMonths(monthDate, -1));
}

export function nextMonthParam(monthDate: Date): string {
  return formatMonthParam(addMonths(monthDate, 1));
}

/** Full weeks (Mon-Sun) covering the given month, including padding days. */
export function getCalendarGrid(monthDate: Date): Date[] {
  const start = startOfWeek(startOfMonth(monthDate), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(monthDate), { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end });
}
