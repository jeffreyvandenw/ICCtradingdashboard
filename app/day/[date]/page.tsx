import Link from "next/link";
import { format } from "date-fns";
import { getTradesForDay } from "@/lib/trades";
import { parseDayParam } from "@/lib/date";
import { TradeForm } from "@/components/trade-form/TradeForm";
import { TradeList } from "@/components/trade-form/TradeList";

export default async function DayPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const day = parseDayParam(date);
  const trades = await getTradesForDay(day);

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          {format(day, "EEEE d MMMM yyyy")}
        </h1>
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          &larr; Terug naar dashboard
        </Link>
      </div>

      <TradeForm type="live" defaultDate={day} />

      <TradeList trades={trades} />
    </div>
  );
}
