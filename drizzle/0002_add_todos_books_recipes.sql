CREATE TYPE "public"."book_status" AS ENUM('to_read', 'reading', 'read');--> statement-breakpoint
CREATE TYPE "public"."recipe_source" AS ENUM('youtube', 'tiktok', 'other');--> statement-breakpoint
CREATE TYPE "public"."todo_priority" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"isbn" text,
	"title" text NOT NULL,
	"author" text,
	"cover_url" text,
	"page_count" integer,
	"status" "book_status" DEFAULT 'to_read' NOT NULL,
	"rating" integer,
	"notes" text,
	"started_at" timestamp with time zone,
	"finished_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recipes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"source_url" text,
	"source_platform" "recipe_source" DEFAULT 'other' NOT NULL,
	"embed_url" text,
	"ingredients" text[] DEFAULT '{}' NOT NULL,
	"steps" text[] DEFAULT '{}' NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "todos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"notes" text,
	"done" boolean DEFAULT false NOT NULL,
	"priority" "todo_priority" DEFAULT 'medium' NOT NULL,
	"due_date" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
