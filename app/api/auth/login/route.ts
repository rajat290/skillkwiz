import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { email, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (role && !["employee", "employer", "admin"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid account type selected." },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      email: String(email).toLowerCase().trim(),
    }).select("+password");

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    if (role && user.role !== role) {
      return NextResponse.json(
        { error: `This account is registered as ${user.role}, not ${role}.` },
        { status: 403 }
      );
    }

    if (!user.emailVerified) {
      return NextResponse.json(
        { error: "Please verify your email before signing in." },
        { status: 403 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET || "local-development-secret";
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: "1d" }
    );

    return NextResponse.json({
      message: "Logged in successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
