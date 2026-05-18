import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.APP_URL ||
      "http://localhost:3000";

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY in environment." },
        { status: 500 }
      );
    }

    const {
      amount = 4000,
      currency = "usd",
      assessmentRequestId,
    } = await req.json().catch(() => ({}));

    if (!assessmentRequestId) {
      return NextResponse.json(
        { error: "assessmentRequestId is required." },
        { status: 400 }
      );
    }

    const formData = new URLSearchParams();
    formData.append("mode", "payment");
    formData.append(
      "success_url",
      `${appUrl}/payment-success?provider=stripe&session_id={CHECKOUT_SESSION_ID}&assessmentRequestId=${assessmentRequestId}`
    );
    formData.append("cancel_url", `${appUrl}/payment-cancel?provider=stripe`);
    formData.append("line_items[0][quantity]", "1");
    formData.append("line_items[0][price_data][currency]", currency);
    formData.append("line_items[0][price_data][unit_amount]", String(amount));
    formData.append(
      "line_items[0][price_data][product_data][name]",
      "SkillKwiz Assessment Request"
    );
    formData.append("metadata[assessmentRequestId]", String(assessmentRequestId));

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const session = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: session.error?.message || "Stripe session failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Unable to create Stripe checkout session." },
      { status: 500 }
    );
  }
}
