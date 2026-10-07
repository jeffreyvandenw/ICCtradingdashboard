import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { getOpenTodos } from "@/lib/todos";
import { getCurrentlyReading } from "@/lib/books";
import { getOpenGroceryItems } from "@/lib/groceries";
import { getLessons } from "@/lib/lessons";
import { getNextLessonInfo, groupLessonsByModule } from "@/lib/learn-modules";
import { getCheckInStreak, getTodayCheckIn } from "@/lib/checkins";
import { HubCard } from "@/components/dashboard/HubCard";
import { DailyCheckIn } from "@/components/checkin/DailyCheckIn";

function greeting(hour: number): string {
  if (hour < 6) return "Goedenacht";
  if (hour < 12) return "Goedemorgen";
  if (hour < 18) return "Goedemiddag";
  return "Goedenavond";
}

export default async function HubPage() {
  const [
    openTodos,
    readingBooks,
    todayCheckIn,
    streak,
    openGroceries,
    lessons,
  ] = await Promise.all([
    getOpenTodos(),
    getCurrentlyReading(3),
    getTodayCheckIn(),
    getCheckInStreak(),
    getOpenGroceryItems(),
    getLessons(),
  ]);

  const learn = getNextLessonInfo(groupLessonsByModule(lessons));

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

  const now = new Date();

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6">
      <div>
        <p className="text-sm text-slate-500">{greeting(now.getHours())}</p>
        <h1 className="mt-0.5 text-2xl font-light tracking-tight text-slate-900 first-letter:uppercase sm:text-3xl">
          {format(now, "EEEE d MMMM", { locale: nl })}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DailyCheckIn todayCheckIn={todayCheckIn} streak={streak} />

        <HubCard href="/todos" title="To-do's" accent="amber">
          <p className="text-3xl font-light text-slate-900">
            {openTodos.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {openTodos.length === 0 ? "Niks meer te doen" : "openstaande taken"}
          </p>
          {openTodos.length > 0 && (
            <ul className="mt-4 divide-y divide-slate-100 border-t border-slate-100">
              {openTodos.slice(0, 6).map((todo) => (
                <li
                  key={todo.id}
                  className="truncate py-2 text-sm text-slate-600"
                >
                  {todo.title}
                </li>
              ))}
            </ul>
          )}
          {openTodos.length > 6 && (
            <p className="mt-2 text-xs text-slate-400">
              +{openTodos.length - 6} meer
            </p>
          )}
        </HubCard>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <HubCard href="/boodschappen" title="Boodschappen" accent="sky">
          <p className="text-3xl font-light text-slate-900">
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
            <p className="text-sm text-slate-500">Geen boek in behandeling</p>
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

        <HubCard
          href={learn.nextLesson ? `/learn/${learn.nextLesson.id}` : "/learn"}
          title="Leren"
          accent="gold"
        >
          {learn.nextLesson && learn.module ? (
            <div>
              <p className="text-xs text-slate-500">Volgende les</p>
              <p className="mt-0.5 line-clamp-2 text-sm font-medium text-slate-900">
                {learn.nextLesson.title}
              </p>
              <p className="mt-1 truncate text-xs text-slate-400">
                {learn.module.label} ·{" "}
                {learn.module.lessons.indexOf(learn.nextLesson) + 1}/
                {learn.module.lessons.length}
              </p>
            </div>
          ) : learn.openModules && learn.openModules.length > 0 ? (
            <div>
              <p className="text-sm font-medium text-slate-900">
                Playlist afgerond 🎉
              </p>
              <p className="mt-2 text-xs text-slate-500">Nog open:</p>
              <ul className="mt-1 space-y-0.5">
                {learn.openModules.map(({ module, completed, total }) => (
                  <li
                    key={module.key}
                    className="flex justify-between gap-2 text-xs text-slate-500"
                  >
                    <span className="truncate">{module.label}</span>
                    <span className="shrink-0 text-slate-400">
                      {completed}/{total}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              {lessons.length === 0
                ? "Nog geen lessen toegevoegd"
                : "Alle lessen afgerond 🎉"}
            </p>
          )}
        </HubCard>
      </div>
    </div>
  );
}
