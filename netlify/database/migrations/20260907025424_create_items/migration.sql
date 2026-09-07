CREATE TABLE "items" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"completed" boolean DEFAULT false NOT NULL
);
