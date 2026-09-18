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

export const lessonQuizSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().min(1),
      options: z.array(z.string().min(1)).min(2),
      correctIndex: z.number().int().min(0),
    }),
  ),
});

export const lessonFormSchema = z.object({
  title: z.string().min(1, "Titel is verplicht"),
  videoRef: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  quiz: lessonQuizSchema.nullable().optional(),
  suggestedHypothesis: z.string().nullable().optional(),
  order: z.coerce.number().int().default(0),
});

export type LessonFormValues = z.infer<typeof lessonFormSchema>;

export const glossaryTermFormSchema = z.object({
  term: z.string().min(1, "Term is verplicht"),
  definition: z.string().min(1, "Definitie is verplicht"),
});

export const todoFormSchema = z.object({
  title: z.string().min(1, "Titel is verplicht"),
  notes: z.string().nullable().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  dueDate: z.coerce.date().nullable().optional(),
});

export type TodoFormValues = z.infer<typeof todoFormSchema>;

export const bookFormSchema = z.object({
  isbn: z.string().nullable().optional(),
  title: z.string().min(1, "Titel is verplicht"),
  author: z.string().nullable().optional(),
  coverUrl: z.string().url().nullable().optional().or(z.literal("")),
  pageCount: z.coerce.number().int().positive().nullable().optional(),
  status: z.enum(["to_read", "reading", "read"]).default("to_read"),
  rating: z.coerce.number().int().min(1).max(5).nullable().optional(),
  notes: z.string().nullable().optional(),
  startedAt: z.coerce.date().nullable().optional(),
  finishedAt: z.coerce.date().nullable().optional(),
});

export type BookFormValues = z.infer<typeof bookFormSchema>;

export const recipeFormSchema = z.object({
  title: z.string().min(1, "Titel is verplicht"),
  sourceUrl: z.string().url().nullable().optional().or(z.literal("")),
  sourcePlatform: z.enum(["youtube", "tiktok", "other"]).default("other"),
  embedUrl: z.string().nullable().optional(),
  ingredients: z.array(z.string().min(1)).default([]),
  steps: z.array(z.string().min(1)).default([]),
  tags: z.array(z.string().min(1)).default([]),
  notes: z.string().nullable().optional(),
});

export type RecipeFormValues = z.infer<typeof recipeFormSchema>;

export const recipeTranscriptSchema = z.object({
  sourceUrl: z.string().url("Vul een geldige video-link in"),
  transcript: z.string().min(20, "Plak het transcript van de video"),
});

export type RecipeTranscriptValues = z.infer<typeof recipeTranscriptSchema>;
