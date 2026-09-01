"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createGlossaryTerm,
  deleteGlossaryTerm,
  updateGlossaryTerm,
} from "@/lib/lessons";
import type { GlossaryTerm } from "@/lib/db/schema";

const inputClass =
  "w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-800";

function GlossaryRow({ term }: { term: GlossaryTerm }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [termText, setTermText] = useState(term.term);
  const [definition, setDefinition] = useState(term.definition);
  const [saving, setSaving] = useState(false);

  if (editing) {
    return (
      <li className="space-y-2 rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
        <input
          className={inputClass}
          value={termText}
          onChange={(e) => setTermText(e.target.value)}
        />
        <textarea
          className={inputClass}
          rows={2}
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            type="button"
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              await updateGlossaryTerm(term.id, {
                term: termText,
                definition,
              });
              setSaving(false);
              setEditing(false);
              router.refresh();
            }}
            className="text-xs text-sky-600 hover:underline"
          >
            Opslaan
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="text-xs text-neutral-500 hover:underline"
          >
            Annuleren
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="rounded-lg border border-neutral-200 bg-white p-3 text-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            {term.term}
          </p>
          <p className="text-neutral-600 dark:text-neutral-400">
            {term.definition}
          </p>
        </div>
        <div className="flex shrink-0 gap-2 text-xs">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-neutral-500 hover:underline"
          >
            Bewerken
          </button>
          <button
            type="button"
            onClick={async () => {
              await deleteGlossaryTerm(term.id);
              router.refresh();
            }}
            className="text-red-600 hover:underline"
          >
            Verwijderen
          </button>
        </div>
      </div>
    </li>
  );
}

export function GlossaryManager({ terms }: { terms: GlossaryTerm[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [newTerm, setNewTerm] = useState("");
  const [newDefinition, setNewDefinition] = useState("");
  const [adding, setAdding] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return terms;
    return terms.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q),
    );
  }, [terms, query]);

  async function handleAdd() {
    if (!newTerm.trim() || !newDefinition.trim()) return;
    setAdding(true);
    await createGlossaryTerm({ term: newTerm, definition: newDefinition });
    setNewTerm("");
    setNewDefinition("");
    setAdding(false);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <input
        className={inputClass}
        placeholder="Zoek een begrip..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="space-y-2 rounded-lg border border-dashed border-neutral-300 p-3 dark:border-neutral-700">
        <input
          className={inputClass}
          placeholder="Nieuw begrip"
          value={newTerm}
          onChange={(e) => setNewTerm(e.target.value)}
        />
        <textarea
          className={inputClass}
          rows={2}
          placeholder="Definitie"
          value={newDefinition}
          onChange={(e) => setNewDefinition(e.target.value)}
        />
        <button
          type="button"
          disabled={adding}
          onClick={handleAdd}
          className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900"
        >
          + Begrip toevoegen
        </button>
      </div>

      <ul className="space-y-2">
        {filtered.map((term) => (
          <GlossaryRow key={term.id} term={term} />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-neutral-400">Geen begrippen gevonden.</p>
        )}
      </ul>
    </div>
  );
}
