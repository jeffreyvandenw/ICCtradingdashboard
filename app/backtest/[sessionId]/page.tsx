import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import {
  getBacktestSession,
  getLatestBacktestSessionId,
  getTradesForSession,
} from "@/lib/backtest";
import { computeDashboardStats } from "@/lib/stats";
import { StatsPanel } from "@/components/stats/StatsPanel";
import { BacktestRowGrid } from "@/components/backtest/BacktestRowGrid";
import { SessionSummaryForm } from "@/components/backtest/SessionSummaryForm";
import { TradeList } from "@/components/trade-form/TradeList";
import { BacktestPnlCard } from "@/components/backtest/BacktestPnlCard";
import { DeleteSessionButton } from "@/components/backtest/DeleteSessionButton";

export default async function BacktestSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const session = await getBacktestSession(sessionId);
  if (!session) notFound();

  const [sessionTrades, latestSessionId] = await Promise.all([
    getTradesForSession(sessionId),
    getLatestBacktestSessionId(),
  ]);
  const isActive = sessionId === latestSessionId;
  const stats = computeDashboardStats(sessionTrades);

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-neutral-900">
            {format(session.createdAt, "d MMMM yyyy", { locale: nl })}
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            {session.hypothesis}
          </p>
          {!isActive && (
            <p className="mt-1 text-xs text-neutral-400">
              Alleen-lezen — dit is niet de actieve sessie.
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <DeleteSessionButton
            sessionId={session.id}
            label={session.hypothesis}
            redirectTo="/backtest"
          />
          <Link
            href="/backtest"
            className="text-sm text-neutral-500 hover:text-neutral-900"
          >
            &larr; Alle sessies
          </Link>
        </div>
      </div>

      <StatsPanel
        stats={stats}
        variant="backtest"
        chart={
          <BacktestPnlCard
            sessionId={session.id}
            startingBalance={session.startingBalance}
            trades={sessionTrades.map(({ outcome, rr }) => ({ outcome, rr }))}
          />
        }
      />

      {isActive ? (
        <>
          <BacktestRowGrid sessionId={sessionId} />
          <SessionSummaryForm
            sessionId={sessionId}
            initialSummary={session.summary}
          />
        </>
      ) : (
        session.summary && (
          <div className="rounded-2xl border border-neutral-200 bg-surface p-4 text-sm shadow-sm">
            <p className="text-xs font-medium text-neutral-500">
              Samenvatting
            </p>
            <p className="mt-1 text-neutral-700">
              {session.summary}
            </p>
          </div>
        )
      )}

      <TradeList
        trades={sessionTrades}
        showTime={false}
        readOnly={!isActive}
        emptyLabel="Nog geen trades in deze sessie."
      />
    </div>
  );
}
