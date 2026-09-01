CREATE TYPE "public"."trade_direction" AS ENUM('long', 'short');--> statement-breakpoint
CREATE TYPE "public"."trade_outcome" AS ENUM('win', 'loss', 'breakeven');--> statement-breakpoint
CREATE TYPE "public"."trade_session" AS ENUM('london', 'ny', 'asia');--> statement-breakpoint
CREATE TYPE "public"."trade_type" AS ENUM('live', 'backtest');--> statement-breakpoint
CREATE TABLE "backtest_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"hypothesis" text NOT NULL,
	"summary" text,
	"lesson_id" uuid
);
--> statement-breakpoint
CREATE TABLE "lessons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"video_ref" text,
	"content" text,
	"quiz" jsonb,
	"completed" boolean DEFAULT false NOT NULL,
	"quiz_score" integer,
	"suggested_hypothesis" text,
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trades" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "trade_type" DEFAULT 'live' NOT NULL,
	"backtest_session_id" uuid,
	"pair" text NOT NULL,
	"direction" "trade_direction" NOT NULL,
	"entry" double precision NOT NULL,
	"stop_loss" double precision,
	"take_profit" double precision,
	"exit_price" double precision,
	"rr" double precision,
	"outcome" "trade_outcome",
	"traded_at" timestamp with time zone NOT NULL,
	"session" "trade_session",
	"setup_tag" text,
	"mistake_tags" text[] DEFAULT '{}' NOT NULL,
	"screenshot_url" text,
	"notes" text,
	"before_note" text,
	"after_note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "backtest_sessions" ADD CONSTRAINT "backtest_sessions_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trades" ADD CONSTRAINT "trades_backtest_session_id_backtest_sessions_id_fk" FOREIGN KEY ("backtest_session_id") REFERENCES "public"."backtest_sessions"("id") ON DELETE cascade ON UPDATE no action;