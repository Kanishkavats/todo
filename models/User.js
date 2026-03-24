// // models/User.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   email: { type: String, unique: true },
//   password: String,
//   refreshToken: String,
// });

// export default mongoose.models.User || mongoose.model("User", userSchema);

// models/User.js
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  refreshToken: String,
});

export default mongoose.models.User || mongoose.model("User", schema);