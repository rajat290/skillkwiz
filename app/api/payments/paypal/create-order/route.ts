import { NextResponse } from "next/server";

const PAYPAL_API =
  process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";

async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing PayPal sandbox credentials.");
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
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.APP_URL ||
      "http://localhost:3000";
    const { assessmentRequestId } = await req.json().catch(() => ({}));
    if (!assessmentRequestId) {
      return NextResponse.json(
        { error: "assessmentRequestId is required." },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            description: "SkillKwiz Assessment Request",
            custom_id: String(assessmentRequestId),
            amount: {
              currency_code: "USD",
              value: "40.00",
            },
          },
        ],
        application_context: {
          return_url: `${appUrl}/payment-success?provider=paypal&assessmentRequestId=${assessmentRequestId}`,
          cancel_url: `${appUrl}/payment-cancel?provider=paypal`,
        },
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: order.message || "PayPal order failed." },
        { status: 500 }
      );
    }

    const approveUrl = order.links?.find((link: any) => link.rel === "approve")?.href;
    return NextResponse.json({ id: order.id, approveUrl });
  } catch (error: any) {
    console.error("PayPal create order error:", error);
    return NextResponse.json(
      { error: error.message || "Unable to create PayPal order." },
      { status: 500 }
    );
  }
}
