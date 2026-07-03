"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useAppStore } from "@/store/useAppStore";
import { questions } from "@/data/questions";

function formatNumber(val: string): string {
  const num = val.replace(/[^0-9]/g, "");
  if (!num) return "";
  return Number(num).toLocaleString("ar-SA");
}

interface ChatMessage {
  type: "bot" | "user";
  text: string;
  questionIndex?: number;
}

export default function ConversationPage() {
  const {
    currentQuestion,
    setCurrentQuestion,
    answers,
    setAnswer,
    chatStarted,
    setChatStarted,
    setReviewMode,
    reviewMode,
    setIsAnalyzing,
    setStep,
  } = useAppStore();

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [subAnswers, setSubAnswers] = useState<Record<string, string>>({});
  const [whyOpen, setWhyOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalQuestions = questions.length;
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion) / totalQuestions) * 100;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleStart = () => {
    setChatStarted(true);
    setMessages([
      {
        type: "bot",
        text: questions[0].text,
        questionIndex: 0,
      },
    ]);
  };

  const handleOptionClick = (value: string, label: string) => {
    if (value === "") {
      inputRef.current?.focus();
      return;
    }
    const q = questions[currentQuestion];
    if (q.isNumericInput) {
      setInputValue(formatNumber(value));
    } else {
      setInputValue(label);
    }
  };

  const handleSubAnswer = (subId: string, value: string) => {
    setSubAnswers((prev) => ({ ...prev, [subId]: value }));
  };

  const handleSend = () => {
    const q = questions[currentQuestion];
    let finalValue = inputValue.trim();

    if (q.subQuestions) {
      if (q.subQuestions.some((sq) => !subAnswers[sq.id])) return;
      finalValue = q.subQuestions.map((sq) => subAnswers[sq.id]).join("، ");
      setAnswer(q.id, finalValue);
    } else {
      if (!finalValue) return;
      const rawValue = finalValue.replace(/[,،\s]/g, "");
      setAnswer(q.id, rawValue);
    }

    const newMessages: ChatMessage[] = [
      ...messages,
      { type: "user", text: finalValue },
    ];

    const nextQ = currentQuestion + 1;
    if (nextQ < totalQuestions) {
      newMessages.push({
        type: "bot",
        text: questions[nextQ].text,
        questionIndex: nextQ,
      });
      setCurrentQuestion(nextQ);
    } else {
      setReviewMode(true);
    }

    setMessages(newMessages);
    setInputValue("");
    setSubAnswers({});
    setWhyOpen(false);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setReviewMode(false);
    await new Promise((r) => setTimeout(r, 3500));
    setIsAnalyzing(false);
    setStep(2);
  };

  const summaryFields = [
    { label: "الهدف", key: "goal" },
    { label: "مبلغ التمويل", key: "amount", suffix: " ريال", isNum: true },
    { label: "مدة السداد", key: "duration", suffix: " سنوات" },
    { label: "الراتب الشهري", key: "salary", suffix: " ريال", isNum: true },
    { label: "الدخل الإضافي", key: "extraIncome", suffix: " ريال", isNum: true, zeroLabel: "لا يوجد" },
    { label: "الالتزامات الحالية", key: "obligations", suffix: " ريال", isNum: true, zeroLabel: "لا توجد" },
    { label: "المصروفات الشهرية", key: "expenses", suffix: " ريال", isNum: true },
    { label: "الحالة الأسرية", key: "familyStatus" },
    { label: "المدخرات", key: "savings", suffix: " ريال", isNum: true, zeroLabel: "لا توجد مدخرات" },
    { label: "العمل", key: "work" },
  ];

  const getDisplayValue = (field: typeof summaryFields[0]) => {
    const val = answers[field.key];
    if (!val) return "—";
    if (field.isNum) {
      const num = Number(val);
      if (num === 0 && field.zeroLabel) return field.zeroLabel;
      return num.toLocaleString("ar-SA") + (field.suffix || "");
    }
    return val + (field.suffix || "");
  };

  // Welcome screen
  if (!chatStarted) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 overflow-hidden">
        <div className="w-full max-w-lg text-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-navy/5 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#082F3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-4">
            أهلًا، أنا سراة
          </h1>
          <p className="text-text-secondary text-sm sm:text-lg leading-relaxed mb-2 px-2">
            سأطرح عليك مجموعة أسئلة قصيرة لفهم قرارك التمويلي، ثم أوضح لك كيف قد يؤثر في وضعك المالي خلال السنوات القادمة.
          </p>
          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-8 px-2">
            لن تحتاج إلى إنشاء حساب، ويمكنك مراجعة جميع بياناتك قبل بدء التحليل.
          </p>
          <button
            onClick={handleStart}
            className="bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-3.5 rounded-2xl text-lg transition-colors min-h-[48px]"
          >
            ابدأ التحليل
          </button>
        </div>
      </div>
    );
  }

  // Review mode
  if (reviewMode) {
    return (
      <div className="flex-1 flex flex-col max-w-[820px] mx-auto w-full px-4 py-6">
        <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-light flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B82D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-navy">اكتملت المعلومات الأساسية</p>
              <p className="text-sm text-text-secondary">راجع بياناتك قبل أن أبدأ التحليل.</p>
            </div>
          </div>

          <div className="space-y-3">
            {summaryFields.map((field) => (
              <div
                key={field.key}
                className="flex items-center justify-between py-3 px-4 rounded-xl bg-warm-bg"
              >
                <span className="text-sm text-text-secondary">{field.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-navy">
                    {getDisplayValue(field)}
                  </span>
                  <button className="text-text-secondary hover:text-orange transition-colors p-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={handleAnalyze}
              className="bg-orange hover:bg-orange-hover text-white font-semibold px-6 py-3.5 rounded-2xl text-base transition-colors flex-1 min-h-[48px]"
            >
              تحليل قراري
            </button>
            <button
              onClick={() => {
                setReviewMode(false);
                setCurrentQuestion(0);
                setMessages([
                  { type: "bot", text: questions[0].text, questionIndex: 0 },
                ]);
              }}
              className="border border-border text-navy font-medium px-6 py-3.5 rounded-2xl text-base transition-colors hover:bg-warm-bg min-h-[48px]"
            >
              تعديل الإجابات
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-[820px] mx-auto w-full px-4 pt-16 pb-48">
      {/* Progress - fixed under header */}
      <div className="fixed top-14 sm:top-16 left-0 right-0 z-40 bg-warm-bg shadow-sm">
        <div className="max-w-[820px] mx-auto px-4 pt-3 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">
              السؤال {currentQuestion + 1} من {totalQuestions}
            </span>
            <span className="text-sm text-text-secondary">
              {currentQuestion < totalQuestions - 1
                ? `بقيت ${totalQuestions - currentQuestion - 1} أسئلة`
                : "السؤال الأخير"}
            </span>
          </div>
          <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-navy rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-4 pt-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.type === "user" ? "justify-start" : "justify-end"} animate-fade-in-up`}
          >
            {msg.type === "bot" ? (
              <div className="flex items-start gap-3 max-w-[85%]">
                <div className="bg-white border border-border rounded-2xl rounded-tr-md px-5 py-4 shadow-sm">
                  <p className="text-navy leading-relaxed">{msg.text}</p>
                  {msg.questionIndex !== undefined && (
                    <>
                      {questions[msg.questionIndex].helpText && (
                        <p className="text-sm text-text-secondary mt-2">
                          {questions[msg.questionIndex].helpText}
                        </p>
                      )}
                      {questions[msg.questionIndex].examples && (
                        <p className="text-sm text-text-secondary mt-2">
                          {questions[msg.questionIndex].examples}
                        </p>
                      )}
                    </>
                  )}
                </div>
                <div className="w-8 h-8 rounded-lg bg-navy/5 flex-shrink-0 flex items-center justify-center mt-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#082F3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="bg-navy text-white rounded-2xl rounded-tl-md px-5 py-3 max-w-[75%]">
                <p>{msg.text}</p>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area - fixed bottom */}
      {currentQ && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-warm-bg pb-4 pt-2 border-t border-border/50">
          <div className="max-w-[820px] mx-auto px-4">
          {/* Why needed */}
          {currentQ.whyNeeded && (
            <div className="mb-2">
              <button
                onClick={() => setWhyOpen(!whyOpen)}
                className="text-sm text-purple hover:underline"
              >
                لماذا نحتاج هذه المعلومة؟
              </button>
              {whyOpen && (
                <p className="text-sm text-text-secondary mt-1 bg-purple-light rounded-xl px-4 py-2.5">
                  {currentQ.whyNeeded}
                </p>
              )}
            </div>
          )}

          {/* Sub-questions (for work question) */}
          {currentQ.subQuestions ? (
            <div className="space-y-4 mb-3">
              {currentQ.subQuestions.map((sq) => (
                <div key={sq.id}>
                  <p className="text-sm font-medium text-navy mb-2">{sq.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {sq.options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSubAnswer(sq.id, opt.value)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
                          subAnswers[sq.id] === opt.value
                            ? "bg-navy text-white"
                            : "bg-white border border-border text-navy hover:border-navy/30"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <button
                onClick={handleSend}
                disabled={currentQ.subQuestions.some((sq) => !subAnswers[sq.id])}
                className="w-full sm:w-auto bg-orange hover:bg-orange-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-2xl transition-colors min-h-[48px]"
              >
                إرسال
              </button>
            </div>
          ) : (
            <>
              {/* Suggested answers */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-3 timeline-scroll">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleOptionClick(opt.value, opt.label)}
                    className="flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium bg-white border border-border text-navy hover:border-navy/40 transition-colors min-h-[44px] whitespace-nowrap"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Text input + send */}
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    if (currentQ.isNumericInput) {
                      setInputValue(formatNumber(e.target.value));
                    } else {
                      setInputValue(e.target.value);
                    }
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="اكتب إجابتك هنا..."
                  className="flex-1 bg-white border border-border rounded-2xl px-5 py-3 text-navy placeholder:text-text-secondary/50 focus:outline-none focus:border-navy/30 min-h-[48px]"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="bg-orange hover:bg-orange-hover disabled:opacity-40 disabled:cursor-not-allowed text-white p-3 rounded-2xl transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </>
          )}
          </div>
        </div>
      )}
    </div>
  );
}
