"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import { createTodo, deleteTodo, toggleTodo } from "@/lib/todos";
import { cn } from "@/lib/utils";
import type { Todo } from "@/lib/db/schema";

const PRIORITY_LABEL: Record<Todo["priority"], string> = {
  low: "Laag",
  medium: "Middel",
  high: "Hoog",
};

const PRIORITY_CLASSES: Record<Todo["priority"], string> = {
  low: "bg-slate-100 text-slate-600",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-rose-100 text-rose-700",
};

export function TodoList({ todos }: { todos: Todo[] }) {
  const [items, setItems] = useState(todos);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Todo["priority"]>("medium");
  const [dueDate, setDueDate] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const created = await createTodo({
      title,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
    });
    setItems((prev) => [...prev, created]);
    setTitle("");
    setDueDate("");
    setPriority("medium");
  }

  function handleToggle(id: string, done: boolean) {
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done } : t)),
    );
    startTransition(() => {
      toggleTodo(id, done);
    });
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((t) => t.id !== id));
    startTransition(() => {
      deleteTodo(id);
    });
  }

  const open = items.filter((t) => !t.done);
  const done = items.filter((t) => t.done);

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-surface p-4 shadow-sm sm:flex-row sm:items-center"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nieuwe taak..."
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-400 focus:outline-none"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Todo["priority"])}
          className="rounded-lg border border-slate-200 px-2 py-2 text-sm"
        >
          <option value="low">Laag</option>
          <option value="medium">Middel</option>
          <option value="high">Hoog</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded-lg border border-slate-200 px-2 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-lg bg-gold-600 px-3 py-2 text-sm font-medium text-white hover:bg-gold-500"
        >
          Toevoegen
        </button>
      </form>

      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-500">
          Open ({open.length})
        </p>
        {open.length === 0 ? (
          <p className="rounded-xl border border-slate-200 bg-surface p-4 text-sm text-slate-400 shadow-sm">
            Niks meer te doen.
          </p>
        ) : (
          <ul className="space-y-1.5">
            {open.map((todo) => (
              <TodoRow
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </div>

      {done.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500">
            Afgerond ({done.length})
          </p>
          <ul className="space-y-1.5">
            {done.map((todo) => (
              <TodoRow
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </div>
      )}
      {isPending && null}
    </div>
  );
}

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

/** Renders text with any URLs in it turned into clickable links. */
function Linkified({ text }: { text: string }) {
  return (
    <>
      {text.split(URL_PATTERN).map((part, i) =>
        i % 2 === 1 ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-gold-600 underline underline-offset-2 hover:text-gold-500"
          >
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}

function TodoRow({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);

  // Only offer "uitklappen" when the title is actually cut off.
  useEffect(() => {
    const el = titleRef.current;
    if (!el || expanded) return;
    const measure = () => setOverflows(el.scrollWidth > el.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [expanded, todo.title]);

  const canExpand = overflows || expanded;

  return (
    <li className="flex items-start gap-3 rounded-lg border border-slate-200 bg-surface px-3 py-2 shadow-sm">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-gold-500"
      />
      <div
        className={cn("min-w-0 flex-1", canExpand && "cursor-pointer")}
        onClick={() => canExpand && setExpanded((v) => !v)}
      >
        <p
          ref={titleRef}
          className={cn(
            "text-sm font-medium text-slate-900",
            expanded ? "whitespace-pre-wrap break-words" : "truncate",
            todo.done && "text-slate-400 line-through",
          )}
        >
          {expanded ? <Linkified text={todo.title} /> : todo.title}
        </p>
        {todo.dueDate && (
          <p className="text-xs text-slate-400">
            {new Date(todo.dueDate).toLocaleDateString("nl-NL")}
          </p>
        )}
      </div>
      {canExpand && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="shrink-0 text-xs font-medium text-slate-400 hover:text-slate-900"
          aria-expanded={expanded}
        >
          <span className="hidden sm:inline">
            {expanded ? "Inklappen " : "Uitklappen "}
          </span>
          <span className="sr-only sm:hidden">
            {expanded ? "Inklappen" : "Uitklappen"}
          </span>
          {expanded ? "▴" : "▾"}
        </button>
      )}
      <span
        className={cn(
          "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
          PRIORITY_CLASSES[todo.priority],
        )}
      >
        {PRIORITY_LABEL[todo.priority]}
      </span>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="shrink-0 text-xs font-medium text-slate-400 hover:text-rose-600"
      >
        <span className="hidden sm:inline">Verwijderen</span>
        <span className="sm:hidden" aria-label="Verwijderen">
          ✕
        </span>
      </button>
    </li>
  );
}
