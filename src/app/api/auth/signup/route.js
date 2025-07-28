import { NextResponse } from "next/server";
import { hashPassword, generateToken } from "@/utils/authHelpers";
import User from "@/models/user";
import connectDB from "@/lib/mongodb";

export async function POST(request) {
  const { name, email, password, phone } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await connectDB();

  const hashedPassword = await hashPassword(password);

  try {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      ...(phone && { phone }),
    });

    const token = await generateToken({ id: newUser._id });

    // ✅ remove password before sending user
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json(
      { token, user: userWithoutPassword },
      { status: 201 }
    ).cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
