"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, FileText, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginSection() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = isSignUp ? "/api/auth/register" : "/api/auth/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success(data.message || (isSignUp ? "Registered successfully!" : "Logged in successfully!"));

      if (isSignUp) {
        setIsSignUp(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-[#f4f8ff] py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid overflow-hidden rounded-lg bg-white shadow-xl md:grid-cols-2">
          {/* Left Side: Information */}
          <div className="relative min-h-[420px] bg-[#eaf4ff] p-8">
            <Image
              src="/images/homepage/futurism-perspective-digital-nomads-lifestyle 1.png"
              alt="SkillKwiz digital assessment workspace"
              fill
              className="object-cover opacity-35"
            />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#00418d]">
                  {isSignUp ? "Join the Future of Hiring" : "Transform Your Hiring Strategy Today"}
                </h2>
                <p className="mt-4 max-w-md text-[#272727]">
                  {isSignUp
                    ? "Create an account to start building your high-performing team with data-driven insights."
                    : "Experience a revolutionary approach to talent acquisition with SkillKwiz. Sign up now and discover a world of possibilities."}
                </p>
              </div>
              <div className="grid gap-3 text-sm text-[#00418d]">
                <div className="flex items-center gap-3 rounded-md bg-white/85 p-3 shadow-sm">
                  <ShieldCheck className="h-5 w-5 text-[#f73e5d]" />
                  Secure testing centers
                </div>
                <div className="flex items-center gap-3 rounded-md bg-white/85 p-3 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-[#f73e5d]" />
                  Candidate authentication
                </div>
                <div className="flex items-center gap-3 rounded-md bg-white/85 p-3 shadow-sm">
                  <FileText className="h-5 w-5 text-[#f73e5d]" />
                  Verified skill reports
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-[#00418d] p-8">
            <h2 className="text-2xl font-bold text-white">
              {isSignUp ? "Create your account" : "Sign in to SkillKwiz"}
            </h2>
            <p className="mt-2 text-sm text-white/80">
              {isSignUp
                ? "Start your journey with us today."
                : "Access assessments, candidate reports, and scheduling options."}
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              {isSignUp && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md bg-white p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f6c648]"
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md bg-white p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f6c648]"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md bg-white p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f6c648]"
              />

              {!isSignUp && (
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                  <label className="flex items-center text-white">
                    <input type="checkbox" suppressHydrationWarning className="mr-2 h-4 w-4" />
                    Remember me
                  </label>
                  <a
                    href="#"
                    className="text-[#c3dfff] hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-md bg-[#f73e5d] p-3 font-semibold text-white transition hover:bg-[#df2849] disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  isSignUp ? "Create Account" : "Sign In"
                )}
              </button>

              <div className="text-center text-sm text-white">
                {isSignUp ? "Already have an account?" : "New to SkillKwiz?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="font-semibold text-[#f6c648] hover:underline"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
