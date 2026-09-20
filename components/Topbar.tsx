import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { auth } from "@/auth";
import { TopbarQuickAdd } from "@/components/TopbarQuickAdd";

export async function Topbar() {
  const session = await auth();
  if (!session) return null;

  const today = new Date();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <label
          htmlFor="nav-toggle"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5">
            <path
              d="M3 6h14M3 10h14M3 14h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </label>
        <p className="truncate text-sm text-slate-500">
          {format(today, "EEEE d MMMM yyyy", { locale: nl })}
        </p>
      </div>
      <TopbarQuickAdd />
    </header>
  );
}
