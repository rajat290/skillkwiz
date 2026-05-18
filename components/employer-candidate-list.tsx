"use client";

import { useEffect, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { toast } from "sonner";

interface EmployerCandidateListProps {
  currentUser?: {
    id: string;
  } | null;
}

interface AssessmentRequest {
  _id: string;
  candidateFirstName: string;
  candidateLastName: string;
  candidateEmail: string;
  candidatePhone?: string;
  skills: string[];
  paymentStatus: "pending" | "paid" | "failed";
  scheduleStatus: "not_scheduled" | "scheduled";
  testingCenter?: string;
  reportUrl?: string;
  createdAt: string;
}

export default function EmployerCandidateList({
  currentUser,
}: EmployerCandidateListProps) {
  const [requests, setRequests] = useState<AssessmentRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentUser?.id) return;

    const loadRequests = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/assessment-requests?employerId=${currentUser.id}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load candidate requests.");
        }

        setRequests(data.requests || []);
      } catch (error: any) {
        toast.error(error.message || "Unable to load candidate requests.");
      } finally {
        setIsLoading(false);
      }
    };

    loadRequests();
  }, [currentUser?.id]);

  return (
    <div className="space-y-8 text-white">
      <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="group relative w-full flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#4ECDC4]" />
            <input
              type="text"
              placeholder="Search by email, phone, or skill..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 transition-all focus:border-[#4ECDC4] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50"
            />
          </div>
          <button className="w-full rounded-2xl bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] px-10 py-4 font-bold shadow-lg transition-all hover:scale-105 active:scale-95 md:w-auto">
            Search
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="font-bold text-white">{requests.length}</span>{" "}
            assessment requests
          </p>
        </div>

        {isLoading && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-gray-300">
            Loading candidate requests...
          </div>
        )}

        {!isLoading && requests.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-gray-300">
            No assessment requests yet. Create one from the Assessment Request
            tab.
          </div>
        )}

        {requests.map((request) => {
          const name = `${request.candidateFirstName} ${request.candidateLastName}`;
          const initials = `${request.candidateFirstName?.[0] || "C"}${
            request.candidateLastName?.[0] || ""
          }`.toUpperCase();

          return (
            <div
              key={request._id}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-[#4ECDC4]/30 hover:bg-white/10"
            >
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4ECDC4] to-[#2d8a84] text-3xl font-black text-white shadow-xl transition-transform duration-500 group-hover:scale-110">
                  {initials}
                </div>

                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div>
                    <h3 className="text-2xl font-bold transition-colors group-hover:text-[#4ECDC4]">
                      {name}
                    </h3>
                    <p className="text-sm font-medium tracking-wide text-[#4ECDC4]">
                      {request.candidateEmail}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-start">
                    <div className="flex flex-wrap gap-2">
                      {request.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                        request.paymentStatus === "paid"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {request.paymentStatus}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase text-gray-300">
                      {request.scheduleStatus.replace("_", " ")}
                    </span>
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin className="mr-1 h-4 w-4 text-[#4ECDC4]" />
                      {request.testingCenter || "Not scheduled"}
                    </div>
                  </div>
                </div>

                <a
                  href={request.reportUrl || "/files/dummy-report.pdf"}
                  download
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-8 py-3 text-center font-bold transition-all hover:border-transparent hover:bg-[#4ECDC4] hover:text-white md:w-auto"
                >
                  View Report
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
