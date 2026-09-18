import { getTodos } from "@/lib/todos";
import { TodoList } from "@/components/todos/TodoList";

export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-6 py-6">
      <h1 className="text-xl font-semibold text-slate-900">To-do&apos;s</h1>
      <TodoList todos={todos} />
    </div>
  );
}
