import {
  pgTable,
  uuid,
  text,
  timestamp,
  doublePrecision,
  pgEnum,
  jsonb,
  boolean,
  integer,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const tradeTypeEnum = pgEnum("trade_type", ["live", "backtest"]);
export const tradeDirectionEnum = pgEnum("trade_direction", ["long", "short"]);
export const tradeOutcomeEnum = pgEnum("trade_outcome", [
  "win",
  "loss",
  "breakeven",
]);
export const tradeSessionEnum = pgEnum("trade_session", [
  "london",
  "ny",
  "asia",
]);

export const backtestSessions = pgTable("backtest_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  hypothesis: text("hypothesis").notNull(),
  summary: text("summary"),
  lessonId: uuid("lesson_id").references((): AnyPgColumn => lessons.id, {
    onDelete: "set null",
  }),
});

export const trades = pgTable("trades", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: tradeTypeEnum("type").notNull().default("live"),
  backtestSessionId: uuid("backtest_session_id").references(
    (): AnyPgColumn => backtestSessions.id,
    { onDelete: "cascade" },
  ),

  pair: text("pair").notNull(),
  direction: tradeDirectionEnum("direction").notNull(),

  entry: doublePrecision("entry").notNull(),
  stopLoss: doublePrecision("stop_loss"),
  takeProfit: doublePrecision("take_profit"),
  exitPrice: doublePrecision("exit_price"),

  rr: doublePrecision("rr"),

  outcome: tradeOutcomeEnum("outcome"),

  tradedAt: timestamp("traded_at", { withTimezone: true }).notNull(),
  session: tradeSessionEnum("session"),

  setupTag: text("setup_tag"),
  mistakeTags: text("mistake_tags").array().notNull().default([]),

  screenshotUrl: text("screenshot_url"),
  notes: text("notes"),
  beforeNote: text("before_note"),
  afterNote: text("after_note"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const lessons = pgTable("lessons", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  videoRef: text("video_ref"),
  content: text("content"),
  quiz: jsonb("quiz").$type<LessonQuiz>(),
  completed: boolean("completed").notNull().default(false),
  quizScore: integer("quiz_score"),
  suggestedHypothesis: text("suggested_hypothesis"),
  order: integer("order").notNull().default(0),
});

export const glossaryTerms = pgTable("glossary_terms", {
  id: uuid("id").primaryKey().defaultRandom(),
  term: text("term").notNull(),
  definition: text("definition").notNull(),
});

export const todoPriorityEnum = pgEnum("todo_priority", [
  "low",
  "medium",
  "high",
]);

export const todos = pgTable("todos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  notes: text("notes"),
  done: boolean("done").notNull().default(false),
  priority: todoPriorityEnum("priority").notNull().default("medium"),
  dueDate: timestamp("due_date", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const bookStatusEnum = pgEnum("book_status", [
  "to_read",
  "reading",
  "read",
]);

export const books = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  isbn: text("isbn"),
  title: text("title").notNull(),
  author: text("author"),
  coverUrl: text("cover_url"),
  pageCount: integer("page_count"),
  status: bookStatusEnum("status").notNull().default("to_read"),
  rating: integer("rating"),
  notes: text("notes"),
  startedAt: timestamp("started_at", { withTimezone: true }),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const recipeSourceEnum = pgEnum("recipe_source", [
  "youtube",
  "tiktok",
  "other",
]);

export const recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  sourceUrl: text("source_url"),
  sourcePlatform: recipeSourceEnum("source_platform")
    .notNull()
    .default("other"),
  embedUrl: text("embed_url"),
  ingredients: text("ingredients").array().notNull().default([]),
  steps: text("steps").array().notNull().default([]),
  tags: text("tags").array().notNull().default([]),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const tradesRelations = relations(trades, ({ one }) => ({
  backtestSession: one(backtestSessions, {
    fields: [trades.backtestSessionId],
    references: [backtestSessions.id],
  }),
}));

export const backtestSessionsRelations = relations(
  backtestSessions,
  ({ one, many }) => ({
    lesson: one(lessons, {
      fields: [backtestSessions.lessonId],
      references: [lessons.id],
    }),
    trades: many(trades),
  }),
);

export interface LessonQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LessonQuiz {
  questions: LessonQuizQuestion[];
}

export type Trade = typeof trades.$inferSelect;
export type NewTrade = typeof trades.$inferInsert;
export type BacktestSession = typeof backtestSessions.$inferSelect;
export type NewBacktestSession = typeof backtestSessions.$inferInsert;
export type Lesson = typeof lessons.$inferSelect;
export type NewLesson = typeof lessons.$inferInsert;
export type GlossaryTerm = typeof glossaryTerms.$inferSelect;
export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
export type Book = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;
export type Recipe = typeof recipes.$inferSelect;
export type NewRecipe = typeof recipes.$inferInsert;
