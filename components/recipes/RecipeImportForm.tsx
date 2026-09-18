"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createRecipe, draftRecipeFromTranscript } from "@/lib/recipes";

function toLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function RecipeImportForm() {
  const router = useRouter();
  const [sourceUrl, setSourceUrl] = useState("");
  const [transcript, setTranscript] = useState("");
  const [generating, setGenerating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [tags, setTags] = useState("");
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [sourcePlatform, setSourcePlatform] = useState<
    "youtube" | "tiktok" | "other"
  >("other");

  async function handleGenerate() {
    setGenerating(true);
    setError(null);
    try {
      const draft = await draftRecipeFromTranscript({ sourceUrl, transcript });
      setTitle(draft.title);
      setIngredients(draft.ingredients.join("\n"));
      setSteps(draft.steps.join("\n"));
      setTags(draft.tags.join(", "));
      setEmbedUrl(draft.embedUrl);
      setSourcePlatform(draft.sourcePlatform);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Kon geen recept genereren uit dit transcript.",
      );
    } finally {
      setGenerating(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Genereer eerst een recept of vul zelf een titel in.");
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      await createRecipe({
        title,
        sourceUrl,
        sourcePlatform,
        embedUrl,
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
      setError("Opslaan is mislukt.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-medium text-slate-900">
          1. Plak de video-link en het transcript
        </p>
        <input
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=... of TikTok-link"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Plak hier het transcript van de video..."
          rows={6}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating || !transcript.trim()}
          className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          {generating ? "Bezig met genereren..." : "Genereer recept met Claude"}
        </button>
      </div>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-medium text-slate-900">
          2. Controleer en pas aan
        </p>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Titel
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Ingrediënten (één per regel)
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={5}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Bereidingsstappen (één per regel)
          </label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            rows={6}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Tags (komma-gescheiden)
          </label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
      >
        {submitting ? "Opslaan..." : "Recept opslaan"}
      </button>
    </form>
  );
}
