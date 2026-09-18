import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HubCard({
  href,
  title,
  accent,
  children,
}: {
  href: string;
  title: string;
  accent: "indigo" | "emerald" | "amber" | "rose";
  children: ReactNode;
}) {
  const accentClasses: Record<typeof accent, string> = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold",
            accentClasses[accent],
          )}
        >
          {title}
        </span>
        <span className="text-slate-300 transition-colors group-hover:text-indigo-500">
          →
        </span>
      </div>
      {children}
    </Link>
  );
}
