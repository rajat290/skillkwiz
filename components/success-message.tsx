"use client";

import { CheckCircle } from "lucide-react";

interface SuccessMessageProps {
  title: string;
  message: string;
  buttonText: string;
  onContinue: () => void;
}

export default function SuccessMessage({
  title,
  message,
  buttonText,
  onContinue,
}: SuccessMessageProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center text-[#272727] shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <h2 className="text-3xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">{message}</p>

        <button
          onClick={onContinue}
          className="px-10 py-3 rounded-md bg-[#f73e5d] text-white hover:bg-[#df2849] font-medium"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
