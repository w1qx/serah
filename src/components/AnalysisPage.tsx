"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { expectedScenario, worstScenario } from "@/data/scenarios";
import StatusBadge from "./StatusBadge";
import type { YearData } from "@/data/scenarios";

function fmt(n: number): string {
  return n.toLocaleString("ar-SA");
}

function TimelineStation({ data, isLast }: { data: YearData; isLast: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex-shrink-0 w-[200px] sm:w-[220px] relative">
      {/* Connector line */}
      {!isLast && (
        <div className="absolute top-[18px] left-0 w-8 h-0.5 bg-border -translate-x-full" />
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-right bg-white border border-border rounded-2xl p-4 hover:border-navy/20 transition-colors focus:outline-none focus:ring-2 focus:ring-navy/20"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-navy">
            السنة {data.year}
          </span>
          <StatusBadge status={data.status} label={data.statusLabel} size="sm" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs text-text-secondary">القسط</span>
            <span className="text-sm font-semibold text-navy">
              {fmt(data.installment)} ريال
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-text-secondary">المتبقي شهريًا</span>
            <span
              className={`text-sm font-bold ${
                data.status === "danger"
                  ? "text-danger"
                  : data.status === "caution"
                  ? "text-caution"
                  : "text-safe"
              }`}
            >
              {fmt(data.remaining)} ريال
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-text-secondary">الدين المتبقي</span>
            <span className="text-sm text-navy">
              {data.debtLeft === 0 ? "مسدد" : `${fmt(data.debtLeft)} ريال`}
            </span>
          </div>
        </div>
      </button>

      {/* Detail card */}
      {open && (
        <div className="mt-2 bg-purple-light border border-purple/20 rounded-xl p-3 text-sm text-navy leading-relaxed animate-fade-in-up">
          {data.explanation}
        </div>
      )}
    </div>
  );
}

export default function AnalysisPage() {
  const { setStep } = useAppStore();
  const [activeTab, setActiveTab] = useState<"expected" | "worst">("expected");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const scenario = activeTab === "expected" ? expectedScenario : worstScenario;

  return (
    <div className="flex-1 max-w-[1000px] mx-auto w-full px-4 py-6 space-y-6">
      {/* Page Header */}
      <div className="animate-fade-in-up">
        <p className="text-sm text-purple font-medium mb-1">الخطوة 2 من 3</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">
          هل يناسبك هذا التمويل؟
        </h1>
        <p className="text-text-secondary leading-relaxed">
          حللنا أثر التمويل على وضعك الحالي والمسار المتوقع خلال مدة السداد.
        </p>
      </div>

      {/* Decision Card */}
      <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 animate-fade-in-up">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
          <div>
            <StatusBadge status="caution" label="مناسب مع الحذر" size="lg" />
            <h2 className="text-lg font-bold text-navy mt-3">
              يمكنك تحمل التمويل، لكن هامش الأمان المالي قد ينخفض مستقبلًا
            </h2>
          </div>
        </div>
        <p className="text-text-secondary leading-relaxed mb-6">
          وفق بياناتك الحالية، تستطيع سداد القسط دون عجز مباشر. لكن ارتفاع المصروفات مع مرور الوقت قد يقلل المبلغ المتبقي لك، خصوصًا خلال السنوات الأخيرة من التمويل.
        </p>

        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-warm-bg rounded-xl p-4 text-center">
            <p className="text-xs text-text-secondary mb-1">القسط المتوقع</p>
            <p className="text-xl sm:text-2xl font-bold text-navy">2,950</p>
            <p className="text-xs text-text-secondary">ريال / شهر</p>
          </div>
          <div className="bg-warm-bg rounded-xl p-4 text-center">
            <p className="text-xs text-text-secondary mb-1">نسبة الاستقطاع</p>
            <p className="text-xl sm:text-2xl font-bold text-navy">24%</p>
            <p className="text-xs text-text-secondary">من الراتب</p>
          </div>
          <div className="bg-warm-bg rounded-xl p-4 text-center">
            <p className="text-xs text-text-secondary mb-1">المتبقي (سنة 1)</p>
            <p className="text-xl sm:text-2xl font-bold text-caution">3,050</p>
            <p className="text-xs text-text-secondary">ريال / شهر</p>
          </div>
        </div>
      </div>

      {/* Editable Data Bar */}
      <div className="bg-white rounded-2xl border border-border p-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span className="text-text-secondary">
          مبلغ التمويل: <strong className="text-navy">150,000 ريال</strong>
        </span>
        <span className="text-text-secondary">
          المدة: <strong className="text-navy">5 سنوات</strong>
        </span>
        <span className="text-text-secondary">
          الراتب: <strong className="text-navy">12,000 ريال</strong>
        </span>
        <span className="text-text-secondary">
          المصروفات: <strong className="text-navy">5,000 ريال</strong>
        </span>
        <button
          onClick={() => setDrawerOpen(true)}
          className="mr-auto text-orange hover:text-orange-hover font-medium transition-colors"
        >
          تعديل البيانات
        </button>
      </div>

      {/* Disclaimer */}
      <div className="bg-warm-bg border border-border rounded-xl px-4 py-3 text-sm text-text-secondary leading-relaxed">
        هذه النتائج تقديرية وتوعوية، وتعتمد على البيانات التي أدخلتها وافتراضات اقتصادية قابلة للتغير. ولا تمثل موافقة ائتمانية أو توصية مالية ملزمة.
      </div>

      {/* Scenario Tabs */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("expected")}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
              activeTab === "expected"
                ? "text-navy border-b-2 border-navy bg-white"
                : "text-text-secondary hover:text-navy bg-warm-bg/50"
            }`}
          >
            <span className="block">السيناريو المتوقع</span>
            <span className="block text-xs font-normal mt-0.5 text-text-secondary">
              {expectedScenario.description}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("worst")}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
              activeTab === "worst"
                ? "text-navy border-b-2 border-navy bg-white"
                : "text-text-secondary hover:text-navy bg-warm-bg/50"
            }`}
          >
            <span className="block">السيناريو السيئ</span>
            <span className="block text-xs font-normal mt-0.5 text-text-secondary">
              {worstScenario.description}
            </span>
          </button>
        </div>

        <div className="p-6">
          {/* Bot message */}
          <div className="flex items-start gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-purple-light flex-shrink-0 flex items-center justify-center mt-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B82D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <p className="text-navy leading-relaxed text-sm bg-warm-bg rounded-2xl rounded-tr-md px-4 py-3">
              {scenario.message}
            </p>
          </div>

          {/* Assumptions */}
          <details className="mb-6 group">
            <summary className="text-sm font-medium text-purple cursor-pointer hover:underline list-none flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-open:rotate-90">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              افتراضات هذا السيناريو
            </summary>
            <ul className="mt-2 space-y-1 pr-5">
              {scenario.assumptions.map((a, i) => (
                <li key={i} className="text-sm text-text-secondary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple/40 flex-shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </details>

          {/* Timeline */}
          <div className="overflow-x-auto timeline-scroll pb-2">
            <div className="flex gap-4 min-w-min" style={{ direction: "rtl" }}>
              {scenario.years.map((year, i) => (
                <TimelineStation
                  key={year.year}
                  data={year}
                  isLast={i === scenario.years.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Scenario Result */}
          <div
            className={`mt-6 rounded-2xl p-5 border ${
              activeTab === "expected"
                ? "bg-safe-bg/50 border-safe/20"
                : "bg-danger-bg/50 border-danger/20"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-navy">{scenario.resultTitle}</h3>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  activeTab === "expected"
                    ? "bg-safe/10 text-safe"
                    : "bg-danger/10 text-danger"
                }`}
              >
                {scenario.resultStatus}
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {scenario.resultText}
            </p>
          </div>
        </div>
      </div>

      {/* Alternative Suggestion */}
      <div className="bg-white rounded-2xl border border-purple/20 p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-purple-light flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B82D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <h3 className="font-bold text-navy">خيار أكثر أمانًا</h3>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed mb-5">
          يمكنك تحسين هامش الأمان المالي من خلال خفض مبلغ التمويل إلى 120,000 ريال أو زيادة مدة السداد، مما يقلل الضغط الشهري المتوقع.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="bg-warm-bg rounded-xl p-4">
            <p className="text-xs text-text-secondary mb-1">مبلغ مقترح</p>
            <p className="text-lg font-bold text-navy">120,000 ريال</p>
          </div>
          <div className="bg-warm-bg rounded-xl p-4">
            <p className="text-xs text-text-secondary mb-1">مدة بديلة</p>
            <p className="text-lg font-bold text-navy">7 سنوات</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-purple hover:bg-purple/90 text-white font-semibold px-6 py-3 rounded-2xl text-sm transition-colors min-h-[44px]">
            تطبيق الاقتراح
          </button>
          <button
            onClick={() => setDrawerOpen(true)}
            className="border border-border text-navy font-medium px-6 py-3 rounded-2xl text-sm transition-colors hover:bg-warm-bg min-h-[44px]"
          >
            تعديل القيم بنفسي
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pb-6">
        <button
          onClick={() => setStep(3)}
          className="bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-colors min-h-[52px]"
        >
          استعراض العروض المناسبة
        </button>
      </div>

      {/* Side Drawer - Edit Data */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute top-0 left-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto animate-fade-in-up sm:rounded-r-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-navy">تعديل البيانات</h3>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 hover:bg-warm-bg rounded-xl transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { label: "مبلغ التمويل", value: "150,000", unit: "ريال" },
                  { label: "مدة التمويل", value: "5", unit: "سنوات" },
                  { label: "الراتب الشهري", value: "12,000", unit: "ريال" },
                  { label: "الالتزامات الشهرية", value: "1,000", unit: "ريال" },
                  { label: "المصروفات الشهرية", value: "5,000", unit: "ريال" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      {field.label}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        defaultValue={field.value}
                        className="flex-1 bg-warm-bg border border-border rounded-xl px-4 py-3 text-navy focus:outline-none focus:border-navy/30 min-h-[44px]"
                      />
                      <span className="text-sm text-text-secondary">{field.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full mt-6 bg-orange hover:bg-orange-hover text-white font-semibold py-3.5 rounded-2xl transition-colors min-h-[48px]"
              >
                حفظ وتحديث التحليل
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
