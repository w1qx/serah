export interface YearData {
  year: number;
  installment: number;
  remaining: number;
  debtLeft: number;
  status: "safe" | "caution" | "danger";
  statusLabel: string;
  explanation: string;
}

export interface Scenario {
  id: string;
  label: string;
  description: string;
  assumptions: string[];
  message: string;
  years: YearData[];
  resultTitle: string;
  resultStatus: string;
  resultText: string;
}

export const expectedScenario: Scenario = {
  id: "expected",
  label: "السيناريو المتوقع",
  description: "زيادة متوقعة في الراتب مع ارتفاع تدريجي في تكاليف المعيشة.",
  assumptions: [
    "زيادة تدريجية متوقعة في الراتب",
    "ارتفاع معتدل في تكاليف المعيشة",
    "ثبات الالتزامات الحالية",
    "عدم وجود التزام مالي طارئ كبير",
  ],
  message:
    "في السيناريو المتوقع، تساعد الزيادة التدريجية في راتبك على تعويض جزء من ارتفاع المصروفات. يبقى القسط قابلًا للإدارة، لكن هامش الأمان خلال بداية التمويل سيكون محدودًا.",
  years: [
    {
      year: 1,
      installment: 2950,
      remaining: 3050,
      debtLeft: 122000,
      status: "caution",
      statusLabel: "مقبول مع الحذر",
      explanation:
        "المبلغ المتبقي يكفي لتغطية احتياجاتك الأساسية، لكن هامش الطوارئ محدود في بداية التمويل.",
    },
    {
      year: 2,
      installment: 2950,
      remaining: 3150,
      debtLeft: 93000,
      status: "caution",
      statusLabel: "مقبول مع الحذر",
      explanation:
        "تحسن طفيف بفضل الزيادة المتوقعة في الراتب، لكن الهامش لا يزال يتطلب حذرًا في الإنفاق.",
    },
    {
      year: 3,
      installment: 2950,
      remaining: 3250,
      debtLeft: 63000,
      status: "safe",
      statusLabel: "آمن",
      explanation:
        "ساعدت الزيادة المتوقعة في الراتب على تغطية ارتفاع المصروفات، لذلك تحسن المبلغ المتبقي مقارنة بالسنة السابقة.",
    },
    {
      year: 4,
      installment: 2950,
      remaining: 3350,
      debtLeft: 32000,
      status: "safe",
      statusLabel: "آمن",
      explanation:
        "وضعك المالي مستقر مع اقتراب نهاية التمويل وانخفاض الدين المتبقي.",
    },
    {
      year: 5,
      installment: 2950,
      remaining: 3450,
      debtLeft: 0,
      status: "safe",
      statusLabel: "آمن",
      explanation:
        "اكتمل سداد التمويل. يعود المبلغ الذي كنت تدفعه كقسط إلى ميزانيتك الشهرية.",
    },
  ],
  resultTitle: "نتيجة السيناريو المتوقع",
  resultStatus: "تم تحقيق الهدف",
  resultText:
    "يمكنك تحقيق هدف الزواج وسداد التمويل، مع وجود ضغط مالي محدود خلال بداية مدة التمويل. يتحسن وضعك تدريجيًا إذا ارتفع راتبك كما هو متوقع.",
};

