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
    <div className="text-white">
      <h1 className="mb-2 text-center text-3xl font-semibold">Login</h1>
      <p className="mb-8 text-center text-gray-300">
        Sign in to access your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setUserType("employee")}
            className={`flex items-center justify-center rounded-md px-6 py-3 text-white ${
              userType === "employee"
                ? "bg-gradient-to-r from-blue-500 to-blue-600"
                : "bg-gradient-to-r from-gray-500/80 to-gray-600/80"
            }`}
          >
            <User className="mr-2 h-4 w-4" /> Employee
          </button>
          <button
            type="button"
            onClick={() => setUserType("employer")}
            className={`flex items-center justify-center rounded-md px-6 py-3 text-white ${
              userType === "employer"
                ? "bg-gradient-to-r from-blue-500 to-blue-600"
                : "bg-gradient-to-r from-gray-500/80 to-gray-600/80"
            }`}
          >
            <User className="mr-2 h-4 w-4" /> Employer
          </button>
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block">
            Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded bg-[#333333] py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block">
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded bg-[#333333] py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:outline-none"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="text-right">
          <a
            href="/files/dummy-resource.pdf"
            download
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] py-3 font-medium text-white hover:opacity-90"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-300">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => onSignUp?.(userType)}
              className="text-blue-400 hover:text-blue-300"
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
