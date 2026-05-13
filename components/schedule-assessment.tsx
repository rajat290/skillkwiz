"use client";

import { useState } from "react";
import { CheckCircle, Info, Calendar, Clock, ChevronLeft } from "lucide-react";
import SuccessMessage from "./success-message";


export default function ScheduleAssessment() {
  const [selectedCompany, setSelectedCompany] = useState<string>("microsoft");
  const [showThankYou, setShowThankYou] = useState(false);

  return (
    <div className="text-white space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Schedule Assessment</h1>
        <p className="text-gray-300">Choose your preferred slot and testing center</p>
      </div>

      <div className="space-y-8">
        <p className="text-center text-lg bg-white/5 p-4 rounded-2xl border border-white/10 text-gray-200">
          Great! Multiple employers have authorized you to take a skill
          assessment. Choose one to proceed.
        </p>

        {/* Company Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["microsoft", "google", "amazon"].map((company) => (
            <button
              key={company}
              className={`flex items-center justify-center gap-3 rounded-xl px-4 py-4 transition-all duration-300 ${
                selectedCompany === company
                  ? "bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] text-white shadow-lg scale-[1.02]"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
              }`}
              onClick={() => setSelectedCompany(company)}
            >
              <div className={`w-3 h-3 rounded-full ${selectedCompany === company ? "bg-white animate-pulse" : "bg-gray-500"}`}></div>
              <span className="font-semibold capitalize">{company}</span>
            </button>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-[#4ECDC4]/10 border border-[#4ECDC4]/20 rounded-2xl p-5 flex items-start gap-4 backdrop-blur-sm">
          <div className="bg-[#4ECDC4]/20 p-2 rounded-lg">
            <Info className="w-5 h-5 text-[#4ECDC4]" />
          </div>
          <p className="text-gray-200 leading-relaxed">
            <span className="font-bold text-white capitalize">{selectedCompany}</span> has authorized you to take an assessment for C#, SQL Server, Web2.0, and React.
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Select Country</label>
            <div className="relative group">
              <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 transition-all cursor-pointer">
                <option className="bg-[#1a2b4b]">India</option>
                <option className="bg-[#1a2b4b]">United States</option>
                <option className="bg-[#1a2b4b]">United Kingdom</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 group-hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5 -rotate-90" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Zip Code</label>
            <div className="relative group">
              <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 transition-all cursor-pointer">
                <option className="bg-[#1a2b4b]">Select Zip code</option>
                <option className="bg-[#1a2b4b]">110001</option>
                <option className="bg-[#1a2b4b]">110002</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 group-hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5 -rotate-90" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Testing Centre</label>
            <div className="relative group">
              <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 transition-all cursor-pointer">
                <option className="bg-[#1a2b4b]">Select Centre</option>
                <option className="bg-[#1a2b4b]">Downtown Hub</option>
                <option className="bg-[#1a2b4b]">Westside Lab</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 group-hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5 -rotate-90" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Select Date</label>
              <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 group focus-within:ring-2 focus-within:ring-[#4ECDC4]/50 transition-all">
                <input type="text" placeholder="MM/DD/YY" className="bg-transparent focus:outline-none text-sm w-full" />
                <Calendar className="w-5 h-5 text-gray-400 group-focus-within:text-[#4ECDC4]" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Select Time</label>
              <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 group focus-within:ring-2 focus-within:ring-[#4ECDC4]/50 transition-all">
                <input type="text" placeholder="HH:MM AM" className="bg-transparent focus:outline-none text-sm w-full" />
                <Clock className="w-5 h-5 text-gray-400 group-focus-within:text-[#4ECDC4]" />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setShowThankYou(true)}
            className="px-16 py-4 rounded-full bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] text-white font-bold text-lg shadow-xl shadow-[#4ECDC4]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Submit Schedule
          </button>
        </div>
      </div>

      {showThankYou && (
        <SuccessMessage
          title="Thank You!"
          message="Your assessment schedule request has been submitted successfully. Our team will review your request and get back to you soon."
          buttonText="Close"
          onContinue={() => setShowThankYou(false)}
        />
      )}

    </div>
  );
}
