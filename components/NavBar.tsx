import Link from "next/link";
import { auth, signOut } from "@/auth";

export async function NavBar() {
  const session = await auth();
  if (!session) return null;

  return (
    <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/" className="text-neutral-900 dark:text-neutral-100">
            Dashboard
          </Link>
          <Link
            href="/learn"
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            Leren
          </Link>
          <Link
            href="/backtest"
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            Backtesten
          </Link>
        </nav>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button
            type="submit"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            Uitloggen
          </button>
        </form>
      </div>
    </header>
  );
}
