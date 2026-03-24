/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
// // /dashboard/page.jsx
// // "use client";
// // import { useEffect, useState } from "react";
// // import api from "@/lib/axios";

// // export default function Dashboard() {
// //   const [todos, setTodos] = useState([]);

// //   useEffect(() => {
// //     api.get("/todos").then((res) => setTodos(res.data.todos));
// //   }, []);

// //   return (
// //     <div>
// //       {todos.map((t) => (
// //         <p key={t._id}>{t.title}</p>
// //       ))}
// //     </div>
// //   );
// // }

// "use client";
// import { useEffect, useState } from "react";
// import api from "@/lib/axios";

// export default function Dashboard() {
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     api.get("/todos").then((res) => setTodos(res.data.todos));
//   }, []);

//   return (
//     <div>
//       {todos.map((t) => (
//         <p key={t._id}>{t.title}</p>
//       ))}
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/axios";
// import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

// export default function Dashboard() {
//   const [todos, setTodos] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchTodos = async (p = page, s = search) => {
//     const res = await api.get(`/todos?page=${p}&search=${s}`);
//     setTodos(res.data.todos);
//     setTotalPages(res.data.totalPages);
//     setPage(res.data.page);
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   // DELETE
//   const confirmDelete = async () => {
//     await api.delete(`/todos/${deleteId}`);
//     setShowModal(false);
//     fetchTodos();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-10">
//       <div className="w-full max-w-2xl">

//         {/* TITLE */}
//         <h1 className="text-center text-xl font-semibold mb-4">
//           Todo List App
//         </h1>

//         {/* ADD BUTTON */}
//         <button className="w-full bg-purple-600 text-white py-3 rounded-md mb-4 hover:bg-purple-700 transition">
//           ADD NEW TASK +
//         </button>

//         {/* SEARCH BAR */}
//         <div className="flex items-center bg-white p-2 rounded-md shadow mb-4">
//           <FaSearch className="text-gray-500 ml-2" />
//           <input
//             type="text"
//             placeholder="Search task..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full px-2 outline-none"
//           />
//           <button
//             onClick={() => fetchTodos(1, search)}
//             className="bg-purple-600 text-white px-3 py-1 rounded"
//           >
//             Go
//           </button>
//         </div>

//         {/* TABLE */}
//         <div className="bg-white rounded-md shadow">
//           <div className="grid grid-cols-2 p-3 border-b font-semibold text-gray-600">
//             <span>TASK</span>
//             <span className="text-right">ACTION</span>
//           </div>

//           {todos?.map((todo) => (
//             <div
//               key={todo._id}
//               className="grid grid-cols-2 p-3 border-b items-center"
//             >
//               <span>{todo.title}</span>

//               <div className="flex justify-end gap-3">
//                 <FaEdit className="text-blue-500 cursor-pointer" />

//                 <FaTrash
//                   className="text-red-500 cursor-pointer"
//                   onClick={() => {
//                     setDeleteId(todo._id);
//                     setShowModal(true);
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* PAGINATION */}
//         <div className="flex justify-center items-center gap-4 mt-5">
//           <button
//             disabled={page === 1}
//             onClick={() => fetchTodos(page - 1)}
//             className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
//           >
//             Prev
//           </button>

//           <span className="font-medium">
//             {page} / {totalPages}
//           </span>

//           <button
//             disabled={page === totalPages}
//             onClick={() => fetchTodos(page + 1)}
//             className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* DELETE MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/30">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">

//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-2 right-2 text-gray-500"
//             >
//               ✖
//             </button>

//             <p className="mb-4 text-gray-700">
//               Are you sure you want to delete this task?
//             </p>

//             <div className="flex justify-end">
//               <button
//                 onClick={confirmDelete}
//                 className="bg-gray-800 text-white px-4 py-1 rounded"
//               >
//                 YES
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/axios";
// import TodoForm from "@/components/TodoForm";
// import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

// export default function Dashboard() {
//   const [todos, setTodos] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   const [showAdd, setShowAdd] = useState(false);

//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // 🔥 FETCH TODOS (OLD LOGIC)
//   const fetchTodos = async (pageNum = page, searchText = search) => {
//     try {
//       const res = await api.get(
//         `/todos?page=${pageNum}&search=${searchText}`
//       );

//       setTodos(res.data.todos || []);
//       setTotalPages(res.data.totalPages || 1);
//       setPage(res.data.page || 1);
//     } catch (err) {
//       console.error(err);
//       setTodos([]);
//     }
//   };

//   useEffect(() => {
//     fetchTodos(1, search);
//   }, [search]);

