"use client";

import { useAppStore } from "@/store/useAppStore";
import Header from "@/components/Header";
import ConversationPage from "@/components/ConversationPage";
import AnalysisPage from "@/components/AnalysisPage";
import OffersPage from "@/components/OffersPage";
import AnalyzingOverlay from "@/components/AnalyzingOverlay";

export default function Home() {
  const { currentStep, isAnalyzing } = useAppStore();

  return (
    <div className="min-h-screen flex flex-col bg-warm-bg overflow-x-hidden">
      <Header />
      <main className="flex-1 flex flex-col pt-14 sm:pt-16">
        {isAnalyzing ? (
          <AnalyzingOverlay />
        ) : currentStep === 1 ? (
          <ConversationPage />
        ) : currentStep === 2 ? (
          <AnalysisPage />
        ) : (
          <OffersPage />
        )}
      </main>
    </div>
  );
}
