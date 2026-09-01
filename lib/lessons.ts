"use server";

import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { glossaryTerms, lessons } from "./db/schema";
import {
  glossaryTermFormSchema,
  lessonFormSchema,
  type LessonFormValues,
} from "./validation";

export async function getLessons() {
  return db.select().from(lessons).orderBy(asc(lessons.order));
}

export async function getLesson(id: string) {
  const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
  return lesson;
}

function toLessonValues(values: LessonFormValues) {
  return {
    title: values.title,
    videoRef: values.videoRef || null,
    content: values.content || null,
    quiz: values.quiz ?? null,
    suggestedHypothesis: values.suggestedHypothesis || null,
    order: values.order,
  };
}

export async function createLesson(input: unknown) {
  const values = lessonFormSchema.parse(input);
  const [created] = await db
    .insert(lessons)
    .values(toLessonValues(values))
    .returning();

  revalidatePath("/learn");
  return created;
}

export async function updateLesson(id: string, input: unknown) {
  const values = lessonFormSchema.parse(input);
  const [updated] = await db
    .update(lessons)
    .set(toLessonValues(values))
    .where(eq(lessons.id, id))
    .returning();

  revalidatePath("/learn");
  revalidatePath("/learn/[lessonId]", "page");
  return updated;
}

export async function deleteLesson(id: string) {
  await db.delete(lessons).where(eq(lessons.id, id));
  revalidatePath("/learn");
}

export async function markLessonProgress(
  id: string,
  input: { completed: boolean; quizScore: number | null },
) {
  await db
    .update(lessons)
    .set({ completed: input.completed, quizScore: input.quizScore })
    .where(eq(lessons.id, id));

  revalidatePath("/learn");
  revalidatePath("/learn/[lessonId]", "page");
}

export async function getGlossaryTerms() {
  return db.select().from(glossaryTerms).orderBy(asc(glossaryTerms.term));
}

export async function createGlossaryTerm(input: unknown) {
  const values = glossaryTermFormSchema.parse(input);
  const [created] = await db
    .insert(glossaryTerms)
    .values(values)
    .returning();

  revalidatePath("/learn/glossary");
  return created;
}

export async function updateGlossaryTerm(id: string, input: unknown) {
  const values = glossaryTermFormSchema.parse(input);
  await db.update(glossaryTerms).set(values).where(eq(glossaryTerms.id, id));
  revalidatePath("/learn/glossary");
}

export async function deleteGlossaryTerm(id: string) {
  await db.delete(glossaryTerms).where(eq(glossaryTerms.id, id));
  revalidatePath("/learn/glossary");
}
