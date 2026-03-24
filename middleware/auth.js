// // middleware/auth.js
// import jwt from "jsonwebtoken";

// export const verifyToken = (req) => {
//   const token = req.headers.get("authorization")?.split(" ")[1];
//   if (!token) return null;

//   try {
//     return jwt.verify(token, process.env.ACCESS_SECRET);
//   } catch {
//     return null;
//   }
// };

// middleware/auth.js

import jwt from "jsonwebtoken";

export const verifyToken = (req) => {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return null;

  try {
    console.log("jwt");
    return jwt.verify(token, process.env.ACCESS_SECRET);
  } catch {
    return null;
  }
};