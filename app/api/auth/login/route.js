// /api/auth/login
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });

  if (!user) return Response.json({ error: "User not found" });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return Response.json({ error: "Wrong password" });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return Response.json({ accessToken, refreshToken });
}