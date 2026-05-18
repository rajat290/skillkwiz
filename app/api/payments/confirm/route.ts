import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AssessmentRequest from "@/models/AssessmentRequest";

const PAYPAL_API =
  process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";

async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing PayPal credentials.");
  }

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error_description || "PayPal auth failed.");
  return data.access_token;
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json().catch(() => ({}));
    const provider = body.provider as "stripe" | "paypal";
    const assessmentRequestId = body.assessmentRequestId as string | undefined;

    if (!provider || !assessmentRequestId) {
      return NextResponse.json(
        { error: "provider and assessmentRequestId are required." },
        { status: 400 }
      );
    }

    if (provider === "stripe") {
      const sessionId = body.sessionId as string | undefined;
      const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

      if (!sessionId) {
        return NextResponse.json(
          { error: "sessionId is required for Stripe." },
          { status: 400 }
        );
      }
      if (!stripeSecretKey) {
        return NextResponse.json(
          { error: "Missing STRIPE_SECRET_KEY in environment." },
          { status: 500 }
        );
      }

      const response = await fetch(
        `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
        {
          headers: { Authorization: `Bearer ${stripeSecretKey}` },
        }
      );
      const session = await response.json();

      if (!response.ok || session.payment_status !== "paid") {
        return NextResponse.json(
          { error: "Stripe payment is not completed." },
          { status: 400 }
        );
      }

      await AssessmentRequest.findByIdAndUpdate(assessmentRequestId, {
        paymentStatus: "paid",
      });

      return NextResponse.json({ message: "Stripe payment verified and updated." });
    }

    if (provider === "paypal") {
      const orderId = body.orderId as string | undefined;
      if (!orderId) {
        return NextResponse.json(
          { error: "orderId is required for PayPal." },
          { status: 400 }
        );
      }

      const accessToken = await getPayPalAccessToken();
      const captureResponse = await fetch(
        `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const capture = await captureResponse.json();

      if (!captureResponse.ok || capture.status !== "COMPLETED") {
        return NextResponse.json(
          { error: "PayPal payment is not completed." },
          { status: 400 }
        );
      }

      await AssessmentRequest.findByIdAndUpdate(assessmentRequestId, {
        paymentStatus: "paid",
      });

      return NextResponse.json({ message: "PayPal payment captured and updated." });
    }

    return NextResponse.json({ error: "Unsupported provider." }, { status: 400 });
  } catch (error: any) {
    console.error("Payment confirm error:", error);
    return NextResponse.json(
      { error: error.message || "Unable to confirm payment." },
      { status: 500 }
    );
  }
}