//   // 🔍 SEARCH
//   const handleSearch = async() => {
//     // setPage(1);
//     await fetchTodos(1, search);
//   };

//   // ➕ ADD
//   const handleAdd = (newTodo) => {
//     setTodos((prev) => [newTodo, ...prev]);
//     setShowAdd(false);
//   };

//   // ❌ DELETE (UI + LOGIC)
//   const handleDelete = (id) => {
//     setTodos((prev) => prev.filter((t) => t._id !== id));
//   };

//   const confirmDelete = async () => {
//     try {
//       await api.delete(`/todos/${deleteId}`);
//       setShowDeleteModal(false);
//       handleDelete(deleteId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-10">
//       <div className="w-full max-w-2xl">

//         {/* TITLE */}
//         <h1 className="text-center text-xl font-semibold mb-4">
//           Todo List App
//         </h1>

//         {/* ➕ ADD BUTTON */}
//         <button
//           onClick={() => setShowAdd(true)}
//           className="w-full bg-purple-600 text-white py-3 rounded-md mb-4 hover:bg-purple-700 transition"
//         >
//           ADD NEW TASK +
//         </button>

//         {/* 🔍 SEARCH BAR */}
//         <div className="flex items-center bg-white p-2 rounded-md shadow mb-4">
//           <FaSearch className="text-gray-500 ml-2" />
//           <input
//             type="text"
//             placeholder="Search task..."
//             value={search}
//             onChange={(e) => {
//                 setSearch(e.target.value);

//             }}
//             className="w-full px-2 outline-none"
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-purple-600 text-white px-3 py-1 rounded"
//           >
//             Go
//           </button>
//         </div>

//         {/* 📋 TABLE */}
//         <div className="bg-white rounded-md shadow">
//           <div className="grid grid-cols-2 p-3 border-b font-semibold text-gray-600">
//             <span>TASK</span>
//             <span className="text-right">ACTION</span>
//           </div>

//           {todos.length > 0 ? (
//             todos.map((todo) => (
//               <div
//                 key={todo._id}
//                 className="grid grid-cols-2 p-3 border-b items-center"
//               >
//                 <span>{todo.title}</span>

//                 <div className="flex justify-end gap-3">
//                   <FaEdit className="text-blue-500 cursor-pointer" />

//                   <FaTrash
//                     className="text-red-500 cursor-pointer"
//                     onClick={() => {
//                       setDeleteId(todo._id);
//                       setShowDeleteModal(true);
//                     }}
//                   />
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center p-4 text-gray-500">
//               No todos found 😢
//             </p>
//           )}
//         </div>

//         {/* 📄 PAGINATION */}
//         <div className="flex justify-center items-center gap-4 mt-5">
//           <button
//             disabled={page === 1}
//             onClick={() => fetchTodos(page - 1, search)}
//             className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
//           >
//             Prev
//           </button>

//           <span className="font-medium">
//             {page} / {totalPages}
//           </span>

//           <button
//             disabled={page === totalPages}
//             onClick={() => fetchTodos(page + 1, search)}
//             className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* ➕ ADD MODAL */}
//       {showAdd && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/30">
//           <div className="bg-white p-6 rounded-lg w-80 relative">

//             <button
//               onClick={() => setShowAdd(false)}
//               className="absolute top-2 right-2 text-gray-500"
//             >
//               ✖
//             </button>

//             <TodoForm onAdd={handleAdd} />
//           </div>
//         </div>
//       )}

//       {/* ❌ DELETE MODAL */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/30">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">

//             <button
//               onClick={() => setShowDeleteModal(false)}
//               className="absolute top-2 right-2 text-gray-500"
//             >
//               ✖
//             </button>

//             <p className="mb-4 text-gray-700">
//               Are you sure you want to delete this task?
//             </p>

//             <div className="flex justify-end">
//               <button
//                 onClick={confirmDelete}
//                 className="bg-gray-800 text-white px-4 py-1 rounded"
//               >
//                 YES
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import TodoForm from "@/components/TodoForm";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

export default function Dashboard() {
    const [todos, setTodos] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [showAdd, setShowAdd] = useState(false);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(false);

    const [showEdit, setShowEdit] = useState(false);
    const [editTodo, setEditTodo] = useState(null);

    // 🔥 DEBOUNCE LOGIC
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    // 🔥 FETCH TODOS
    const fetchTodos = async (pageNum = 1, searchText = "") => {
        try {
            setLoading(true);

            const res = await api.get(
                `/todos?page=${pageNum}&search=${searchText}`
            );

            setTodos(res.data.todos || []);
            setTotalPages(res.data.totalPages || 1);
            setPage(res.data.page || 1);
        } catch (err) {
            console.error(err);
            setTodos([]);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 CALL API ONLY WHEN DEBOUNCED VALUE CHANGES
    useEffect(() => {
        fetchTodos(1, debouncedSearch);
    }, [debouncedSearch]);

    // ➕ ADD
    const handleAdd = (newTodo) => {
        setTodos((prev) => [newTodo, ...prev]);
        setShowAdd(false);
    };

    // ❌ DELETE (UI)
    const handleDelete = (id) => {
        setTodos((prev) => prev.filter((t) => t._id !== id));
    };

    // ❌ DELETE (API)
    const confirmDelete = async () => {
        try {
            await api.delete(`/todos/${deleteId}`);
            setShowDeleteModal(false);
            handleDelete(deleteId);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = async (updatedData) => {
        try {
            const res = await api.put(`/todos/${editTodo._id}`, updatedData);

            // 🔥 UI update
            setTodos((prev) =>
                prev.map((t) =>
                    t._id === editTodo._id ? res.data : t
                )
            );

            setShowEdit(false);
            setEditTodo(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-10">
            <div className="w-full max-w-2xl">

                {/* TITLE */}
                <h1 className="text-center text-xl font-semibold mb-4">
                    Todo List App
                </h1>

                {/* ➕ ADD BUTTON */}
                <button
                    onClick={() => setShowAdd(true)}
                    className="w-full bg-purple-600 text-white py-3 rounded-md mb-4 hover:bg-purple-700 transition cursor-pointer"
                >
                    ADD NEW TASK +
                </button>

                {/* 🔍 SEARCH BAR */}
                <div className="flex items-center bg-white p-2 rounded-md shadow mb-4">
                    <FaSearch className="text-gray-500 ml-2" />
                    <input
                        type="text"
                        placeholder="Search task..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-2 outline-none"
                    />
                </div>

                {/* 📋 TABLE */}
                <div className="bg-white rounded-md shadow">
                    <div className="grid grid-cols-2 p-3 border-b font-semibold text-gray-600">
                        <span>TASK</span>
                        <span className="text-right">ACTION</span>
                    </div>

                    {loading ? (
                        <p className="text-center p-4 text-gray-500">
                            Loading...
                        </p>
                    ) : todos.length > 0 ? (
                        todos?.map((todo) => (
                            <div
                                key={todo._id}
                                className="grid grid-cols-2 p-3 border-b items-center hover:bg-gray-100 transition-colors"
                            >
                                <span>{todo.title}</span>

                                <div className="flex justify-end gap-3">
                                    {/* <FaEdit className="text-blue-500 cursor-pointer" /> */}
                                    <FaEdit
                                        className="text-blue-500 cursor-pointer"
                                        onClick={() => {
                                            setEditTodo(todo);   // 🔥 pura todo store
                                            setShowEdit(true);   // 🔥 modal open
                                        }}
                                    />

                                    <FaTrash
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => {
                                            setDeleteId(todo._id);
                                            setShowDeleteModal(true);
                                        }}

                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center p-4 text-gray-500">
                            No todos found 😢
                        </p>
                    )}
                </div>

                {/* 📄 PAGINATION */}
                <div className="flex justify-center items-center gap-4 mt-5">
                    <button
                        disabled={page === 1}
                        onClick={() => fetchTodos(page - 1, debouncedSearch)}
                        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 cursor-pointer transition-colors"
                    >
                        Prev
                    </button>

                    <span className="font-medium">
                        {page} / {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => fetchTodos(page + 1, debouncedSearch)}
                        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 cursor-pointer transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* ➕ ADD MODAL */}
            {showAdd && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30">
                    <div className="bg-white p-6 rounded-lg w-80 relative">
                        <button
                            onClick={() => setShowAdd(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
                        >
                            ✖
                        </button>

                        <TodoForm onAdd={handleAdd} />
                    </div>
                </div>
            )}




            {showEdit && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30">
                    <div className="bg-white p-6 rounded-lg w-80 relative">
                        <button
                            onClick={() => setShowEdit(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
                        >
                            ✖
                        </button>

                        <TodoForm
                            onAdd={handleUpdate}   // 🔥 reuse form
                            initialData={editTodo} // 🔥 autofill
                        />
                    </div>
                </div>
            )}

            {/* ❌ DELETE MODAL */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
                        >
                            ✖
                        </button>

                        <p className="mb-4 text-gray-700">
                            Are you sure you want to delete this task?
                        </p>

                        <div className="flex justify-end">
                            <button
                                onClick={confirmDelete}
                                className="bg-gray-800 text-white px-4 py-1 rounded hover:bg-gray-900 cursor-pointer"
                            >
                                YES
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}