"use client";

import { useState } from "react";

interface EmployerRegistrationProps {
  onSubmit: () => void;
}

export default function EmployerRegistration({
  onSubmit,
}: EmployerRegistrationProps) {
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [authorized, setAuthorized] = useState<"yes" | "no" | null>(null);

  return (
    <div className="text-white">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Employer Registration
      </h1>

      <div className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="first-name" className="text-sm font-medium text-gray-200 ml-1">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="e.g. Jane"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all backdrop-blur-md"
              aria-label="First Name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="last-name" className="text-sm font-medium text-gray-200 ml-1">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="e.g. Smith"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all backdrop-blur-md"
              aria-label="Last Name"
            />
          </div>
        </div>

        {/* Company Field */}
        <div className="space-y-2">
          <label htmlFor="company-name" className="text-sm font-medium text-gray-200 ml-1">
            Company Name
          </label>
          <input
            id="company-name"
            type="text"
            placeholder="e.g. Acme Corp"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all backdrop-blur-md"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="employer-email" className="text-sm font-medium text-gray-200 ml-1">
            Work Email
          </label>
          <div className="flex gap-2">
            <input
              id="employer-email"
              type="email"
              placeholder="jane.smith@acme.com"
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all backdrop-blur-md"
            />
            <button
              className="bg-white/20 border border-white/10 rounded-xl px-6 py-3.5 text-white hover:bg-white/30 transition-colors font-medium whitespace-nowrap"
              onClick={() => setEmailOtpSent(true)}
              aria-controls="email-otp-input"
            >
              Get OTP
            </button>
          </div>
          {emailOtpSent && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300" id="email-otp-input">
              <input
                id="email-otp"
                type="text"
                placeholder="Verification Code"
                className="w-48 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all"
              />
            </div>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label htmlFor="employer-phone" className="text-sm font-medium text-gray-200 ml-1">
            Phone Number
          </label>
          <div className="flex gap-2">
            <input
              id="employer-phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all backdrop-blur-md"
            />
            <button
              className="bg-white/20 border border-white/10 rounded-xl px-6 py-3.5 text-white hover:bg-white/30 transition-colors font-medium whitespace-nowrap"
              onClick={() => setPhoneOtpSent(true)}
              aria-controls="phone-otp-input"
            >
              Get OTP
            </button>
          </div>
          {phoneOtpSent && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300" id="phone-otp-input">
              <input
                id="phone-otp"
                type="text"
                placeholder="Verification Code"
                className="w-48 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all"
              />
            </div>
          )}
        </div>

        {/* Authorization */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-200 ml-1 block">Are you Authorized to Pay?</label>
          <div className="flex items-center space-x-8 ml-1">
            <label className="flex items-center cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  id="auth-yes"
                  name="authorized"
                  className="peer sr-only"
                  onChange={() => setAuthorized("yes")}
                  checked={authorized === "yes"}
                />
                <div className="w-5 h-5 border-2 border-white/30 rounded-full peer-checked:border-[#4ECDC4] transition-all"></div>
                <div className="absolute w-2.5 h-2.5 bg-[#4ECDC4] rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
              </div>
              <span className="ml-3 text-gray-200 group-hover:text-white transition-colors">Yes</span>
            </label>
            <label className="flex items-center cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  id="auth-no"
                  name="authorized"
                  className="peer sr-only"
                  onChange={() => setAuthorized("no")}
                  checked={authorized === "no"}
                />
                <div className="w-5 h-5 border-2 border-white/30 rounded-full peer-checked:border-[#f73e5d] transition-all"></div>
                <div className="absolute w-2.5 h-2.5 bg-[#f73e5d] rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
              </div>
              <span className="ml-3 text-gray-200 group-hover:text-white transition-colors">No</span>
            </label>
          </div>
          {authorized === "yes" && (
            <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <input
                id="auth-details"
                type="text"
                placeholder="Please specify authorization details"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all"
              />
            </div>
          )}
        </div>

        {/* Department */}
        <div className="space-y-2">
          <label htmlFor="department" className="text-sm font-medium text-gray-200 ml-1">
            Department
          </label>
          <div className="relative">
            <select
              id="department"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all backdrop-blur-md cursor-pointer"
            >
              <option className="bg-[#1a2b4b]">Human Resources</option>
              <option className="bg-[#1a2b4b]">Engineering</option>
              <option className="bg-[#1a2b4b]">Marketing</option>
              <option className="bg-[#1a2b4b]">Sales</option>
              <option className="bg-[#1a2b4b]">Finance</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <button
            onClick={onSubmit}
            className="px-12 py-4 rounded-full bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] text-white hover:shadow-lg hover:shadow-[#4ECDC4]/20 transition-all font-bold text-lg"
          >
            Create Employer Account
          </button>
          <button className="px-12 py-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all font-semibold border border-white/10">
            Reset Form
          </button>
        </div>
      </div>

    </div>
  );
}
