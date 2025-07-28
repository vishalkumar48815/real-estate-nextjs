import User from "@/models/user"
import connectDB from "../../../lib/mongodb"
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const users = await User.find()

    return NextResponse.json(users)
}