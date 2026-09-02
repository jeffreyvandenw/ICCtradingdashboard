import Link from "next/link";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { auth } from "@/auth";
import { formatDayParam } from "@/lib/date";

export async function Topbar() {
  const session = await auth();
  if (!session) return null;

  const today = new Date();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <p className="text-sm text-slate-500">
        {format(today, "EEEE d MMMM yyyy", { locale: nl })}
      </p>
      <Link
        href={`/day/${formatDayParam(today)}`}
        className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
      >
        + Trade toevoegen
      </Link>
    </header>
  );
}
