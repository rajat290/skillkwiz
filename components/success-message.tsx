"use client";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onContinue()}>
      <DialogContent className="sm:max-w-md bg-white border-none p-8 text-center text-[#272727] shadow-2xl">
        <DialogHeader>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <DialogTitle className="text-3xl font-semibold mb-4 text-center">
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg leading-relaxed">
          {message}
        </p>

        <div className="flex justify-center">
          <button
            onClick={onContinue}
            className="px-12 py-4 rounded-full bg-gradient-to-r from-[#f73e5d] to-[#df2849] text-white hover:scale-105 transition-transform duration-200 font-semibold shadow-lg shadow-red-500/20"
          >
            {buttonText}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
