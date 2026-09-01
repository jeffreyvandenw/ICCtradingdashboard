import { z } from "zod";

export const tradeFormSchema = z.object({
  type: z.enum(["live", "backtest"]),
  backtestSessionId: z.string().uuid().nullable().optional(),

  pair: z.string().min(1, "Pair is verplicht"),
  direction: z.enum(["long", "short"]),

  entry: z.coerce.number(),
  stopLoss: z.coerce.number().nullable().optional(),
  takeProfit: z.coerce.number().nullable().optional(),
  exitPrice: z.coerce.number().nullable().optional(),

  rr: z.coerce.number().nullable().optional(),
  outcome: z.enum(["win", "loss", "breakeven"]).nullable().optional(),

  tradedAt: z.coerce.date(),
  session: z.enum(["london", "ny", "asia"]).nullable().optional(),

  setupTag: z.string().nullable().optional(),
  mistakeTags: z.array(z.string()).default([]),

  screenshotUrl: z.string().url().nullable().optional().or(z.literal("")),
  notes: z.string().nullable().optional(),
  beforeNote: z.string().nullable().optional(),
  afterNote: z.string().nullable().optional(),
});

export type TradeFormValues = z.infer<typeof tradeFormSchema>;

export const quickTradeSchema = tradeFormSchema.pick({
  type: true,
  pair: true,
  direction: true,
  entry: true,
  exitPrice: true,
  tradedAt: true,
  outcome: true,
});
