"use client";

import type React from "react";
import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { toast } from "sonner";

interface LoginFormProps {
  onLogin: (
    userType: "employer" | "employee",
    user?: {
      id: string;
      name: string;
      email: string;
      role: "employer" | "employee" | "admin";
      companyName?: string;
    }
  ) => void;
  onSignUp?: (userType: "employer" | "employee") => void;
}

export default function LoginForm({ onLogin, onSignUp }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"employer" | "employee">("employee");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: userType }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed.");
      }

      localStorage.setItem("skillkwiz_token", data.token);
      localStorage.setItem("skillkwiz_user", JSON.stringify(data.user));
      toast.success(data.message || "Logged in successfully.");
      onLogin(data.user?.role === "employer" ? "employer" : userType, data.user);
    } catch (error: any) {
      toast.error(error.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 text-white">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">
          Welcome Back
        </h1>
        <p className="text-gray-300">Sign in to your SkillKwiz account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/5 p-1.5">
          <button
            type="button"
            onClick={() => setUserType("employee")}
            className={`flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
              userType === "employee"
                ? "bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <User className="mr-2 h-4 w-4" /> Employee
          </button>
          <button
            type="button"
            onClick={() => setUserType("employer")}
            className={`flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
              userType === "employer"
                ? "bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <User className="mr-2 h-4 w-4" /> Employer
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="ml-1 text-sm font-medium text-gray-200"
            >
              Email Address
            </label>
            <div className="group relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 transition-colors group-focus-within:text-[#4ECDC4]">
                <Mail className="h-5 w-5" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-white/20 bg-white/10 py-3.5 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-md transition-all focus:border-[#4ECDC4] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-200"
              >
                Password
              </label>
              <a
                href="/files/dummy-resource.pdf"
                download
                className="text-xs font-medium text-[#4ECDC4] transition-colors hover:text-[#3dbdb3]"
              >
                Forgot Password?
              </a>
            </div>
            <div className="group relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 transition-colors group-focus-within:text-[#4ECDC4]">
                <Lock className="h-5 w-5" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-white/20 bg-white/10 py-3.5 pl-12 pr-12 text-white placeholder-gray-500 backdrop-blur-md transition-all focus:border-[#4ECDC4] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] py-4 font-bold text-white shadow-xl shadow-[#4ECDC4]/10 transition-all duration-300 hover:scale-[1.01] hover:shadow-[#4ECDC4]/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        <div className="pt-4 text-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => onSignUp?.(userType)}
              className="font-bold text-[#4ECDC4] transition-colors hover:text-[#3dbdb3]"
            >
              Create Account
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
