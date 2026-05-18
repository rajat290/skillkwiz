"use client";

import type React from "react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EmployerRegistrationProps {
  onSubmit: () => void;
}

export default function EmployerRegistration({ onSubmit }: EmployerRegistrationProps) {
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [authorized, setAuthorized] = useState<"yes" | "no" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          password: formData.password,
          role: "employer",
          companyName: formData.companyName,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed.");
      }

      toast.success(data.message);
      onSubmit();
    } catch (error: any) {
      toast.error(error.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-white">
      <h1 className="mb-8 text-center text-3xl font-semibold">
        Employer Registration
      </h1>

      <form onSubmit={handleRegister} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="First Name"
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50"
          />
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Last Name"
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50"
          />
        </div>

        <input
          type="text"
          required
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          placeholder="Company Name"
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50"
        />

        <div className="flex gap-2">
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Work Email"
            className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50"
          />
          <button
            type="button"
            onClick={() => setEmailOtpSent(true)}
            className="whitespace-nowrap rounded-xl border border-white/10 bg-white/20 px-6 py-3.5 font-medium text-white hover:bg-white/30"
          >
            {emailOtpSent ? "OTP Sent" : "Get OTP"}
          </button>
        </div>

        <input
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50"
        />

        <div className="flex gap-2">
          <input
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50"
          />
          <button
            type="button"
            onClick={() => setPhoneOtpSent(true)}
            className="whitespace-nowrap rounded-xl border border-white/10 bg-white/20 px-6 py-3.5 font-medium text-white hover:bg-white/30"
          >
            {phoneOtpSent ? "OTP Sent" : "Get OTP"}
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-200">
            Are you Authorized to Pay?
          </p>
          <div className="flex gap-8">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="authorized"
                checked={authorized === "yes"}
                onChange={() => setAuthorized("yes")}
              />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="authorized"
                checked={authorized === "no"}
                onChange={() => setAuthorized("no")}
              />
              No
            </label>
          </div>
          {authorized === "yes" && (
            <input
              type="text"
              placeholder="Authorization details"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50"
            />
          )}
        </div>

        <select className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50">
          <option className="bg-[#1a2b4b]">Human Resources</option>
          <option className="bg-[#1a2b4b]">Engineering</option>
          <option className="bg-[#1a2b4b]">Marketing</option>
          <option className="bg-[#1a2b4b]">Sales</option>
          <option className="bg-[#1a2b4b]">Finance</option>
        </select>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center rounded-full bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] px-12 py-4 text-lg font-bold text-white hover:shadow-lg hover:shadow-[#4ECDC4]/20 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Employer Account"
            )}
          </button>
          <button
            type="button"
            onClick={() =>
              setFormData({
                firstName: "",
                lastName: "",
                companyName: "",
                email: "",
                password: "",
              })
            }
            className="rounded-full border border-white/10 bg-white/10 px-12 py-4 font-semibold text-white hover:bg-white/20"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}
