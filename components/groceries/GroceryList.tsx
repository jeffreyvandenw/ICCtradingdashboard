"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import {
  clearCheckedGroceryItems,
  createGroceryItem,
  createShop,
  deleteGroceryItem,
  toggleGroceryItem,
} from "@/lib/groceries";
import { cn } from "@/lib/utils";
import type { GroceryItem, Shop } from "@/lib/db/schema";

// Keep in sync with CHECKED_VISIBLE_MS in lib/groceries.ts.
const CHECKED_VISIBLE_MS = 30 * 60 * 1000;

// Select values for the two non-shop choices in the shop dropdown.
const ANY_SHOP = "__any__";
const NEW_SHOP = "__new__";

interface Suggestion {
  name: string;
  shopId: string | null;
}

function isVisible(item: GroceryItem, now: number) {
  if (!item.done) return true;
  if (!item.checkedAt) return false;
  return now - new Date(item.checkedAt).getTime() < CHECKED_VISIBLE_MS;
}

function minutesLeft(item: GroceryItem, now: number) {
  if (!item.checkedAt) return 0;
  const left =
    CHECKED_VISIBLE_MS - (now - new Date(item.checkedAt).getTime());
  return Math.max(1, Math.ceil(left / 60000));
}

export function GroceryList({
  items: initialItems,
  shops: initialShops,
  suggestions,
}: {
  items: GroceryItem[];
  shops: Shop[];
  suggestions: Suggestion[];
}) {
  const [items, setItems] = useState(initialItems);
  const [shops, setShops] = useState(initialShops);
  const [now, setNow] = useState(() => Date.now());
  const [filter, setFilter] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("");
  const [note, setNote] = useState("");
  const [shopValue, setShopValue] = useState(initialShops[0]?.id ?? ANY_SHOP);
  const [shopTouched, setShopTouched] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [newShopName, setNewShopName] = useState("");
  const [, startTransition] = useTransition();
  const nameRef = useRef<HTMLInputElement>(null);

  // Re-render every 30s so checked items drop off once their 30 minutes pass.
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(timer);
  }, []);

  const visible = useMemo(
    () => items.filter((item) => isVisible(item, now)),
    [items, now],
  );

  const openCountByShop = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of visible) {
      if (item.done) continue;
      const key = item.shopId ?? ANY_SHOP;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return counts;
  }, [visible]);

  const openTotal = visible.filter((item) => !item.done).length;
  const checkedTotal = visible.length - openTotal;

  // One group per shop in the list order, "Overal" last. When filtering on a
  // shop, "Overal" items stay visible since they can be picked up there too.
  const groups = useMemo(() => {
    const all = [
      ...shops.map((shop) => ({ key: shop.id, label: shop.name })),
      { key: ANY_SHOP, label: "Overal" },
    ];
    return all
      .filter(
        (group) =>
          filter === null || group.key === filter || group.key === ANY_SHOP,
      )
      .map((group) => ({
        ...group,
        items: visible
          .filter((item) => (item.shopId ?? ANY_SHOP) === group.key)
          .sort((a, b) => Number(a.done) - Number(b.done)),
      }))
      .filter((group) => group.items.length > 0);
  }, [shops, visible, filter]);

  const filterChips = shops.filter(
    (shop) => openCountByShop.has(shop.id) || shop.id === filter,
  );

  function handleNameChange(value: string) {
    setName(value);
    if (shopTouched) return;
    const match = suggestions.find(
      (s) => s.name.toLowerCase() === value.trim().toLowerCase(),
    );
    if (match) setShopValue(match.shopId ?? ANY_SHOP);
  }

  function handleFilter(shopId: string | null) {
    setFilter(shopId);
    if (shopId && !name.trim()) {
      setShopValue(shopId);
      setShopTouched(true);
    }
  }

  async function handleAddShop() {
    if (!newShopName.trim()) return;
    const shop = await createShop({ name: newShopName });
    setShops((prev) =>
      prev.some((s) => s.id === shop.id) ? prev : [...prev, shop],
    );
    setShopValue(shop.id);
    setShopTouched(true);
    setNewShopName("");
  }

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || shopValue === NEW_SHOP) return;

    const created = await createGroceryItem({
      name,
      quantity,
      unit: unit || null,
      note: note || null,
      shopId: shopValue === ANY_SHOP ? null : shopValue,
    });
    setItems((prev) => [...prev, created]);
    // Keep the chosen shop: entering several items for one shop in a row is
    // the common case.
    setName("");
    setQuantity(1);
    setUnit("");
    setNote("");
    nameRef.current?.focus();
  }

  function handleToggle(id: string, done: boolean) {
    const checkedAt = done ? new Date() : null;
    setNow(Date.now());
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done, checkedAt } : item)),
    );
    startTransition(() => {
      toggleGroceryItem(id, done);
    });
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
    startTransition(() => {
      deleteGroceryItem(id);
    });
  }

  function handleClearChecked() {
    setItems((prev) => prev.filter((item) => !item.done));
    startTransition(() => {
      clearCheckedGroceryItems();
    });
  }

  const inputClass =
    "rounded-lg border border-slate-200 bg-surface px-3 py-2.5 text-base focus:border-gold-400 focus:outline-none sm:text-sm";

  return (
    <div className="space-y-5">
      <form
        onSubmit={handleAdd}
        className="space-y-2.5 rounded-xl border border-slate-200 bg-surface p-3 shadow-sm sm:p-4"
      >
        <input
          ref={nameRef}
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Wat moet je halen?"
          list="grocery-suggestions"
          autoComplete="off"
          enterKeyHint="done"
          className={cn(inputClass, "w-full")}
        />
        <datalist id="grocery-suggestions">
          {suggestions.map((s) => (
            <option key={s.name} value={s.name} />
          ))}
        </datalist>

        <div className="flex items-center gap-2">
          <div className="flex shrink-0 items-center rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-11 w-10 items-center justify-center text-lg text-slate-500 active:bg-slate-100"
              aria-label="Minder"
            >
              −
            </button>
            <span className="w-7 text-center text-sm font-semibold tabular-nums text-slate-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-11 w-10 items-center justify-center text-lg text-slate-500 active:bg-slate-100"
              aria-label="Meer"
            >
              +
            </button>
          </div>
          <select
            value={shopValue}
            onChange={(e) => {
              setShopValue(e.target.value);
              setShopTouched(true);
            }}
            className={cn(inputClass, "h-11 min-w-0 flex-1 py-0")}
            aria-label="Winkel"
          >
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
            <option value={ANY_SHOP}>Overal (maakt niet uit)</option>
            <option value={NEW_SHOP}>+ Nieuwe winkel…</option>
          </select>
        </div>

        {shopValue === NEW_SHOP && (
          <div className="flex gap-2">
            <input
              value={newShopName}
              onChange={(e) => setNewShopName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddShop();
                }
              }}
              placeholder="Naam van de winkel"
              autoFocus
              className={cn(inputClass, "min-w-0 flex-1")}
            />
            <button
              type="button"
              onClick={handleAddShop}
              className="rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Winkel toevoegen
            </button>
          </div>
        )}

        {showMore && (
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Eenheid (kg, pak, m…)"
              className={cn(inputClass, "sm:w-44")}
            />
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Notitie of link (merk, maat…)"
              className={cn(inputClass, "min-w-0 flex-1")}
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className="px-1 text-xs font-medium text-slate-500 hover:text-slate-900"
          >
            {showMore ? "Minder opties" : "Eenheid of notitie…"}
          </button>
          <button
            type="submit"
            disabled={!name.trim() || shopValue === NEW_SHOP}
            className="ml-auto h-11 rounded-lg bg-gold-600 px-5 text-sm font-medium text-white hover:bg-gold-500 disabled:opacity-40"
          >
            Toevoegen
          </button>
        </div>
      </form>

      {openTotal + checkedTotal > 0 && (
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          <FilterChip
            active={filter === null}
            onClick={() => handleFilter(null)}
            label="Alle"
            count={openTotal}
          />
          {filterChips.map((shop) => (
            <FilterChip
              key={shop.id}
              active={filter === shop.id}
              onClick={() => handleFilter(shop.id)}
              label={shop.name}
              count={openCountByShop.get(shop.id) ?? 0}
            />
          ))}
        </div>
      )}

      {groups.length === 0 ? (
        <p className="rounded-xl border border-slate-200 bg-surface p-4 text-sm text-slate-400 shadow-sm">
          {openTotal === 0
            ? "Niks meer te halen."
            : "Niks meer te halen bij deze winkel."}
        </p>
      ) : (
        <div className="space-y-5">
          {groups.map((group) => {
            const open = group.items.filter((item) => !item.done).length;
            return (
              <section key={group.key} className="space-y-2">
                <div className="flex items-baseline justify-between px-1">
                  <h2 className="text-sm font-semibold text-slate-900">
                    {group.label}
                  </h2>
                  <span className="text-xs text-slate-400">
                    {open === 0 ? "alles binnen" : `${open} te halen`}
                  </span>
                </div>
                <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-surface shadow-sm">
                  {group.items.map((item) => (
                    <GroceryRow
                      key={item.id}
                      item={item}
                      now={now}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                    />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}

      {checkedTotal > 0 && (
        <p className="text-center text-xs text-slate-400">
          Afgevinkte items verdwijnen na 30 minuten.{" "}
          <button
            type="button"
            onClick={handleClearChecked}
            className="font-medium text-slate-500 underline-offset-2 hover:text-slate-900 hover:underline"
          >
            Nu wissen
          </button>
        </p>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-gold-600 bg-gold-600 text-white"
          : "border-slate-200 bg-surface text-slate-600 hover:bg-slate-50",
      )}
    >
      {label}
      <span
        className={cn(
          "rounded-full px-1.5 text-xs tabular-nums",
          active ? "bg-white/20" : "bg-slate-100 text-slate-500",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function GroceryRow({
  item,
  now,
  onToggle,
  onDelete,
}: {
  item: GroceryItem;
  now: number;
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const amount =
    item.unit || item.quantity > 1
      ? `${item.quantity}${item.unit ? ` ${item.unit}` : "×"}`
      : null;
  const noteIsLink = item.note ? /^https?:\/\//i.test(item.note) : false;

  return (
    <li className="flex items-center gap-1 pr-1">
      <button
        type="button"
        onClick={() => onToggle(item.id, !item.done)}
        className="flex min-w-0 flex-1 items-center gap-3 py-3 pl-3 text-left active:bg-slate-50"
        aria-pressed={item.done}
      >
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            item.done
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-slate-300",
          )}
        >
          {item.done && (
            <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
              <path
                d="m5 10.5 3.5 3.5L15 7"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={cn(
              "block truncate text-base font-medium text-slate-900 sm:text-sm",
              item.done && "text-slate-400 line-through",
            )}
          >
            {item.name}
          </span>
          {item.done ? (
            <span className="block text-xs text-slate-400">
              verdwijnt over {minutesLeft(item, now)} min
            </span>
          ) : (
            item.note &&
            !noteIsLink && (
              <span className="block truncate text-xs text-slate-500">
                {item.note}
              </span>
            )
          )}
        </span>
        {amount && (
          <span
            className={cn(
              "shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold tabular-nums text-slate-700",
              item.done && "opacity-50",
            )}
          >
            {amount}
          </span>
        )}
      </button>
      {!item.done && item.note && noteIsLink && (
        <a
          href={item.note}
          target="_blank"
          rel="noreferrer"
          className="flex h-10 shrink-0 items-center px-2 text-xs font-medium text-gold-600 hover:underline"
        >
          Link
        </a>
      )}
      <button
        type="button"
        onClick={() => onDelete(item.id)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-300 hover:bg-rose-50 hover:text-rose-600"
        aria-label={`${item.name} verwijderen`}
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
          <path
            d="m6 6 8 8M14 6l-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </li>
  );
}
