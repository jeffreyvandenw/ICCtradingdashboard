CREATE TABLE "grocery_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"unit" text,
	"note" text,
	"shop_id" uuid,
	"done" boolean DEFAULT false NOT NULL,
	"checked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shops" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "shops_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "grocery_items" ADD CONSTRAINT "grocery_items_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "public"."shops"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
INSERT INTO "shops" ("name", "sort_order") VALUES
	('Albert Heijn', 1),
	('Jumbo', 2),
	('Action', 3),
	('Gamma', 4),
	('Praxis', 5),
	('Ikea', 6),
	('Babydump', 7),
	('Prenatal', 8),
	('Mediamarkt', 9),
	('Bol', 10),
	('Coolblue', 11)
ON CONFLICT ("name") DO NOTHING;
