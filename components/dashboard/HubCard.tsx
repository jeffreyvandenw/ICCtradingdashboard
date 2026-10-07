import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HubCard({
  href,
  title,
  accent,
  className,
  children,
}: {
  href: string;
  title: string;
  accent: "gold" | "emerald" | "amber" | "rose" | "sky";
  className?: string;
  children: ReactNode;
}) {
  const accentClasses: Record<typeof accent, string> = {
    gold: "bg-gold-400",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    sky: "bg-sky-500",
  };

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col rounded-2xl border border-slate-200 bg-surface p-5 shadow-sm transition-colors hover:border-gold-400/50",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <span
            className={cn("h-1.5 w-1.5 rounded-full", accentClasses[accent])}
          />
          {title}
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors group-hover:border-gold-400 group-hover:text-gold-500">
          <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
            <path
              d="M6 14 14 6M7.5 6H14v6.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      {children}
    </Link>
  );
}
