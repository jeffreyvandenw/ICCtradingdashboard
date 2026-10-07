"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface CurvePoint {
  label: string;
  value: number;
}

/**
 * Themed line/area chart for cumulative results. Colors come from the
 * CSS palette variables, so it follows the light/dark theme.
 */
export function CurveChart({
  data,
  formatValue,
  formatTick = formatValue,
  seriesName,
  baseline,
  emptyLabel,
}: {
  data: CurvePoint[];
  formatValue: (value: number) => string;
  /** Shorter format for the y-axis labels; defaults to formatValue. */
  formatTick?: (value: number) => string;
  seriesName: string;
  baseline?: number;
  emptyLabel: string;
}) {
  if (data.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-slate-400">{emptyLabel}</p>
    );
  }

  const tick = { fontSize: 11, fill: "var(--color-slate-400)" };

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-gold-500)"
                stopOpacity={0.28}
              />
              <stop
                offset="100%"
                stopColor="var(--color-gold-500)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="var(--chart-grid)"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={tick}
            tickLine={false}
            axisLine={{ stroke: "var(--chart-grid)" }}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={tick}
            tickLine={false}
            axisLine={false}
            width={64}
            tickFormatter={(v) => formatTick(Number(v))}
            domain={["auto", "auto"]}
          />
          {baseline != null && (
            <ReferenceLine
              y={baseline}
              stroke="var(--color-slate-300)"
              strokeDasharray="4 4"
            />
          )}
          <Tooltip
            formatter={(value) => [formatValue(Number(value)), seriesName]}
            contentStyle={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-slate-200)",
              borderRadius: 12,
              fontSize: 12,
            }}
            labelStyle={{ color: "var(--color-slate-500)" }}
            itemStyle={{ color: "var(--color-slate-900)" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--color-gold-500)"
            strokeWidth={2}
            fill="url(#curveFill)"
            dot={false}
            activeDot={{ r: 4, fill: "var(--color-gold-500)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
