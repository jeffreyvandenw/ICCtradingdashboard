"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createRecipe } from "@/lib/recipes";

function toLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

const inputClass =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-400 focus:outline-none";
const labelClass = "mb-1 block text-xs font-medium text-slate-500";

export function RecipeForm() {
  const router = useRouter();
  const [sourceUrl, setSourceUrl] = useState("");
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [tags, setTags] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createRecipe({
        title,
        sourceUrl,
        ingredients: toLines(ingredients),
        steps: toLines(steps),
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        notes: "",
      });
      router.push("/recipes");
      router.refresh();
    } catch {
      setError("Opslaan is mislukt. Klopt de video-link?");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-surface p-5 shadow-sm"
    >
      {error && (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="recipe-url" className={labelClass}>
          Video-link (optioneel)
        </label>
        <input
          id="recipe-url"
          type="url"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=... of TikTok-link"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="recipe-title" className={labelClass}>
          Titel gerecht
        </label>
        <input
          id="recipe-title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="recipe-ingredients" className={labelClass}>
          Ingrediënten (één per regel)
        </label>
        <textarea
          id="recipe-ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows={6}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="recipe-steps" className={labelClass}>
          Stappen (één per regel)
        </label>
        <textarea
          id="recipe-steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          rows={6}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="recipe-tags" className={labelClass}>
          Tags (komma-gescheiden)
        </label>
        <input
          id="recipe-tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="pasta, snel, vega"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-gold-600 px-4 py-2 text-sm font-medium text-white hover:bg-gold-500 disabled:opacity-50"
      >
        {submitting ? "Opslaan..." : "Recept opslaan"}
      </button>
    </form>
  );
}
