import type { Config, Context } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { items } from "../../db/schema.js";

export default async (req: Request, context: Context) => {
  const id = context.params.id ? Number(context.params.id) : undefined;

  if (req.method === "GET") {
    const allItems = await db.select().from(items).orderBy(items.id);
    return Response.json(allItems);
  }

  if (req.method === "POST") {
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const quantity = Number(body.quantity) || 1;

    if (!name) {
      return Response.json({ error: "Item name is required" }, { status: 400 });
    }

    const [created] = await db.insert(items).values({ name, quantity }).returning();
    return Response.json(created, { status: 201 });
  }

  if (req.method === "PATCH" && id !== undefined) {
    const [existing] = await db.select().from(items).where(eq(items.id, id));
    if (!existing) {
      return Response.json({ error: "Item not found" }, { status: 404 });
    }

    const [updated] = await db
      .update(items)
      .set({ completed: !existing.completed })
      .where(eq(items.id, id))
      .returning();
    return Response.json(updated);
  }

  if (req.method === "DELETE" && id !== undefined) {
    await db.delete(items).where(eq(items.id, id));
    return new Response(null, { status: 204 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: ["/api/items", "/api/items/:id"],
};
