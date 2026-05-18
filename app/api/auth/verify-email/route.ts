import { createHash } from "crypto";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.APP_URL ||
      "http://localhost:3000";

    if (!token) {
      return NextResponse.redirect(`${appUrl}/services?verified=missing`);
    }

    const tokenHash = hashToken(token);
    const user = await User.findOne({
      emailVerificationToken: tokenHash,
      emailVerificationTokenExpires: { $gt: new Date() },
    }).select("+emailVerificationToken +emailVerificationTokenExpires");

    if (!user) {
      return NextResponse.redirect(`${appUrl}/services?verified=invalid`);
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpires = undefined;
    await user.save();

    return NextResponse.redirect(`${appUrl}/services?verified=success`);
  } catch (error) {
    console.error("Email verification error:", error);
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.APP_URL ||
      "http://localhost:3000";
    return NextResponse.redirect(`${appUrl}/services?verified=error`);
  }
}
