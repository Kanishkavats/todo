"use client";

import api from "@/lib/axios";

export default function TodoList({ todos, onDelete }) {
  const handleDelete = async (id) => {
    await api.delete(`/todos/${id}`);
    onDelete(id);
  };

  if (!todos.length) {
    return <p className="text-center">No todos found 😢</p>;
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="flex justify-between items-center p-4 bg-white shadow rounded"
        >
          <span>{todo.title}</span>

          <button
            onClick={() => handleDelete(todo._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}