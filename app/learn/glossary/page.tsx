import Link from "next/link";
import { getGlossaryTerms } from "@/lib/lessons";
import { GlossaryManager } from "@/components/learn/GlossaryManager";

export default async function GlossaryPage() {
  const terms = await getGlossaryTerms();

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900">
          Begrippenlijst
        </h1>
        <Link
          href="/learn"
          className="text-sm text-neutral-500 hover:text-neutral-900"
        >
          &larr; Lesprogramma
        </Link>
      </div>
      <GlossaryManager terms={terms} />
    </div>
  );
}
