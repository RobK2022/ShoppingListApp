import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core";

export const items = pgTable("items", {
  id: serial().primaryKey(),
  name: text().notNull(),
  quantity: integer().notNull().default(1),
  completed: boolean().notNull().default(false),
});
