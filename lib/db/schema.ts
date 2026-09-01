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
  quiz: jsonb("quiz"),
  completed: boolean("completed").notNull().default(false),
  quizScore: integer("quiz_score"),
  suggestedHypothesis: text("suggested_hypothesis"),
  order: integer("order").notNull().default(0),
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

export type Trade = typeof trades.$inferSelect;
export type NewTrade = typeof trades.$inferInsert;
export type BacktestSession = typeof backtestSessions.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
