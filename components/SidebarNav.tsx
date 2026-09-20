"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5">
        <path
          d="M3 10.5 10 4l7 6.5M5 9v6.5a.5.5 0 0 0 .5.5H8v-4h4v4h2.5a.5.5 0 0 0 .5-.5V9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/checkin",
    label: "Check-in",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5">
        <path
          d="M4 10.5 8 14l8-8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/trading",
    label: "Trading",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5">
        <path
          d="M3 15.5 8 10l3 3 6-7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/backtest",
    label: "Backtesten",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5">
        <path
          d="M3.5 16V8m5.5 8V4m5.5 12v-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/learn",
    label: "Leren",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5">
        <path
          d="M3.5 5.5c1.8-1 4-1 5.5.3v9c-1.5-1.3-3.7-1.3-5.5-.3v-9ZM16.5 5.5c-1.8-1-4-1-5.5.3v9c1.5-1.3 3.7-1.3 5.5-.3v-9Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/todos",
    label: "To-do's",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5">
        <path
          d="m4 10 3 3 9-9M4 16.5h9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/books",
    label: "Boeken",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5">
        <path
          d="M4 4.5h5a2 2 0 0 1 2 2v9a1.5 1.5 0 0 0-1.5-1.5H4v-9.5ZM16 4.5h-5a2 2 0 0 0-2 2v9a1.5 1.5 0 0 1 1.5-1.5H16v-9.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/recipes",
    label: "Recepten",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5">
        <path
          d="M5 8.5h10a1 1 0 0 1 1 1c0 3.5-2.5 6-6 6s-6-2.5-6-6a1 1 0 0 1 1-1ZM7 8.5V5m3 3.5V4m3 4.5V5.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      {NAV_ITEMS.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
            )}
          >
            <span className={cn(active ? "text-indigo-600" : "text-slate-400")}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