export const worstScenario: Scenario = {
  id: "worst",
  label: "السيناريو السيئ",
  description: "ثبات الراتب مع استمرار ارتفاع المصروفات.",
  assumptions: [
    "ثبات الراتب",
    "ارتفاع تكاليف المعيشة",
    "ثبات القسط",
    "عدم وجود زيادة في الدخل",
    "استمرار الالتزامات الحالية",
  ],
  message:
    "في السيناريو السيئ، يظل راتبك ثابتًا بينما تستمر المصروفات في الارتفاع. لا يحدث عجز مباشر في البداية، لكن المبلغ المتبقي ينخفض تدريجيًا ويصبح هامش الطوارئ ضعيفًا.",
  years: [
    {
      year: 1,
      installment: 2950,
      remaining: 2850,
      debtLeft: 122000,
      status: "caution",
      statusLabel: "مقبول مع الحذر",
      explanation:
        "المبلغ المتبقي محدود مع ثبات الراتب وعدم وجود زيادة متوقعة.",
    },
    {
      year: 2,
      installment: 2950,
      remaining: 2450,
      debtLeft: 93000,
      status: "caution",
      statusLabel: "مقبول مع الحذر",
      explanation:
        "يبدأ تأثير ارتفاع المصروفات بالظهور مع ثبات الراتب، مما يقلل المبلغ المتبقي.",
    },
    {
      year: 3,
      installment: 2950,
      remaining: 2050,
      debtLeft: 63000,
      status: "caution",
      statusLabel: "مقبول مع الحذر",
      explanation:
        "يستمر تراجع المبلغ المتبقي. قد يصبح التعامل مع النفقات غير المتوقعة أكثر صعوبة.",
    },
    {
      year: 4,
      installment: 2950,
      remaining: 1550,
      debtLeft: 32000,
      status: "danger",
      statusLabel: "عالي المخاطر",
      explanation:
        "يرتفع الضغط المالي بشكل ملحوظ. المبلغ المتبقي قد لا يكفي لتغطية الطوارئ.",
    },
    {
      year: 5,
      installment: 2950,
      remaining: 1050,
      debtLeft: 0,
      status: "danger",
      statusLabel: "عالي المخاطر",
      explanation:
        "رغم اكتمال السداد، المبلغ المتبقي خلال هذه السنة كان منخفضًا جدًا مما يزيد من صعوبة إدارة الاحتياجات.",
    },
  ],
  resultTitle: "نتيجة السيناريو السيئ",
  resultStatus: "تم تحقيق الهدف مع ضغط مالي مرتفع",
  resultText:
    "ستتمكن من إكمال سداد التمويل، لكن ثبات راتبك مع زيادة المصروفات قد يجعل إدارة احتياجاتك الأساسية والطوارئ أكثر صعوبة خلال السنتين الأخيرتين.",
};

export const offers = [
  {
    id: "afaq",
    name: "بنك أفق",
    badge: "الأنسب لوضعك",
    tagline: "توازن بين القسط والتكلفة",
    apr: 4.1,
    monthlyInstallment: 2850,
    totalCost: 21000,
    deductionRate: 23.8,
    monthlyRemaining: 3150,
    duration: 5,
    adminFees: 1500,
    safetyLevel: "caution" as const,
    safetyLabel: "مقبول مع الحذر",
    conditions: [
      "تحويل الراتب",
      "حد أدنى للراتب 6,000 ريال",
      "مدة خدمة لا تقل عن 3 أشهر",
    ],
    insight: "الأكثر توازنًا. قد يتأثر إذا زادت مصروفاتك دون زيادة الراتب.",
    miniTimeline: [
      { label: "البداية", remaining: 3150, status: "caution" as const },
      { label: "المنتصف", remaining: 3250, status: "safe" as const },
      { label: "النهاية", remaining: 3450, status: "safe" as const },
    ],
  },
  {
    id: "rushd",
    name: "مصرف رُشد",
    badge: "الأقل تكلفة",
    tagline: "تكلفة أقل، قسط أعلى",
    apr: 3.8,
    monthlyInstallment: 3250,
    totalCost: 6000,
    deductionRate: 27.1,
    monthlyRemaining: 2750,
    duration: 4,
    adminFees: 1000,
    safetyLevel: "caution" as const,
    safetyLabel: "مقبول مع الحذر",
    conditions: [
      "تحويل الراتب",
      "حد أدنى للراتب 5,000 ريال",
      "مدة خدمة لا تقل عن 6 أشهر",
    ],
    insight: "توفّر في التكلفة الإجمالية، لكن القسط الأعلى يقلّل مرونتك الشهرية.",
    miniTimeline: [
      { label: "البداية", remaining: 2750, status: "caution" as const },
      { label: "المنتصف", remaining: 2850, status: "caution" as const },
      { label: "النهاية", remaining: 3100, status: "safe" as const },
    ],
  },
  {
    id: "rawafid",
    name: "بنك روافد",
    badge: "الأقل قسطًا",
    tagline: "قسط أخف، مدة أطول",
    apr: 4.5,
    monthlyInstallment: 2600,
    totalCost: 37200,
    deductionRate: 21.7,
    monthlyRemaining: 3400,
    duration: 6,
    adminFees: 1800,
    safetyLevel: "safe" as const,
    safetyLabel: "آمن",
    conditions: [
      "تحويل الراتب",
      "حد أدنى للراتب 5,000 ريال",
      "مدة خدمة لا تقل عن 3 أشهر",
    ],
    insight: "أكثر راحة شهريًا، لكن التكلفة الإجمالية أعلى بسبب المدة الأطول.",
    miniTimeline: [
      { label: "البداية", remaining: 3400, status: "safe" as const },
      { label: "المنتصف", remaining: 3300, status: "safe" as const },
      { label: "النهاية", remaining: 3100, status: "safe" as const },
    ],
  },
];
