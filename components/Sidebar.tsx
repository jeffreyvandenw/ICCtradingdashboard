import { auth, signOut } from "@/auth";
import { SidebarNav } from "@/components/SidebarNav";

export async function Sidebar() {
  const session = await auth();
  if (!session) return null;

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-14 items-center border-b border-slate-200 px-4">
        <span className="text-sm font-semibold tracking-tight text-slate-900">
          ICC Journal
        </span>
      </div>

      <SidebarNav />

      <div className="border-t border-slate-200 p-3">
        <p className="truncate px-1 pb-2 text-xs text-slate-400">
          {session.user?.email}
        </p>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          >
            Uitloggen
          </button>
        </form>
      </div>
    </aside>
  );
}
