"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { offers } from "@/data/scenarios";
import StatusBadge from "./StatusBadge";

function fmt(n: number): string {
  return n.toLocaleString("ar-SA");
}

function Tip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <button
      onClick={() => setShow(!show)}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className="mr-1 text-text-secondary/60 hover:text-navy transition-colors"
      aria-label="توضيح"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      {show && (
        <span className="absolute bottom-full right-0 mb-2 w-56 bg-navy text-white text-xs leading-relaxed rounded-xl px-3 py-2 shadow-lg z-40 text-right font-normal">
          {text}
        </span>
      )}
    </button>
  );
}

/* ───────── Offer Card ───────── */
function OfferCard({
  offer,
  isSelected,
  onSelect,
  isFirst,
}: {
  offer: (typeof offers)[0];
  isSelected: boolean;
  onSelect: () => void;
  isFirst: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl border-2 transition-all ${
        isSelected
          ? "border-navy shadow-md"
          : "border-border hover:border-navy/20"
      }`}
    >
      {/* ── Top: Badge + Bank + Key Numbers ── */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              isFirst
                ? "bg-orange/10 text-orange"
                : "bg-navy/5 text-navy"
            }`}
          >
            {offer.badge}
          </span>
          {isSelected && (
            <span className="flex items-center gap-1 text-xs font-semibold text-safe">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              محدد
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <h3 className="text-lg font-bold text-navy">{offer.name}</h3>
          <span className="text-xs text-text-secondary">{offer.tagline}</span>
        </div>

        {/* ── 3 Key Numbers ── */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-warm-bg rounded-xl p-3 text-center">
            <p className="text-[11px] text-text-secondary mb-0.5">القسط</p>
            <p className="text-lg font-bold text-navy">{fmt(offer.monthlyInstallment)}</p>
            <p className="text-[10px] text-text-secondary">ريال/شهر</p>
          </div>
          <div className="bg-warm-bg rounded-xl p-3 text-center">
            <p className="text-[11px] text-text-secondary mb-0.5">يتبقى لك</p>
            <p
              className={`text-lg font-bold ${
                offer.safetyLevel === "safe"
                  ? "text-safe"
                  : offer.safetyLevel === "caution"
                  ? "text-caution"
                  : "text-danger"
              }`}
            >
              {fmt(offer.monthlyRemaining)}
            </p>
            <p className="text-[10px] text-text-secondary">ريال/شهر</p>
          </div>
          <div className="bg-warm-bg rounded-xl p-3 text-center">
            <p className="text-[11px] text-text-secondary mb-0.5">التكلفة الإضافية</p>
            <p className="text-lg font-bold text-navy">{fmt(offer.totalCost)}</p>
            <p className="text-[10px] text-text-secondary">ريال</p>
          </div>
        </div>

        {/* ── Safety + Duration row ── */}
        <div className="flex items-center justify-between mt-3">
          <StatusBadge status={offer.safetyLevel} label={offer.safetyLabel} size="sm" />
          <span className="text-xs text-text-secondary">
            {offer.duration} سنوات &middot; APR {offer.apr}%
          </span>
        </div>
      </div>

      {/* ── Expandable Details ── */}
      <div className="border-t border-border">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 text-sm text-text-secondary hover:text-navy transition-colors"
        >
          <span>{expanded ? "إخفاء التفاصيل" : "عرض التفاصيل"}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {expanded && (
          <div className="px-5 sm:px-6 pb-5 space-y-3 animate-fade-in-up">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary relative inline-flex items-center">
                  APR
                  <Tip text="التكلفة السنوية الإجمالية، تشمل الربح والرسوم." />
                </span>
                <span className="font-medium text-navy">{offer.apr}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary relative inline-flex items-center">
                  الاستقطاع
                  <Tip text="نسبة القسط من دخلك الشهري." />
                </span>
                <span className="font-medium text-navy">{offer.deductionRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">المدة</span>
                <span className="text-navy">{offer.duration} سنوات</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">الرسوم</span>
                <span className="text-navy">{fmt(offer.adminFees)} ريال</span>
              </div>
            </div>

            {/* Conditions */}
            <div className="pt-2 border-t border-border/60">
              <p className="text-xs font-medium text-text-secondary mb-1.5">الشروط</p>
              <div className="flex flex-wrap gap-1.5">
                {offer.conditions.map((c, i) => (
                  <span
                    key={i}
                    className="text-xs bg-warm-bg text-text-secondary px-2.5 py-1 rounded-lg"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Action ── */}
      <div className="px-5 sm:px-6 pb-5">
        <button
          onClick={onSelect}
          className={`w-full py-3 rounded-2xl font-semibold text-sm transition-colors min-h-[48px] ${
            isSelected
              ? "bg-navy text-white"
              : "bg-orange hover:bg-orange-hover text-white"
          }`}
        >
          {isSelected ? "العرض المحدد" : "اختيار العرض"}
        </button>
      </div>
    </div>
  );
}

/* ───────── Impact Sidebar ───────── */
function ImpactCard({ offerId }: { offerId: string }) {
  const offer = offers.find((o) => o.id === offerId);
  if (!offer) return null;

  return (
    <div className="bg-white rounded-2xl border border-border p-5 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-navy text-sm">أثر العرض عليك</h3>
        <span className="text-xs text-text-secondary">{offer.name}</span>
      </div>

      {/* Core number */}
      <div className="bg-warm-bg rounded-xl p-4 text-center mb-4">
        <p className="text-xs text-text-secondary mb-1">يتبقى لك شهريًا</p>
        <p
          className={`text-3xl font-bold ${
            offer.safetyLevel === "safe" ? "text-safe" : "text-caution"
          }`}
        >
          {fmt(offer.monthlyRemaining)}
        </p>
        <p className="text-xs text-text-secondary">ريال بعد القسط والمصروفات</p>
      </div>

      {/* Quick stats */}
      <div className="space-y-2.5 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">القسط</span>
          <span className="font-semibold text-navy">{fmt(offer.monthlyInstallment)} ريال</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">التكلفة الإضافية</span>
          <span className="text-navy">{fmt(offer.totalCost)} ريال</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">الأمان</span>
          <StatusBadge status={offer.safetyLevel} label={offer.safetyLabel} size="sm" />
        </div>
      </div>

      {/* Insight */}
      <div className="bg-purple-light rounded-xl p-3 mb-4">
        <p className="text-xs text-navy leading-relaxed">{offer.insight}</p>
      </div>

      {/* Mini Timeline */}
      <p className="text-xs font-medium text-text-secondary mb-2">المسار المتوقع</p>
      <div className="space-y-1.5">
        {offer.miniTimeline.map((point, i) => (
          <div key={i} className="flex items-center justify-between bg-warm-bg rounded-lg px-3 py-2">
            <span className="text-xs text-text-secondary">{point.label}</span>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold ${
                  point.status === "safe"
                    ? "text-safe"
                    : point.status === "caution"
                    ? "text-caution"
                    : "text-danger"
                }`}
              >
                {fmt(point.remaining)} ريال
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  point.status === "safe"
                    ? "bg-safe"
                    : point.status === "caution"
                    ? "bg-caution"
                    : "bg-danger"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── Page ───────── */
export default function OffersPage() {
  const { selectedOffer, setSelectedOffer, sortBy, setSortBy } = useAppStore();
  const [editOpen, setEditOpen] = useState(false);

  const sortedOffers = [...offers].sort((a, b) => {
    if (sortBy === "lowest-installment") return a.monthlyInstallment - b.monthlyInstallment;
    if (sortBy === "lowest-cost") return a.totalCost - b.totalCost;
    return 0;
  });

  return (
    <div className="flex-1 max-w-[1200px] mx-auto w-full px-4 py-6 space-y-5">
      {/* Header */}
      <div className="animate-fade-in-up">
        <p className="text-sm text-purple font-medium mb-1">الخطوة 3 من 3</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-1">
          عروض مناسبة لوضعك
        </h1>
        <p className="text-sm text-text-secondary">
          مرتبة حسب أثرها على ميزانيتك الشهرية.
        </p>
      </div>

      {/* Summary bar */}
      <div className="bg-white rounded-xl border border-border px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
        <span className="text-text-secondary">
          <strong className="text-navy">150,000</strong> ريال
        </span>
        <span className="text-border">|</span>
        <span className="text-text-secondary">
          <strong className="text-navy">5</strong> سنوات
        </span>
        <span className="text-border">|</span>
        <span className="text-text-secondary">الزواج</span>
        <button
          onClick={() => setEditOpen(true)}
          className="mr-auto text-orange hover:text-orange-hover text-xs font-medium transition-colors"
        >
          تعديل
        </button>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-1.5 text-sm overflow-x-auto">
        {[
          { value: "compatibility", label: "الأنسب" },
          { value: "lowest-installment", label: "أقل قسط" },
          { value: "lowest-cost", label: "أقل تكلفة" },
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSortBy(opt.value)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full transition-colors min-h-[32px] text-xs ${
              sortBy === opt.value
                ? "bg-navy text-white font-medium"
                : "bg-white border border-border text-text-secondary hover:border-navy/20"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Two columns */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Offers */}
        <div className="flex-1 space-y-4">
          {sortedOffers.map((offer, i) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              isSelected={selectedOffer === offer.id}
              onSelect={() => setSelectedOffer(offer.id)}
              isFirst={i === 0 && sortBy === "compatibility"}
            />
          ))}
        </div>

        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-[340px]">
          {selectedOffer && <ImpactCard offerId={selectedOffer} />}
        </div>
      </div>

      {/* Sidebar - Mobile */}
      <div className="lg:hidden">
        {selectedOffer && <ImpactCard offerId={selectedOffer} />}
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-text-secondary/70 py-3 border-t border-border">
        الأسماء والعروض تجريبية لأغراض النموذج الأولي ولا تمثل عروضًا مصرفية حقيقية.
      </p>

      {/* Edit drawer */}
      {editOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setEditOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-full max-w-sm bg-white shadow-2xl overflow-y-auto animate-fade-in-up sm:rounded-r-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-navy">تعديل التمويل</h3>
                <button onClick={() => setEditOpen(false)} className="p-2 hover:bg-warm-bg rounded-xl transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { label: "المبلغ", value: "150,000", unit: "ريال" },
                  { label: "المدة", value: "5", unit: "سنوات" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm font-medium text-navy mb-1.5">{field.label}</label>
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
                onClick={() => setEditOpen(false)}
                className="w-full mt-6 bg-orange hover:bg-orange-hover text-white font-semibold py-3 rounded-2xl transition-colors min-h-[48px]"
              >
                تحديث العروض
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
