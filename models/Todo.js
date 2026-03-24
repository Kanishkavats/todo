// // models/Todo.js
// import mongoose from "mongoose";

// const todoSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       index: true,
//     },
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//       index: true,
//     },
//     description: String,
//     isCompleted: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// // 🔥 TEXT INDEX
// todoSchema.index({ title: "text" });

// export default mongoose.models.Todo || mongoose.model("Todo", todoSchema);

// models/Todo.js
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, index: true },
    title: { type: String, required: true },
    description: String,
  },
  { timestamps: true }
);

// 🔥 search optimization
schema.index({ title: "text" });

export default mongoose.models.Todo || mongoose.model("Todo", schema);