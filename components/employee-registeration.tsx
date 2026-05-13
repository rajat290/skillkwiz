"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

interface EmployeeRegistrationProps {
  onNext: () => void;
}

export default function EmployeeRegistration({
  onNext,
}: EmployeeRegistrationProps) {
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);

  return (
    <div className="text-white">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Employee Registration
      </h1>

      <div className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="employee-first-name" className="text-sm font-medium text-gray-200 ml-1">
              First Name
            </label>
            <input
              id="employee-first-name"
              type="text"
              placeholder="e.g. John"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all backdrop-blur-md"
              aria-label="First Name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="employee-last-name" className="text-sm font-medium text-gray-200 ml-1">
              Last Name
            </label>
            <input
              id="employee-last-name"
              type="text"
              placeholder="e.g. Doe"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all backdrop-blur-md"
              aria-label="Last Name"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="employee-email" className="text-sm font-medium text-gray-200 ml-1">
            Email Address
          </label>
          <div className="flex gap-2">
            <input
              id="employee-email"
              type="email"
              placeholder="john.doe@example.com"
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all backdrop-blur-md"
            />
            <button
              className="bg-white/20 border border-white/10 rounded-xl px-6 py-3.5 text-white hover:bg-white/30 transition-colors font-medium whitespace-nowrap"
              onClick={() => setEmailOtpSent(true)}
              aria-controls="employee-email-otp-input"
            >
              Get OTP
            </button>
          </div>
          {emailOtpSent && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300" id="employee-email-otp-input">
              <input
                id="employee-email-otp"
                type="text"
                placeholder="Verification Code"
                className="w-48 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all"
              />
            </div>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label htmlFor="employee-phone" className="text-sm font-medium text-gray-200 ml-1">
            Phone Number
          </label>
          <div className="flex gap-2">
            <input
              id="employee-phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all backdrop-blur-md"
            />
            <button
              className="bg-white/20 border border-white/10 rounded-xl px-6 py-3.5 text-white hover:bg-white/30 transition-colors font-medium whitespace-nowrap"
              onClick={() => setPhoneOtpSent(true)}
              aria-controls="employee-phone-otp-input"
            >
              Get OTP
            </button>
          </div>
          {phoneOtpSent && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300" id="employee-phone-otp-input">
              <input
                id="employee-phone-otp"
                type="text"
                placeholder="Verification Code"
                className="w-48 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all"
              />
            </div>
          )}
        </div>

        {/* Upload Resume */}
        <div className="space-y-2">
          <label htmlFor="resume-upload" className="text-sm font-medium text-gray-200 ml-1">
            Upload Resume (PDF, DOC)
          </label>
          <label className="w-full bg-white/5 border-2 border-dashed border-white/20 rounded-xl px-4 py-8 text-white hover:bg-white/10 transition-all flex flex-col items-center justify-center cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 text-[#4ECDC4]" />
            </div>
            <span className="font-medium text-gray-300">Click to upload or drag and drop</span>
            <span className="text-xs text-gray-500 mt-1">Maximum file size 5MB</span>
            <input
              id="resume-upload"
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <button
            onClick={onNext}
            className="px-12 py-4 rounded-full bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] text-white hover:shadow-lg hover:shadow-[#4ECDC4]/20 transition-all font-bold text-lg"
          >
            Submit Application
          </button>
          <button className="px-12 py-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all font-semibold border border-white/10">
            Reset Form
          </button>
        </div>
      </div>

    </div>
  );
}
