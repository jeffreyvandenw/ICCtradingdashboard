"use client";

import { format } from "date-fns";
import { CurveChart } from "./CurveChart";

interface EquityCurveChartProps {
  data: { date: string; cumulativeR: number }[];
}

export function EquityCurveChart({ data }: EquityCurveChartProps) {
  return (
    <CurveChart
      data={data.map((point) => ({
        label: format(new Date(point.date), "d MMM"),
        value: point.cumulativeR,
      }))}
      formatValue={(value) => `${value.toFixed(2)}R`}
      seriesName="Cumulatief"
      baseline={0}
      emptyLabel="Nog geen trades met een uitkomst."
    />
  );
}
