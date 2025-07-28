import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { generateToken, verifyPassword } from "@/utils/authHelpers";

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
  }

  await connectDB();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isPasswordCorrect = await verifyPassword(password, user.password);

  if (!isPasswordCorrect) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await generateToken({ id: user._id });

  // Remove password before sending response
  const userData = user.toObject();
  delete userData.password;

  const response = NextResponse.json({token, user: userData });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, 
    sameSite: "lax",
  });

  return response;
}
