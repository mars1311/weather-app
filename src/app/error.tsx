"use client";

import { AlertCircle } from "lucide-react";
import { ERROR } from "@/constants/Error";

type ErrorProps = {
  error: Error & { digest?: string };
};

export default function Error({ error }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-6 text-center">
      <div className="bg-white/5  border border-white/10 rounded-[24px] p-10 max-w-[400px] flex flex-col items-center">
        <AlertCircle size={48} className="text-red-500 mb-5 opacity-90" />
        <h2 className="text-[24px] font-bold mb-3 text-gray-600">
          {ERROR.TITLE}
        </h2>
        <p className="text-[16px] text-gray-400 mb-4">
          {error.message || ERROR.MESSAGE}
        </p>
      </div>
    </div>
  );
}
