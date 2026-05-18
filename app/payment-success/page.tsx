"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const [statusText, setStatusText] = useState("Finalizing your payment...");

  useEffect(() => {
    const finalizePayment = async () => {
      const params = new URLSearchParams(window.location.search);
      const provider = params.get("provider");
      const assessmentRequestId = params.get("assessmentRequestId");
      const sessionId = params.get("session_id");
      const paypalOrderId = params.get("token");

      if (!provider || !assessmentRequestId) {
        setStatusText("Payment success received, but details were missing.");
        return;
      }

      try {
        const response = await fetch("/api/payments/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider,
            assessmentRequestId,
            sessionId,
            orderId: paypalOrderId,
          }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Payment confirmation failed.");
        }

        setStatusText(
          "Your SkillKwiz assessment payment was completed and recorded successfully."
        );
      } catch (error: any) {
        setStatusText(
          error.message || "Payment was successful, but status update failed."
        );
      }
    };

    finalizePayment();
  }, []);

  return (
    <main className="min-h-screen bg-[#050e2d] px-6 py-40 text-center text-white">
      <h1 className="text-4xl font-bold">Payment Successful</h1>
      <p className="mx-auto mt-4 max-w-xl text-gray-300">{statusText}</p>
      <Link
        href="/services"
        className="mt-8 inline-flex rounded-md bg-[#f73e5d] px-6 py-3 font-semibold text-white"
      >
        Back to Services
      </Link>
    </main>
  );
}
