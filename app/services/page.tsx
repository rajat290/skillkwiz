"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import LoginForm from "@/components/login-form";
import EmployeeRegistration from "@/components/employee-registeration";
import ScheduleAssessment from "@/components/schedule-assessment";
import EmployerRegistration from "@/components/employer-registeration";
import EmployerProfile from "@/components/employer-profile";
import EmployerAssessmentRequest from "@/components/employer-assessment-request";
import EmployerCandidateList from "@/components/employer-candidate-list";
import EmployeeDashboard from "@/components/employee-dashboard";
import SuccessMessage from "@/components/success-message";

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: "employee" | "employer" | "admin";
  companyName?: string;
}

export default function ServicesPage() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"employer" | "employee" | null>(
    null
  );
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  // Registration success states
  const [employeeRegistrationSuccess, setEmployeeRegistrationSuccess] =
    useState(false);
  const [employerRegistrationSuccess, setEmployerRegistrationSuccess] =
    useState(false);

  // Screen states
  const [employeeScreen, setEmployeeScreen] = useState<
    "registration" | "dashboard" | "assessment"
  >("registration");
  const [employerScreen, setEmployerScreen] = useState<
    "registration" | "profile" | "assessment" | "candidates"
  >("registration");

  // Handle login
  const handleLogin = (type: "employer" | "employee", user?: CurrentUser) => {
    setIsLoggedIn(true);
    setUserType(type);
    if (user) setCurrentUser(user);

    // Set initial screen based on user type
    if (type === "employer") {
      setEmployerRegistrationSuccess(false);
      setEmployerScreen("profile");
    } else {
      setEmployeeRegistrationSuccess(false);
      setEmployeeScreen("dashboard");
    }
  };

  const handleSignUp = (type: "employer" | "employee") => {
    setIsLoggedIn(true);
    setUserType(type);
    setEmployeeRegistrationSuccess(false);
    setEmployerRegistrationSuccess(false);

    if (type === "employer") {
      setEmployerScreen("registration");
    } else {
      setEmployeeScreen("registration");
    }
  };

  // Handle employee registration completion
  const handleEmployeeRegistrationComplete = () => {
    setEmployeeRegistrationSuccess(true);
  };

  // Handle employer registration completion
  const handleEmployerRegistrationComplete = () => {
    setEmployerRegistrationSuccess(true);
  };

  // Continue after employee registration success
  const continueToEmployeeAssessment = () => {
    setEmployeeRegistrationSuccess(false);
    setEmployeeScreen("dashboard");
  };

  // Continue after employer registration success
  const continueToEmployerProfile = () => {
    setEmployerRegistrationSuccess(false);
    setEmployerScreen("profile");
  };

  return (
    <div className="min-h-screen bg-[#050e2d] relative overflow-x-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/servicespage/services-bg.png"
          alt="Background"
          fill
          priority
          className="object-cover opacity-100"
        />
      </div>

      <div className="relative z-10 pt-32 pb-20 md:pt-40">
        <div className="container mx-auto px-4 max-w-5xl">
          {!isLoggedIn ? (
            // Login Form
            <div className="bg-white/10 border border-white/20 rounded-3xl p-10 backdrop-blur-xl max-w-md mx-auto shadow-2xl">
              <LoginForm onLogin={handleLogin} onSignUp={handleSignUp} />
            </div>
          ) : (
            // Logged in content
            <>
              {/* Back button - only shown on assessment screen */}
              {userType === "employee" && employeeScreen === "assessment" && (
                <button
                  onClick={() => setEmployeeScreen("dashboard")}
                  className="text-white mb-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
              )}

              {/* Content Panel */}
              {userType === "employee" ? (
                <div className="bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                  {employeeRegistrationSuccess ? (
                    <SuccessMessage
                      title="Registration Successful!"
                      message="Your employee account has been created successfully. You can now proceed to schedule your assessment."
                      buttonText="Continue to Assessment"
                      onContinue={continueToEmployeeAssessment}
                    />
                  ) : employeeScreen === "registration" ? (
                    <EmployeeRegistration
                      onNext={handleEmployeeRegistrationComplete}
                    />
                  ) : employeeScreen === "dashboard" ? (
                    <EmployeeDashboard
                      user={currentUser}
                      onOpenSchedule={() => setEmployeeScreen("assessment")}
                    />
                  ) : (
                    <ScheduleAssessment />
                  )}
                </div>
              ) : (
                <>
                  {/* Employer Screens */}
                  {employerRegistrationSuccess ? (
                    <div className="bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                      <SuccessMessage
                        title="Registration Successful!"
                        message="Your employer account has been created successfully. You can now access all employer features."
                        buttonText="Continue to Profile"
                        onContinue={continueToEmployerProfile}
                      />
                    </div>
                  ) : employerScreen === "registration" ? (
                    <div className="bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                      <EmployerRegistration
                        onSubmit={handleEmployerRegistrationComplete}
                      />
                    </div>
                  ) : (
                    <>
                      {/* Employer Navigation Tabs */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-1.5 mb-8 backdrop-blur-md">
                        <div className="grid grid-cols-3 gap-1">
                          <button
                            onClick={() => setEmployerScreen("profile")}
                            className={`py-3.5 px-4 text-center rounded-xl font-semibold transition-all duration-300 ${employerScreen === "profile"
                                ? "bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] text-white shadow-lg"
                                : "text-gray-300 hover:text-white hover:bg-white/5"
                              }`}
                          >
                            Profile
                          </button>
                          <button
                            onClick={() => setEmployerScreen("assessment")}
                            className={`py-3.5 px-4 text-center rounded-xl font-semibold transition-all duration-300 ${employerScreen === "assessment"
                                ? "bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] text-white shadow-lg"
                                : "text-gray-300 hover:text-white hover:bg-white/5"
                              }`}
                          >
                            Assessment Request
                          </button>
                          <button
                            onClick={() => setEmployerScreen("candidates")}
                            className={`py-3.5 px-4 text-center rounded-xl font-semibold transition-all duration-300 ${employerScreen === "candidates"
                                ? "bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] text-white shadow-lg"
                                : "text-gray-300 hover:text-white hover:bg-white/5"
                              }`}
                          >
                            Candidate List
                          </button>
                        </div>
                      </div>

                      {/* Employer Content */}
                      <div className="bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                        {employerScreen === "profile" && (
                          <EmployerProfile user={currentUser} />
                        )}
                        {employerScreen === "assessment" && (
                          <EmployerAssessmentRequest currentUser={currentUser} />
                        )}
                        {employerScreen === "candidates" && (
                          <EmployerCandidateList currentUser={currentUser} />
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

    </div>
  );
}
