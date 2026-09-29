import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { getAllLiveTrades } from "@/lib/trades";
import { computeDashboardStats } from "@/lib/stats";
import { getOpenTodos } from "@/lib/todos";
import { getCurrentlyReading } from "@/lib/books";
import { getLatestRecipe } from "@/lib/recipes";
import { getOpenGroceryItems } from "@/lib/groceries";
import { getCheckInStreak, getTodayCheckIn } from "@/lib/checkins";
import { HubCard } from "@/components/dashboard/HubCard";
import { DailyCheckIn } from "@/components/checkin/DailyCheckIn";
import { cn } from "@/lib/utils";

function fmtR(value: number): string {
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}R`;
}

export default async function HubPage() {
  const [
    liveTrades,
    openTodos,
    readingBooks,
    latestRecipe,
    todayCheckIn,
    streak,
    openGroceries,
  ] = await Promise.all([
    getAllLiveTrades(),
    getOpenTodos(),
    getCurrentlyReading(3),
    getLatestRecipe(),
    getTodayCheckIn(),
    getCheckInStreak(),
    getOpenGroceryItems(),
  ]);

  const stats = computeDashboardStats(liveTrades);

  // Open groceries per shop, busiest shop first; "Overal" items have no shop.
  const groceryShops = [
    ...openGroceries
      .reduce((counts, item) => {
        const shop = item.shopName ?? "Overal";
        return counts.set(shop, (counts.get(shop) ?? 0) + 1);
      }, new Map<string, number>())
      .entries(),
  ].sort((a, b) => b[1] - a[1]);
  const groceryShopCount = groceryShops.filter(
    ([shop]) => shop !== "Overal",
  ).length;

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-6 py-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          {format(new Date(), "EEEE d MMMM", { locale: nl })}
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Alles in één overzicht.
        </p>
      </div>

      <HubCard href="/todos" title="To-do's" accent="amber">
        <p className="text-2xl font-semibold text-slate-900">
          {openTodos.length}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {openTodos.length === 0
            ? "Niks meer te doen"
            : "openstaande taken"}
        </p>
        {openTodos.length > 0 && (
          <ul className="mt-3 space-y-1">
            {openTodos.slice(0, 3).map((todo) => (
              <li
                key={todo.id}
                className="truncate text-xs text-slate-600"
              >
                • {todo.title}
              </li>
            ))}
          </ul>
        )}
      </HubCard>

      <DailyCheckIn todayCheckIn={todayCheckIn} streak={streak} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <HubCard href="/trading" title="Trading" accent="indigo">
          <p
            className={cn(
              "text-2xl font-semibold",
              stats.netR > 0 && "text-emerald-600",
              stats.netR < 0 && "text-rose-600",
              stats.netR === 0 && "text-slate-900",
            )}
          >
            {fmtR(stats.netR)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {stats.tradeCount} trades ·{" "}
            {stats.winratePct == null ? "—" : `${stats.winratePct.toFixed(0)}%`}{" "}
            winrate
          </p>
        </HubCard>

        <HubCard href="/boodschappen" title="Boodschappen" accent="sky">
          <p className="text-2xl font-semibold text-slate-900">
            {openGroceries.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {openGroceries.length === 0
              ? "Niks meer te halen"
              : groceryShopCount === 0
                ? "te halen"
                : `te halen bij ${groceryShopCount} ${
                    groceryShopCount === 1 ? "winkel" : "winkels"
                  }`}
          </p>
          {groceryShops.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {groceryShops.slice(0, 4).map(([shop, count]) => (
                <span
                  key={shop}
                  className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                >
                  {shop} · {count}
                </span>
              ))}
              {groceryShops.length > 4 && (
                <span className="px-1 py-0.5 text-xs text-slate-400">
                  +{groceryShops.length - 4}
                </span>
              )}
            </div>
          )}
        </HubCard>

        <HubCard href="/books" title="Boeken" accent="emerald">
          {readingBooks.length === 0 ? (
            <p className="text-sm text-slate-500">
              Geen boek in behandeling
            </p>
          ) : (
            <div className="space-y-2">
              {readingBooks.slice(0, 2).map((book) => (
                <div key={book.id}>
                  <p className="truncate text-sm font-medium text-slate-900">
                    {book.title}
                  </p>
                  {book.author && (
                    <p className="truncate text-xs text-slate-500">
                      {book.author}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </HubCard>

        <HubCard href="/recipes" title="Recepten" accent="rose">
          {latestRecipe ? (
            <div>
              <p className="truncate text-sm font-medium text-slate-900">
                {latestRecipe.title}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {latestRecipe.ingredients.length} ingrediënten
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              Nog geen recepten toegevoegd
            </p>
          )}
        </HubCard>
      </div>
    </div>
  );
}
