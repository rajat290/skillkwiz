import { randomBytes, createHash } from "crypto";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import { sendAdminNotification, sendVerificationEmail } from "@/lib/mail";
import User from "@/models/User";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const {
      name,
      email,
      password,
      role = "employee",
      phone,
      companyName,
    } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required." },
        { status: 400 }
      );
    }

    if (!["employee", "employer"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid account type." },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account already exists with this email." },
        { status: 409 }
      );
    }

    const verificationToken = randomBytes(32).toString("hex");
    const verificationTokenHash = hashToken(verificationToken);
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: passwordHash,
      role,
      phone,
      companyName,
      emailVerified: false,
      emailVerificationToken: verificationTokenHash,
      emailVerificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.APP_URL ||
      "http://localhost:3000";
    const verificationUrl = `${appUrl}/api/auth/verify-email?token=${verificationToken}`;

    await sendVerificationEmail({
      email: normalizedEmail,
      name,
      verificationUrl,
    });

    sendAdminNotification(normalizedEmail, name).catch((error) => {
      console.error("Admin notification failed:", error);
    });

    return NextResponse.json(
      {
        message:
          "Registration successful. Please check your email to verify your account.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          emailVerified: user.emailVerified,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
