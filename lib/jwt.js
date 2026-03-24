// // lib/jwt.js
// import jwt from "jsonwebtoken";

// export const generateAccessToken = (user) =>
//   jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, {
//     expiresIn: "15m",
//   });

// export const generateRefreshToken = (user) =>
//   jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, {
//     expiresIn: "7d",
//   });


// lib/jwt.js
import jwt from "jsonwebtoken";

export const generateAccessToken = (user) =>
  jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: "15m" });

export const generateRefreshToken = (user) =>
  jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });