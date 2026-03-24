// /api/auth/register
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/lib/db";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });

  return Response.json(user);
}





