"use client";

import type React from "react";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

interface LoginFormProps {
  onLogin: (userType: "employer" | "employee") => void;
  onSignUp?: (userType: "employer" | "employee") => void;
}

export default function LoginForm({ onLogin, onSignUp }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"employer" | "employee">("employee");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(userType);
  };

  return (
    <div className="text-white space-y-8">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-gray-300">Sign in to your SkillKwiz account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-white/5 rounded-2xl border border-white/10">
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
            <label htmlFor="email" className="text-sm font-medium text-gray-200 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#4ECDC4] transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all backdrop-blur-md"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-200">
                Password
              </label>
              <a
                href="#"
                className="text-xs text-[#4ECDC4] hover:text-[#3dbdb3] transition-colors font-medium"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#4ECDC4] transition-colors">
                <Lock className="h-5 w-5" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all backdrop-blur-md"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
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
          className="w-full rounded-xl bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] py-4 font-bold text-white shadow-xl shadow-[#4ECDC4]/10 hover:shadow-[#4ECDC4]/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
        >
          Sign In
        </button>

        <div className="pt-4 text-center">
          <p className="text-gray-400 text-sm">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => onSignUp?.(userType)}
              className="text-[#4ECDC4] hover:text-[#3dbdb3] transition-colors font-bold"
            >
              Create Account
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
