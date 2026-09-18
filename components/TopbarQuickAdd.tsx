"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatDayParam } from "@/lib/date";

export function TopbarQuickAdd() {
  const pathname = usePathname();
  const relevant = pathname === "/trading" || pathname.startsWith("/day");
  if (!relevant) return null;

  return (
    <Link
      href={`/day/${formatDayParam(new Date())}`}
      className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
    >
      + Trade toevoegen
    </Link>
  );
}
