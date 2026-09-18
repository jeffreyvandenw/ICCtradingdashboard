import Link from "next/link";
import { getRecipes } from "@/lib/recipes";
import { RecipeGrid } from "@/components/recipes/RecipeGrid";

export default async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Recepten</h1>
        <Link
          href="/recipes/new"
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
        >
          + Recept toevoegen
        </Link>
      </div>

      <RecipeGrid recipes={recipes} />
    </div>
  );
}
