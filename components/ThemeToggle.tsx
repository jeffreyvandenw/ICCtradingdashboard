"use client";

import { THEME_COOKIE, type Theme } from "@/lib/theme";

function setTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=31536000; samesite=lax`;
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={() =>
        setTheme(
          document.documentElement.classList.contains("dark")
            ? "light"
            : "dark",
        )
      }
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-gold-400 hover:text-gold-600"
    >
      <span className="sr-only">Wissel licht/donker</span>
      {/* Moon in light mode, sun in dark mode — switched purely by CSS. */}
      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 dark:hidden">
        <path
          d="M16 11.5A6.5 6.5 0 0 1 8.5 4a6.5 6.5 0 1 0 7.5 7.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className="hidden h-4 w-4 dark:block"
      >
        <circle
          cx="10"
          cy="10"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10 2.5v1.5M10 16v1.5M2.5 10H4M16 10h1.5M4.7 4.7l1 1M14.3 14.3l1 1M4.7 15.3l1-1M14.3 5.7l1-1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
