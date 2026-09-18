import { notFound } from "next/navigation";
import { getRecipe } from "@/lib/recipes";
import { VideoEmbed } from "@/components/recipes/VideoEmbed";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ recipeId: string }>;
}) {
  const { recipeId } = await params;
  const recipe = await getRecipe(recipeId);
  if (!recipe) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-6 py-6">
      <h1 className="text-xl font-semibold text-slate-900">{recipe.title}</h1>

      <VideoEmbed
        embedUrl={recipe.embedUrl}
        sourceUrl={recipe.sourceUrl}
        title={recipe.title}
      />

      {recipe.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-2 text-xs font-medium text-slate-500">
            Ingrediënten
          </p>
          <ul className="space-y-1 text-sm text-slate-700">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i}>• {ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-2 text-xs font-medium text-slate-500">Bereiding</p>
          <ol className="space-y-2 text-sm text-slate-700">
            {recipe.steps.map((step, i) => (
              <li key={i}>
                <span className="font-medium text-slate-900">{i + 1}.</span>{" "}
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {recipe.notes && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-1 text-xs font-medium text-slate-500">Notities</p>
          <p className="text-sm text-slate-700">{recipe.notes}</p>
        </div>
      )}
    </div>
  );
}
