"use client";

import { useKittoStore } from "@/store/useKittoStore";

const STEPS = [
  { number: 1 as const, label: "Seus dados" },
  { number: 2 as const, label: "Template" },
  { number: 3 as const, label: "Preview" },
];

export function StepIndicator() {
  const currentStep = useKittoStore((s) => s.currentStep);

  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <div key={step.number} className="flex items-center">
            {/* Step node */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isCompleted
                    ? "bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-white shadow-lg shadow-purple-200"
                    : isActive
                    ? "bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-white shadow-lg shadow-purple-200 ring-4 ring-[#7C3AED]/20"
                    : "bg-gray-100 text-[#9CA3AF] border-2 border-gray-200"
                }`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-xs font-medium transition-colors duration-300 whitespace-nowrap ${
                  isActive ? "text-[#7C3AED]" : isCompleted ? "text-[#6B7280]" : "text-[#9CA3AF]"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < STEPS.length - 1 && (
              <div className="w-16 sm:w-24 h-0.5 mb-5 mx-2 transition-all duration-500">
                <div
                  className={`h-full transition-all duration-500 ${
                    currentStep > step.number
                      ? "bg-gradient-to-r from-[#7C3AED] to-[#EC4899]"
                      : "bg-gray-200"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
