// app/api/todos/[id]/route.js

import connectDB from "@/lib/db";
import Todo from "@/models/Todo";
import { verifyToken } from "@/middleware/auth";
import mongoose from "mongoose";

// 📥 GET SINGLE TODO
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const user = verifyToken(req);
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const todo = await Todo.findOne({
      _id: id,
      userId: user.id,
    });

    if (!todo) {
      return Response.json({ error: "Todo not found" }, { status: 404 });
    }

    return Response.json(todo);
  } catch (error) {
    return Response.json({ error: error.message });
  }
}

//  UPDATE TODO
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const user = verifyToken(req);
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updatedTodo = await Todo.findOneAndUpdate(
      {
         _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(user.id),
      },
      body,
      { new: true }
    );

    if (!updatedTodo) {
      return Response.json({ error: "Todo not found" }, { status: 404 });
    }

    return Response.json(updatedTodo);
  } catch (error) {
    return Response.json({ error: error.message });
  }
}


// export async function PUT(req, context) {
//   try {
//     await connectDB();

//     const { params } = await context;
//     const { id } = await params;

//     const user = verifyToken(req);
//     if (!user) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();

//     const updatedTodo = await Todo.findOneAndUpdate(
//       {
//         _id: new mongoose.Types.ObjectId(id),
//         userId: new mongoose.Types.ObjectId(user.id),
//       },
//       body,
//       { new: true }
//     );

//     if (!updatedTodo) {
//       return Response.json({ error: "Todo not found" }, { status: 404 });
//     }

//     return Response.json(updatedTodo);
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }

//  DELETE TODO
export async function DELETE(req, { params }) {
// export async function DELETE(req, context) {
//   const { params } = context; // 🔥 FIX
  const { id } = await params;      // 🔥 FIX
  console.log(id,"delete api");

  try {
    await connectDB();

    const user = verifyToken(req);
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deleted = await Todo.findOneAndDelete({
    //   _id: params.id,
    //   userId: user.id,

         _id: new mongoose.Types.ObjectId(id),
         userId: new mongoose.Types.ObjectId(user.id),
    });

    if (!deleted) {
      return Response.json({ error: "Todo not found" }, { status: 404 });
    }

    return Response.json({ message: "Todo deleted successfully" });
  } catch (error) {
    return Response.json({ error: error.message });
  }
}

// export async function DELETE(req, { params }) {
//   try {
//      const { id } =  params; // ✅ FIX
//     // console.log(id,"delete")

//     const user = await getUserFromToken(req); // agar auth use kr raha hai

//     const deleted = await Todo.findOneAndDelete({
//          _id: id,
//          userId: user.id, 

//     });

//     if (!deleted) {
//       return Response.json({ message: "Not found" }, { status: 404 });
//     }

//     return Response.json({ message: "Deleted" });
//   } catch (err) {
//     return Response.json({ error: err.message }, { status: 500 });
//   }
// }