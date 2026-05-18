import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AssessmentRequest from "@/models/AssessmentRequest";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const employerId = url.searchParams.get("employerId");
    const candidateEmail = url.searchParams.get("candidateEmail");

    const filter: Record<string, string> = {};
    if (employerId) filter.employerId = employerId;
    if (candidateEmail) filter.candidateEmail = candidateEmail.toLowerCase();

    const requests = await AssessmentRequest.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Assessment request fetch error:", error);
    return NextResponse.json(
      { error: "Unable to fetch assessment requests." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const {
      employerId,
      employerName,
      employerEmail,
      companyName,
      candidateFirstName,
      candidateLastName,
      candidateEmail,
      candidatePhone,
      candidateIdType,
      skills = [],
      amount = 40,
      currency = "USD",
    } = body;

    if (
      !employerId ||
      !employerName ||
      !employerEmail ||
      !candidateFirstName ||
      !candidateLastName ||
      !candidateEmail
    ) {
      return NextResponse.json(
        { error: "Employer and candidate details are required." },
        { status: 400 }
      );
    }

    const request = await AssessmentRequest.create({
      employerId,
      employerName,
      employerEmail,
      companyName,
      candidateFirstName,
      candidateLastName,
      candidateEmail: String(candidateEmail).toLowerCase().trim(),
      candidatePhone,
      candidateIdType,
      skills,
      amount,
      currency,
      paymentStatus: "pending",
      scheduleStatus: "not_scheduled",
    });

    return NextResponse.json(
      {
        message: "Assessment request created. Please complete payment.",
        request,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Assessment request create error:", error);
    return NextResponse.json(
      { error: "Unable to create assessment request." },
      { status: 500 }
    );
  }
}
