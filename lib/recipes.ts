"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { recipes } from "./db/schema";
import { recipeFormSchema } from "./validation";
import { buildEmbedUrl, detectSourcePlatform } from "./video-embed";

export async function getRecipes() {
  return db.select().from(recipes).orderBy(desc(recipes.createdAt));
}

export async function getRecipe(id: string) {
  const [recipe] = await db.select().from(recipes).where(eq(recipes.id, id));
  return recipe;
}

/** Platform and embed link are derived from the video link, if there is one. */
function toRecipeValues(values: ReturnType<typeof recipeFormSchema.parse>) {
  const sourceUrl = values.sourceUrl || null;
  return {
    title: values.title,
    sourceUrl,
    sourcePlatform: sourceUrl ? detectSourcePlatform(sourceUrl) : "other",
    embedUrl: sourceUrl ? buildEmbedUrl(sourceUrl) : null,
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
