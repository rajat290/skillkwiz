"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface EmployerAssessmentRequestProps {
  currentUser?: {
    id: string;
    name: string;
    email: string;
    companyName?: string;
  } | null;
}

export default function EmployerAssessmentRequest({
  currentUser,
}: EmployerAssessmentRequestProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["C++", "Python"]);
  const [createdRequestId, setCreatedRequestId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    candidateFirstName: "",
    candidateLastName: "",
    candidateEmail: "",
    candidatePhone: "",
    candidateIdType: "PAN Card",
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : [...current, skill]
    );
  };

  const createAssessmentRequest = async () => {
    if (!currentUser?.id) {
      toast.error("Please login as an employer first.");
      return null;
    }

    if (
      !formData.candidateFirstName ||
      !formData.candidateLastName ||
      !formData.candidateEmail
    ) {
      toast.error("Candidate name and email are required.");
      return null;
    }

    setIsCreating(true);

    try {
      const response = await fetch("/api/assessment-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          employerId: currentUser.id,
          employerName: currentUser.name,
          employerEmail: currentUser.email,
          companyName: currentUser.companyName,
          skills: selectedSkills,
          amount: 40,
          currency: "USD",
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create assessment request.");
      }

      const requestId = data.request?._id;
      setCreatedRequestId(requestId);
      toast.success(data.message || "Assessment request created.");
      return requestId;
    } catch (error: any) {
      toast.error(error.message || "Unable to create assessment request.");
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  const ensureRequest = async () => {
    return createdRequestId || (await createAssessmentRequest());
  };

  const startStripeCheckout = async () => {
    const requestId = await ensureRequest();
    if (!requestId) return;

    try {
      const response = await fetch("/api/payments/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 4000,
          currency: "usd",
          assessmentRequestId: requestId,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to start Stripe checkout.");
      }

      window.location.href = data.url;
    } catch (error: any) {
      toast.error(error.message || "Stripe payment failed.");
    }
  };

  const startPayPalCheckout = async () => {
    const requestId = await ensureRequest();
    if (!requestId) return;

    try {
      const response = await fetch("/api/payments/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessmentRequestId: requestId }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to start PayPal checkout.");
      }

      window.location.href = data.approveUrl;
    } catch (error: any) {
      toast.error(error.message || "PayPal payment failed.");
    }
  };

  return (
    <div className="space-y-8 text-white">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">
          Assessment Request
        </h1>
        <p className="text-gray-300">
          Request a new skill assessment for a candidate
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="ml-1 text-sm font-medium text-gray-300">
            Candidate Name
          </label>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              value={formData.candidateFirstName}
              onChange={(e) =>
                setFormData({ ...formData, candidateFirstName: e.target.value })
              }
              placeholder="First Name"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50"
            />
            <input
              type="text"
              value={formData.candidateLastName}
              onChange={(e) =>
                setFormData({ ...formData, candidateLastName: e.target.value })
              }
              placeholder="Last Name"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <input
            type="email"
            value={formData.candidateEmail}
            onChange={(e) =>
              setFormData({ ...formData, candidateEmail: e.target.value })
            }
            placeholder="candidate@example.com"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50"
          />
          <input
            type="tel"
            value={formData.candidatePhone}
            onChange={(e) =>
              setFormData({ ...formData, candidatePhone: e.target.value })
            }
            placeholder="+91 XXXXX XXXXX"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <select
            value={formData.candidateIdType}
            onChange={(e) =>
              setFormData({ ...formData, candidateIdType: e.target.value })
            }
            className="w-full cursor-pointer appearance-none rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50"
          >
            <option className="bg-[#1a2b4b]">PAN Card</option>
            <option className="bg-[#1a2b4b]">Aadhar Card</option>
            <option className="bg-[#1a2b4b]">Passport</option>
          </select>
          <label className="flex w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/10 px-4 py-3.5 text-gray-400 transition-all hover:bg-white/15 hover:border-[#4ECDC4]/50">
            <Upload className="mr-3 h-5 w-5" />
            <span>Drag or click to upload resume</span>
            <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
          </label>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-white">Skills to Assess</h3>
          <div className="flex min-h-[100px] flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-6">
            {selectedSkills.map((skill) => (
              <button
                type="button"
                key={skill}
                onClick={() => toggleSkill(skill)}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
              >
                {skill}
                <span className="text-white/70">x</span>
              </button>
            ))}
            {["React", "SQL", "Java"].map((skill) => (
              <button
                type="button"
                key={skill}
                onClick={() => toggleSkill(skill)}
                className="rounded-full border border-dashed border-white/20 px-4 py-2 text-sm text-gray-400 transition-all hover:border-white hover:text-white"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#4ECDC4]/20 bg-[#4ECDC4]/5 p-6">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-300">Assessment Fee</span>
            <span className="text-2xl font-bold text-white">$40.00</span>
          </div>
          {createdRequestId && (
            <p className="mt-3 text-sm text-[#4ECDC4]">
              Request saved. Complete payment to mark it paid.
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <button
            type="button"
            onClick={createAssessmentRequest}
            disabled={isCreating || Boolean(createdRequestId)}
            className="rounded-xl bg-white/10 py-4 text-lg font-bold text-white transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {createdRequestId ? "Request Saved" : isCreating ? "Saving..." : "Save Request"}
          </button>
          <button
            type="button"
            onClick={startStripeCheckout}
            className="rounded-xl bg-gradient-to-r from-[#635bff] to-[#4037d6] py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            Pay with Stripe
          </button>
          <button
            type="button"
            onClick={startPayPalCheckout}
            className="rounded-xl bg-gradient-to-r from-[#ffc439] to-[#f2a900] py-4 text-lg font-bold text-[#111827] shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            Pay with PayPal
          </button>
        </div>
      </div>
    </div>
  );
}
