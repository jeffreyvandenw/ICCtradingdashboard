import { RecipeImportForm } from "@/components/recipes/RecipeImportForm";

export default function NewRecipePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-6 py-6">
      <h1 className="text-xl font-semibold text-slate-900">
        Recept toevoegen
      </h1>
      <RecipeImportForm />
    </div>
  );
}
