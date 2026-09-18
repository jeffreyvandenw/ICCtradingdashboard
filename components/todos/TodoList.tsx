"use client";

import { useState, useTransition, type FormEvent } from "react";
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
        className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nieuwe taak..."
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
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
          className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Toevoegen
        </button>
      </form>

      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-500">
          Open ({open.length})
        </p>
        {open.length === 0 ? (
          <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-400 shadow-sm">
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

function TodoRow({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
        className="h-4 w-4 rounded border-slate-300 text-indigo-600"
      />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-sm font-medium text-slate-900",
            todo.done && "text-slate-400 line-through",
          )}
        >
          {todo.title}
        </p>
        {todo.dueDate && (
          <p className="text-xs text-slate-400">
            {new Date(todo.dueDate).toLocaleDateString("nl-NL")}
          </p>
        )}
      </div>
      <span
        className={cn(
          "rounded-full px-2 py-0.5 text-xs font-medium",
          PRIORITY_CLASSES[todo.priority],
        )}
      >
        {PRIORITY_LABEL[todo.priority]}
      </span>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="text-xs font-medium text-slate-400 hover:text-rose-600"
      >
        Verwijderen
      </button>
    </li>
  );
}
