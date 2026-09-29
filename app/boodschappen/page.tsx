import {
  getGroceryItems,
  getGrocerySuggestions,
  getShops,
} from "@/lib/groceries";
import { GroceryList } from "@/components/groceries/GroceryList";

export default async function BoodschappenPage() {
  const [items, shops, suggestions] = await Promise.all([
    getGroceryItems(),
    getShops(),
    getGrocerySuggestions(),
  ]);

  return (
    <div className="mx-auto max-w-2xl space-y-5 px-4 py-5 sm:px-6 sm:py-6">
      <h1 className="text-xl font-semibold text-slate-900">Boodschappen</h1>
      <GroceryList items={items} shops={shops} suggestions={suggestions} />
    </div>
  );
}
