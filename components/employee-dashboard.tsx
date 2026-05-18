"use client";

import { useState } from "react";
import { Briefcase, CalendarDays, Mail, Phone, User } from "lucide-react";

interface EmployeeDashboardProps {
  user?: {
    id: string;
    name: string;
    email: string;
    role: "employee" | "employer" | "admin";
    companyName?: string;
  } | null;
  onOpenSchedule?: () => void;
}

type EmployeeTab = "profile" | "assessments" | "activity";

export default function EmployeeDashboard({
  user,
  onOpenSchedule,
}: EmployeeDashboardProps) {
  const [activeTab, setActiveTab] = useState<EmployeeTab>("profile");

  const displayName = user?.name || "Employee User";
  const displayEmail = user?.email || "employee@skillkwiz.com";

  return (
    <div className="space-y-8 text-white">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-1.5">
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "profile"
                ? "bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] text-white shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("assessments")}
            className={`py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "assessments"
                ? "bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] text-white shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }`}
          >
            Assessments
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "activity"
                ? "bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] text-white shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }`}
          >
            Activity
          </button>
        </div>
      </div>

      {activeTab === "profile" && (
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-bold">Employee Details</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-widest text-gray-400">Name</p>
              <p className="mt-1 text-lg font-semibold flex items-center gap-2">
                <User className="h-4 w-4 text-[#4ECDC4]" />
                {displayName}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-widest text-gray-400">Email</p>
              <p className="mt-1 text-lg font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#4ECDC4]" />
                {displayEmail}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-widest text-gray-400">Role</p>
              <p className="mt-1 text-lg font-semibold capitalize flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-[#4ECDC4]" />
                {user?.role || "employee"}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-widest text-gray-400">Contact</p>
              <p className="mt-1 text-lg font-semibold flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#4ECDC4]" />
                +91 XXXXX XXXXX
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "assessments" && (
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-bold">Assessment History</h2>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-gray-300">No completed assessments yet.</p>
          </div>
          <button
            type="button"
            onClick={onOpenSchedule}
            className="mt-6 rounded-xl bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            Schedule New Assessment
          </button>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-bold">Recent Activity</h2>
          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-[#4ECDC4]" />
              <p className="text-gray-300">Logged in and viewed dashboard.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-[#4ECDC4]" />
              <p className="text-gray-300">You can schedule a new assessment from Services.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
