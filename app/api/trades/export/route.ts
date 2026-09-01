import { getAllLiveTrades } from "@/lib/trades";

const COLUMNS = [
  "id",
  "pair",
  "direction",
  "entry",
  "stopLoss",
  "takeProfit",
  "exitPrice",
  "rr",
  "outcome",
  "tradedAt",
  "session",
  "setupTag",
  "mistakeTags",
  "screenshotUrl",
  "notes",
  "beforeNote",
  "afterNote",
] as const;

function csvEscape(value: unknown): string {
  if (value == null) return "";
  const str = Array.isArray(value) ? value.join("; ") : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  const trades = await getAllLiveTrades();

  const rows = [
    COLUMNS.join(","),
    ...trades.map((trade) =>
      COLUMNS.map((col) => csvEscape(trade[col])).join(","),
    ),
  ];

  return new Response(rows.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="live-trades-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}
