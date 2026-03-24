/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { useEffect } from "react";

// export default function TodoForm({ onAdd }) {
//   const [title, setTitle] = useState("");

//   const handleAdd = async () => {
//     if (!title.trim()) return;

//     const res = await api.post("/todos", { title });

//     setTitle("");
//     onAdd(res.data);
//   };

//   return (
//     <div className="flex gap-2 mb-6">
//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Add todo..."
//         className="flex-1 p-3 border rounded-lg"
//       />
//       <button
//         onClick={handleAdd}
//         className="bg-blue-500 text-white px-4 rounded-lg"
//       >
//         Add
//       </button>
//     </div>
//   );
// }


export default function TodoForm({ onAdd, initialData }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title); // 🔥 autofill
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { title };

    await onAdd(data); // 🔥 add ya update dono ke liye same

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-3"
        placeholder="Enter task"
      />

      <button className="bg-purple-600 text-white px-4 py-2 rounded w-full">
        {initialData ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}