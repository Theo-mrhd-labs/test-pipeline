"use client";

import { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Todo = () => {
  const getInitialTodos = () => {
    if (typeof window !== "undefined") {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        try {
          return JSON.parse(storedTodos);
        } catch (error) {
          console.error("Erreur lors du chargement des todos:", error);
        }
      }
    }
    return [];
  };

  const [todos, setTodos] = useState<Todo[]>(getInitialTodos);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-16 px-8 bg-white dark:bg-black sm:items-start">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-semibold mb-6 text-center text-black dark:text-zinc-50">
            Ma Liste de Tâches
          </h1>

          <div className="flex mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
              placeholder="Ajouter une nouvelle tâche..."
              className="grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Ajouter
            </button>
          </div>

          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md dark:bg-zinc-800"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="h-5 w-5 text-blue-500 mr-3"
                  />
                  <span
                    className={`${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-black dark:text-zinc-100"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>

          {todos.length === 0 && (
            <p className="text-center text-gray-500 mt-4 dark:text-zinc-400">
              Aucune tâche pour le moment. Ajoutez-en une !
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Todo;
