"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { recipes } from "./db/schema";
import { recipeFormSchema, recipeTranscriptSchema } from "./validation";
import { extractRecipeFromTranscript } from "./recipe-ai";
import { buildEmbedUrl, detectSourcePlatform } from "./video-embed";

export async function getRecipes() {
  return db.select().from(recipes).orderBy(desc(recipes.createdAt));
}

export async function getLatestRecipe() {
  const [recipe] = await db
    .select()
    .from(recipes)
    .orderBy(desc(recipes.createdAt))
    .limit(1);
  return recipe;
}

export async function getRecipe(id: string) {
  const [recipe] = await db.select().from(recipes).where(eq(recipes.id, id));
  return recipe;
}

function toRecipeValues(values: ReturnType<typeof recipeFormSchema.parse>) {
  return {
    title: values.title,
    sourceUrl: values.sourceUrl || null,
    sourcePlatform: values.sourcePlatform,
    embedUrl: values.embedUrl || null,
    ingredients: values.ingredients,
    steps: values.steps,
    tags: values.tags,
    notes: values.notes || null,
  };
}

export async function createRecipe(input: unknown) {
  const values = recipeFormSchema.parse(input);
  const [created] = await db
    .insert(recipes)
    .values(toRecipeValues(values))
    .returning();

  revalidatePath("/recipes");
  revalidatePath("/");
  return created;
}

export async function updateRecipe(id: string, input: unknown) {
  const values = recipeFormSchema.parse(input);
  const [updated] = await db
    .update(recipes)
    .set(toRecipeValues(values))
    .where(eq(recipes.id, id))
    .returning();

  revalidatePath("/recipes");
  revalidatePath("/");
  return updated;
}

export async function deleteRecipe(id: string) {
  await db.delete(recipes).where(eq(recipes.id, id));
  revalidatePath("/recipes");
  revalidatePath("/");
}

export interface RecipeDraft {
  title: string;
  sourceUrl: string;
  sourcePlatform: "youtube" | "tiktok" | "other";
  embedUrl: string | null;
  ingredients: string[];
  steps: string[];
  tags: string[];
}

/**
 * Takes a video link + pasted transcript, asks Claude to extract the recipe,
 * and returns a draft ready for review before saving. Nothing is written to
 * the database here — the caller (recipe form) still submits via createRecipe.
 */
export async function draftRecipeFromTranscript(
  input: unknown,
): Promise<RecipeDraft> {
  const { sourceUrl, transcript } = recipeTranscriptSchema.parse(input);

  const extracted = await extractRecipeFromTranscript(transcript);

  return {
    title: extracted.title,
    sourceUrl,
    sourcePlatform: detectSourcePlatform(sourceUrl),
    embedUrl: buildEmbedUrl(sourceUrl),
    ingredients: extracted.ingredients,
    steps: extracted.steps,
    tags: extracted.tags,
  };
}
