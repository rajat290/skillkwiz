"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export default function EmployerAssessmentRequest() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "C++",
    "Python",
  ]);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className="text-white space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Assessment Request</h1>
        <p className="text-gray-300">Request a new skill assessment for a candidate</p>
      </div>

      <div className="space-y-6">
        {/* Candidate Name */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300 ml-1">Candidate Name</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 transition-all backdrop-blur-md"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 transition-all backdrop-blur-md"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Candidate Email</label>
            <input
              type="email"
              placeholder="candidate@example.com"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 transition-all backdrop-blur-md"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Candidate Phone</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 transition-all backdrop-blur-md"
            />
          </div>
        </div>

        {/* Identity & Resume */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Candidate ID Type</label>
            <div className="relative group">
              <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 transition-all cursor-pointer">
                <option className="bg-[#1a2b4b]">PAN Card</option>
                <option className="bg-[#1a2b4b]">Aadhar Card</option>
                <option className="bg-[#1a2b4b]">Passport</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                <Upload className="w-4 h-4 rotate-180" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Upload Resume <span className="text-red-400">*</span></label>
            <label className="w-full bg-white/10 border border-white/20 border-dashed rounded-xl px-4 py-3.5 text-gray-400 hover:bg-white/15 hover:border-[#4ECDC4]/50 transition-all flex items-center justify-center cursor-pointer group">
              <Upload className="w-5 h-5 mr-3 group-hover:text-[#4ECDC4] transition-colors" />
              <span className="group-hover:text-white transition-colors">Drag or click to upload</span>
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
            </label>
          </div>
        </div>

        {/* Skills Selection */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Skills to Assess</h3>
            <span className="text-xs text-gray-400 uppercase tracking-widest">Select relevant categories</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#4ECDC4]">
              <option className="bg-[#1a2b4b]">Job Family: IT & Software</option>
              <option className="bg-[#1a2b4b]">Accounting</option>
            </select>
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#4ECDC4]">
              <option className="bg-[#1a2b4b]">Skills: Programming</option>
              <option className="bg-[#1a2b4b]">Management</option>
            </select>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[100px] flex flex-wrap gap-3 items-center">
            {selectedSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className="bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              >
                {skill}
                <span className="text-white/60 hover:text-white">×</span>
              </button>
            ))}
            <button className="border border-white/20 border-dashed text-gray-400 px-4 py-2 rounded-full text-sm hover:border-white hover:text-white transition-all">
              + Add More
            </button>
          </div>
        </div>

        {/* Payment & Authorization */}
        <div className="pt-6 border-t border-white/10">
          <div className="bg-[#4ECDC4]/5 border border-[#4ECDC4]/20 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 font-medium">Assessment Fee</span>
              <span className="text-2xl font-bold text-white">$40.00</span>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#4ECDC4] uppercase tracking-tighter ml-1">Payment Method</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none">
                <option className="bg-[#1a2b4b]">Visa ending in 4242</option>
                <option className="bg-[#1a2b4b]">Mastercard ending in 8899</option>
              </select>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed text-center italic">
              "I authorize Delos Infosystems to debit the stated amount for conducting the skill assessment of the specified candidate."
            </p>
          </div>
        </div>

        <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] text-white font-bold text-lg shadow-xl shadow-[#4ECDC4]/20 hover:scale-[1.01] active:scale-[0.99] transition-all">
          Submit Assessment Request
        </button>
      </div>
    </div>
  );
}
