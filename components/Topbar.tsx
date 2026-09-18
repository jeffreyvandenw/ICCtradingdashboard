import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { auth } from "@/auth";
import { TopbarQuickAdd } from "@/components/TopbarQuickAdd";

export async function Topbar() {
  const session = await auth();
  if (!session) return null;

  const today = new Date();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <p className="text-sm text-slate-500">
        {format(today, "EEEE d MMMM yyyy", { locale: nl })}
      </p>
      <TopbarQuickAdd />
    </header>
  );
}
