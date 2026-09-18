"use server";

import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { todos } from "./db/schema";
import { todoFormSchema } from "./validation";

export async function getTodos() {
  return db.select().from(todos).orderBy(asc(todos.done), asc(todos.dueDate));
}

export async function getOpenTodos(limit?: number) {
  const rows = await db
    .select()
    .from(todos)
    .where(eq(todos.done, false))
    .orderBy(asc(todos.dueDate));
  return limit ? rows.slice(0, limit) : rows;
}

export async function createTodo(input: unknown) {
  const values = todoFormSchema.parse(input);
  const [created] = await db
    .insert(todos)
    .values({
      title: values.title,
      notes: values.notes || null,
      priority: values.priority,
      dueDate: values.dueDate ?? null,
    })
    .returning();

  revalidatePath("/todos");
  revalidatePath("/");
  return created;
}

export async function updateTodo(id: string, input: unknown) {
  const values = todoFormSchema.parse(input);
  const [updated] = await db
    .update(todos)
    .set({
      title: values.title,
      notes: values.notes || null,
      priority: values.priority,
      dueDate: values.dueDate ?? null,
    })
    .where(eq(todos.id, id))
    .returning();

  revalidatePath("/todos");
  revalidatePath("/");
  return updated;
}

export async function toggleTodo(id: string, done: boolean) {
  await db
    .update(todos)
    .set({ done, completedAt: done ? new Date() : null })
    .where(eq(todos.id, id));

  revalidatePath("/todos");
  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  await db.delete(todos).where(eq(todos.id, id));
  revalidatePath("/todos");
  revalidatePath("/");
}
