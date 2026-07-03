"use client";

import { useState, useEffect } from "react";

const steps = [
  "نحسب قدرتك المالية الحالية",
  "نختبر أثر تغير المصروفات",
  "نبني السيناريو المتوقع",
  "نقارن مستوى المخاطر",
];

export default function AnalyzingOverlay() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Loading icon */}
        <div className="w-16 h-16 rounded-2xl bg-purple-light flex items-center justify-center mx-auto mb-8">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8B82D8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin"
            style={{ animationDuration: "3s" }}
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-navy mb-6">جارٍ تحليل قرارك...</h2>

        <div className="space-y-3 text-right">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 ${
                i <= activeStep
                  ? "bg-white border border-border"
                  : "opacity-30"
              }`}
            >
              {i < activeStep ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E7D5B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : i === activeStep ? (
                <div className="w-4 h-4 rounded-full border-2 border-purple animate-pulse-gentle" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-border" />
              )}
              <span
                className={`text-sm ${
                  i <= activeStep ? "text-navy font-medium" : "text-text-secondary"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
