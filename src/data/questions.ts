export interface QuestionOption {
  label: string;
  value: string;
}

export interface SubQuestion {
  id: string;
  label: string;
  options: QuestionOption[];
}

export interface Question {
  id: string;
  text: string;
  helpText?: string;
  examples?: string;
  whyNeeded?: string;
  options: QuestionOption[];
  subQuestions?: SubQuestion[];
  isNumericInput?: boolean;
}

export const questions: Question[] = [
  {
    id: "goal",
    text: "ما الهدف الذي تفكر في تمويله؟",
    helpText: "سيساعدنا الهدف على تقدير المصروفات والتغيرات المرتبطة به.",
    options: [
      { label: "زواج", value: "زواج" },
      { label: "شراء سيارة", value: "شراء سيارة" },
      { label: "شراء منزل", value: "شراء منزل" },
      { label: "مشروع", value: "مشروع" },
      { label: "تعليم", value: "تعليم" },
      { label: "سداد التزامات", value: "سداد التزامات" },
      { label: "احتياج شخصي", value: "احتياج شخصي" },
      { label: "هدف آخر", value: "هدف آخر" },
    ],
  },
  {
    id: "amount",
    text: "كم مبلغ التمويل الذي تحتاجه تقريبًا؟",
    isNumericInput: true,
    options: [
      { label: "50,000 ريال", value: "50000" },
      { label: "100,000 ريال", value: "100000" },
      { label: "150,000 ريال", value: "150000" },
      { label: "250,000 ريال", value: "250000" },
      { label: "سأكتب مبلغًا آخر", value: "" },
    ],
  },
  {
    id: "duration",
    text: "خلال كم سنة تفضّل سداد التمويل؟",
    options: [
      { label: "سنتان", value: "2" },
      { label: "3 سنوات", value: "3" },
      { label: "5 سنوات", value: "5" },
      { label: "7 سنوات", value: "7" },
      { label: "10 سنوات", value: "10" },
    ],
  },
  {
    id: "salary",
    text: "كم يبلغ راتبك الشهري الذي ينزل في حسابك؟",
    isNumericInput: true,
    whyNeeded: "نستخدم الراتب لتقدير نسبة الاستقطاع والمبلغ الذي سيبقى لك بعد القسط والمصروفات.",
    options: [
      { label: "5,000 ريال", value: "5000" },
      { label: "8,000 ريال", value: "8000" },
      { label: "12,000 ريال", value: "12000" },
      { label: "15,000 ريال", value: "15000" },
      { label: "سأكتب المبلغ", value: "" },
    ],
  },
  {
    id: "extraIncome",
    text: "هل لديك دخل شهري إضافي ثابت؟",
    options: [
      { label: "لا يوجد", value: "0" },
      { label: "أقل من 1,000 ريال", value: "500" },
      { label: "من 1,000 إلى 3,000 ريال", value: "2000" },
      { label: "أكثر من 3,000 ريال", value: "4000" },
      { label: "سأكتب المبلغ", value: "" },
    ],
  },
  {
    id: "obligations",
    text: "كم تدفع شهريًا لالتزاماتك وأقساطك الحالية؟",
    examples: "مثل أقساط السيارة، بطاقات الائتمان أو تمويل قائم.",
    options: [
      { label: "لا توجد التزامات", value: "0" },
      { label: "أقل من 1,000 ريال", value: "500" },
      { label: "من 1,000 إلى 3,000 ريال", value: "2000" },
      { label: "أكثر من 3,000 ريال", value: "4000" },
      { label: "سأكتب المبلغ", value: "" },
    ],
  },
  {
    id: "expenses",
    text: "كم يبلغ متوسط مصروفاتك الأساسية كل شهر؟",
    helpText: "يشمل السكن، الطعام، التنقل والفواتير الأساسية.",
    options: [
      { label: "أقل من 3,000 ريال", value: "2000" },
      { label: "من 3,000 إلى 5,000 ريال", value: "4000" },
      { label: "من 5,000 إلى 8,000 ريال", value: "6500" },
      { label: "أكثر من 8,000 ريال", value: "9000" },
      { label: "سأكتب المبلغ", value: "" },
    ],
  },
  {
    id: "familyStatus",
    text: "أي خيار يصف حالتك الأسرية حاليًا؟",
    options: [
      { label: "أعزب بلا معالين", value: "أعزب بلا معالين" },
      { label: "متزوج بلا معالين", value: "متزوج بلا معالين" },
      { label: "متزوج وأعول شخصًا أو شخصين", value: "متزوج وأعول شخصًا أو شخصين" },
      { label: "متزوج وأعول 3 أشخاص أو أكثر", value: "متزوج وأعول 3 أشخاص أو أكثر" },
      { label: "حالة أخرى", value: "حالة أخرى" },
    ],
  },
  {
    id: "savings",
    text: "كم تبلغ مدخراتك المتاحة للطوارئ؟",
    options: [
      { label: "لا توجد مدخرات", value: "0" },
      { label: "أقل من 10,000 ريال", value: "5000" },
      { label: "من 10,000 إلى 30,000 ريال", value: "20000" },
      { label: "أكثر من 30,000 ريال", value: "40000" },
      { label: "سأكتب المبلغ", value: "" },
    ],
  },
  {
    id: "work",
    text: "ما قطاع عملك وكم تبلغ مدة خدمتك؟",
    subQuestions: [
      {
        id: "sector",
        label: "قطاع العمل",
        options: [
          { label: "حكومي", value: "حكومي" },
          { label: "قطاع خاص", value: "قطاع خاص" },
          { label: "شبه حكومي", value: "شبه حكومي" },
          { label: "قطاع آخر", value: "قطاع آخر" },
        ],
      },
      {
        id: "serviceYears",
        label: "مدة الخدمة",
        options: [
          { label: "أقل من سنة", value: "أقل من سنة" },
          { label: "من سنة إلى 3 سنوات", value: "من سنة إلى 3 سنوات" },
          { label: "من 3 إلى 5 سنوات", value: "من 3 إلى 5 سنوات" },
          { label: "أكثر من 5 سنوات", value: "أكثر من 5 سنوات" },
        ],
      },
    ],
    options: [],
  },
];
