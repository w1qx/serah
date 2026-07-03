"use client";

import { create } from "zustand";

interface AppState {
  currentStep: 1 | 2 | 3;
  currentQuestion: number;
  answers: Record<string, string>;
  selectedOffer: string | null;
  isAnalyzing: boolean;
  chatStarted: boolean;
  reviewMode: boolean;
  sortBy: string;

  setStep: (step: 1 | 2 | 3) => void;
  setCurrentQuestion: (q: number) => void;
  setAnswer: (id: string, value: string) => void;
  setSelectedOffer: (id: string | null) => void;
  setIsAnalyzing: (v: boolean) => void;
  setChatStarted: (v: boolean) => void;
  setReviewMode: (v: boolean) => void;
  setSortBy: (v: string) => void;
  resetAll: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentStep: 1,
  currentQuestion: 0,
  answers: {},
  selectedOffer: "afaq",
  isAnalyzing: false,
  chatStarted: false,
  reviewMode: false,
  sortBy: "compatibility",

  setStep: (step) => set({ currentStep: step }),
  setCurrentQuestion: (q) => set({ currentQuestion: q }),
  setAnswer: (id, value) =>
    set((state) => ({ answers: { ...state.answers, [id]: value } })),
  setSelectedOffer: (id) => set({ selectedOffer: id }),
  setIsAnalyzing: (v) => set({ isAnalyzing: v }),
  setChatStarted: (v) => set({ chatStarted: v }),
  setReviewMode: (v) => set({ reviewMode: v }),
  setSortBy: (v) => set({ sortBy: v }),
  resetAll: () =>
    set({
      currentStep: 1,
      currentQuestion: 0,
      answers: {},
      selectedOffer: "afaq",
      isAnalyzing: false,
      chatStarted: false,
      reviewMode: false,
      sortBy: "compatibility",
    }),
}));
