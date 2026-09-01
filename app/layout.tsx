import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Trading Journal",
  description: "Persoonlijk trading journal voor de ICC-strategie",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-neutral-50 dark:bg-neutral-950">
        <NavBar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
