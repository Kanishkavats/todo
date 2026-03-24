// /api/auth/refresh
import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { generateAccessToken } from "@/lib/jwt";

export async function POST(req) {
  await connectDB();

  const { refreshToken } = await req.json();

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
  } catch (err) {
    return Response.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  const user = await User.findById(decoded.id);

  if (!user || user.refreshToken !== refreshToken) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  const newAccess = generateAccessToken(user);

  return Response.json({ accessToken: newAccess });
}