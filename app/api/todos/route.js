// // /api/todos
import connectDB from "@/lib/db";
import Todo from "@/models/Todo";
import { verifyToken } from "@/middleware/auth";

export async function GET(req) {
  await connectDB();

  const user = verifyToken(req);
  if (!user) return Response.json({ error: "Unauthorized" });

  const { searchParams } = new URL(req.url);

  const page = +searchParams.get("page") || 1;
  const limit = 5;
  const search = searchParams.get("search") || "";

  const query = {
    userId: user.id,
    ...(search && { $text: { $search: search } }),
  };

  const todos = await Todo.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Todo.countDocuments(query);

  return Response.json({
    todos,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(req) {
  await connectDB();

  const user = verifyToken(req);
  if (!user) return Response.json({ error: "Unauthorized" });

  const body = await req.json();

  const todo = await Todo.create({
    ...body,
    userId: user.id,
  });

  return Response.json(todo);
}

// api/todos/route.js
// import connectDB from "@/lib/db";
// import Todo from "@/models/Todo";
// import { verifyToken } from "@/middleware/auth";

// export async function GET(req) {
//   await connectDB();

//   const user = verifyToken(req);
//   if (!user) return Response.json({ error: "Unauthorized" });

//   const { searchParams } = new URL(req.url);
//   const page = +searchParams.get("page") || 1;
//   const limit = 5;
//   const search = searchParams.get("search") || "";

//   const query = {
//     userId: user.id,
//     ...(search && { $text: { $search: search } }),
//   };

//   const todos = await Todo.find(query)
//     .skip((page - 1) * limit)
//     .limit(limit);

//   const total = await Todo.countDocuments(query);

//   return Response.json({
//     todos,
//     total,
//     page,
//     totalPages: Math.ceil(total / limit),
//   });
// }

// export async function POST(req) {
//   await connectDB();

//   const user = verifyToken(req);
//   if (!user) return Response.json({ error: "Unauthorized" });

//   const body = await req.json();

//   const todo = await Todo.create({
//     ...body,
//     userId: user.id,
//   });

//   return Response.json(todo);
// }