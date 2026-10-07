"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { deleteRecipe } from "@/lib/recipes";
import type { Recipe } from "@/lib/db/schema";

export function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  const [items, setItems] = useState(recipes);
  const [query, setQuery] = useState("");
  const [, startTransition] = useTransition();

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((r) => r.id !== id));
    startTransition(() => {
      deleteRecipe(id);
    });
  }

  // Every search word must appear in the title or in one of the tags.
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const visible = items.filter((recipe) => {
    const haystack = [recipe.title, ...recipe.tags].join(" ").toLowerCase();
    return words.every((word) => haystack.includes(word));
  });

  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-slate-200 bg-surface p-6 text-center text-sm text-slate-400 shadow-sm">
        Nog geen recepten toegevoegd.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
        >
          <circle
            cx="9"
            cy="9"
            r="5.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="m13.5 13.5 3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Zoek op titel of tag..."
          className="w-full rounded-full border border-slate-200 bg-surface py-2 pr-4 pl-9 text-sm focus:border-gold-400 focus:outline-none"
        />
      </div>

      {visible.length === 0 && (
        <p className="py-6 text-center text-sm text-slate-400">
          Geen recepten gevonden voor &ldquo;{query}&rdquo;.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((recipe) => (
          <div
            key={recipe.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-surface shadow-sm transition-colors hover:border-gold-400/50"
          >
            <Link
              href={`/recipes/${recipe.id}`}
              className="flex flex-1 flex-col"
            >
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
                      <button
                        type="button"
                        key={tag}
                        onClick={(e) => {
                          e.preventDefault();
                          setQuery(tag);
                        }}
                        className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 hover:bg-gold-100 hover:text-gold-700"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(recipe.id)}
              className="absolute right-2 top-2 hidden rounded-full bg-surface/90 px-2 py-1 text-xs font-medium text-slate-500 shadow hover:text-rose-600 group-hover:block"
            >
              Verwijder
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
