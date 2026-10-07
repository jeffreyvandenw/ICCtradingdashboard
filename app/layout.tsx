import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { THEME_COOKIE, parseTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "ICC Hub",
  description: "Persoonlijke hub voor trading, to-do's, boeken en recepten",
  appleWebApp: {
    title: "ICC Hub",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const theme = parseTheme((await cookies()).get(THEME_COOKIE)?.value);

  return (
    <html
      lang="nl"
      className={cn(
        "h-full antialiased",
        manrope.variable,
        theme === "dark" && "dark",
      )}
    >
      <body className="flex h-full min-h-full">
        <input type="checkbox" id="nav-toggle" className="peer hidden" />
        <label
          htmlFor="nav-toggle"
          aria-hidden="true"
          className="fixed inset-0 z-30 hidden bg-black/60 peer-checked:block lg:hidden"
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
