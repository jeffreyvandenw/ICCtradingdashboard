"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { deleteRecipe } from "@/lib/recipes";
import type { Recipe } from "@/lib/db/schema";

export function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  const [items, setItems] = useState(recipes);
  const [, startTransition] = useTransition();

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((r) => r.id !== id));
    startTransition(() => {
      deleteRecipe(id);
    });
  }

  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-400 shadow-sm">
        Nog geen recepten toegevoegd.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((recipe) => (
        <div
          key={recipe.id}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <Link href={`/recipes/${recipe.id}`} className="flex flex-1 flex-col">
            <div className="p-4">
              <p className="truncate text-sm font-medium text-slate-900">
                {recipe.title}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {recipe.ingredients.length} ingrediënten ·{" "}
                {recipe.steps.length} stappen
              </p>
              {recipe.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
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
            </div>
          </Link>
          <button
            type="button"
            onClick={() => handleDelete(recipe.id)}
            className="absolute right-2 top-2 hidden rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-slate-500 shadow hover:text-rose-600 group-hover:block"
          >
            Verwijder
          </button>
        </div>
      ))}
    </div>
  );
}
