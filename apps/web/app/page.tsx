"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from "@aws-amplify/ui-react";
import type { Schema } from "@/schema";

const client = generateClient<Schema>({ authMode: "userPool" });

export default function Home() {
  const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => setTodos([...items]),
    });
    return () => sub.unsubscribe();
  }, []);

  async function createTodo() {
    if (!input.trim()) return;
    await client.models.Todo.create({ content: input });
    setInput("");
  }

  async function deleteTodo(id: string) {
    await client.models.Todo.delete({ id });
  }

  async function toggleTodo(todo: Schema["Todo"]["type"]) {
    await client.models.Todo.update({ id: todo.id, isDone: !todo.isDone });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main className="max-w-xl mx-auto py-16 px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Todo List</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-500">{user?.signInDetails?.loginId}</span>
              <button
                onClick={signOut}
                className="text-sm text-zinc-500 hover:text-zinc-900"
              >
                Sign out
              </button>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createTodo()}
              placeholder="Add a todo..."
              className="flex-1 border border-zinc-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
            <button
              onClick={createTodo}
              className="bg-zinc-900 text-white px-4 py-2 rounded text-sm hover:bg-zinc-700"
            >
              Add
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between border border-zinc-100 rounded px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.isDone ?? false}
                    onChange={() => toggleTodo(todo)}
                    className="cursor-pointer"
                  />
                  <span
                    className={`text-sm ${todo.isDone ? "line-through text-zinc-400" : ""}`}
                  >
                    {todo.content}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-zinc-400 hover:text-red-500 text-sm"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </main>
      )}
    </Authenticator>
  );
}
