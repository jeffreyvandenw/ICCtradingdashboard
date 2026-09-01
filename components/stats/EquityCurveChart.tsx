"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

interface EquityCurveChartProps {
  data: { date: string; cumulativeR: number }[];
}

export function EquityCurveChart({ data }: EquityCurveChartProps) {
  if (data.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-neutral-400">
        Nog geen live trades met een uitkomst.
      </p>
    );
  }

  const chartData = data.map((point, index) => ({
    index,
    label: format(new Date(point.date), "d MMM"),
    cumulativeR: point.cumulativeR,
  }));

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11 }}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fontSize: 11 }} width={40} />
          <Tooltip
            formatter={(value) => [`${Number(value).toFixed(2)}R`, "Cumulatief"]}
          />
          <Line
            type="monotone"
            dataKey="cumulativeR"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
