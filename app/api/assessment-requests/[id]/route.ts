import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AssessmentRequest from "@/models/AssessmentRequest";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const body = await req.json();
    const allowedUpdates = [
      "paymentStatus",
      "scheduleStatus",
      "assessmentDate",
      "assessmentTime",
      "testingCenter",
      "reportUrl",
    ];
    const update: Record<string, string> = {};

    for (const key of allowedUpdates) {
      if (body[key] !== undefined) update[key] = body[key];
    }

    const request = await AssessmentRequest.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!request) {
      return NextResponse.json(
        { error: "Assessment request not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ request });
  } catch (error) {
    console.error("Assessment request update error:", error);
    return NextResponse.json(
      { error: "Unable to update assessment request." },
      { status: 500 }
    );
  }
}
