import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "ICC Hub",
  description: "Persoonlijke hub voor trading, to-do's, boeken en recepten",
  appleWebApp: {
    title: "ICC Hub",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body className="flex h-full min-h-full bg-slate-50">
        <input type="checkbox" id="nav-toggle" className="peer hidden" />
        <label
          htmlFor="nav-toggle"
          aria-hidden="true"
          className="fixed inset-0 z-30 hidden bg-slate-900/40 peer-checked:block lg:hidden"
        />
        <div className="fixed inset-y-0 left-0 z-40 h-full -translate-x-full shadow-xl transition-transform duration-200 ease-out peer-checked:translate-x-0 lg:static lg:h-auto lg:translate-x-0 lg:shadow-none">
          <Sidebar />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
