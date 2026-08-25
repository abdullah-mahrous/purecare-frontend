/**
 * Temporary listing data that mirrors the shape expected from the equipment API.
 * Replace this array with the API mapper when the rental endpoint is available.
 */
export type EquipmentCategoryId =
    | "mobility"
    | "respiratory"
    | "patient-care"
    | "monitoring"
    | "other";

export type EquipmentIconName =
    | "grid"
    | "wheelchair"
    | "hospital-bed"
    | "oxygen-concentrator"
    | "nebulizer"
    | "walker"
    | "patient-monitor"
    | "commode-chair"
    | "air-mattress"
    | "suction-machine"
    | "lungs"
    | "heart"
    | "more";

export type EquipmentCategory = {
    id: "all" | EquipmentCategoryId;
    label: string;
    icon: EquipmentIconName;
};

export type Equipment = {
    id: string;
    name: string;
    description: string;
    category: EquipmentCategoryId;
    pricePerDay: number;
    icon: EquipmentIconName;
};

export const equipmentCategories: readonly EquipmentCategory[] = [
    { id: "all", label: "الكل", icon: "grid" },
    { id: "mobility", label: "أدوات الحركة", icon: "wheelchair" },
    { id: "respiratory", label: "أجهزة التنفس", icon: "lungs" },
    { id: "patient-care", label: "عناية بالمرضى", icon: "heart" },
    { id: "monitoring", label: "أجهزة مراقبة", icon: "patient-monitor" },
    { id: "other", label: "أخرى", icon: "more" },
];

export const equipmentItems: readonly Equipment[] = [
    {
        id: "wheelchair",
        name: "كرسي متحرك",
        description: "كرسي مريح وقابل للطي لتسهيل الحركة اليومية.",
        category: "mobility",
        pricePerDay: 120,
        icon: "wheelchair",
    },
    {
        id: "electric-hospital-bed",
        name: "سرير طبي كهربائي",
        description: "سرير قابل للتعديل لراحة المريض وسلامته في المنزل.",
        category: "patient-care",
        pricePerDay: 250,
        icon: "hospital-bed",
    },
    {
        id: "oxygen-concentrator",
        name: "جهاز تركيز الأكسجين",
        description: "دعم أكسجين موثوق لتحسين التنفس براحة أكبر.",
        category: "respiratory",
        pricePerDay: 300,
        icon: "oxygen-concentrator",
    },
    {
        id: "nebulizer",
        name: "جهاز نيبولايزر",
        description: "جهاز عملي للمساعدة في جلسات العلاج التنفسي.",
        category: "respiratory",
        pricePerDay: 90,
        icon: "nebulizer",
    },
    {
        id: "walker",
        name: "مشاية",
        description: "مشاية ثابتة تساعد على التوازن والحركة بأمان.",
        category: "mobility",
        pricePerDay: 80,
        icon: "walker",
    },
    {
        id: "patient-monitor",
        name: "جهاز مراقبة المرضى",
        description: "لمتابعة العلامات الحيوية مثل النبض والتنفس والأكسجين.",
        category: "monitoring",
        pricePerDay: 200,
        icon: "patient-monitor",
    },
    {
        id: "commode-chair",
        name: "كرسي حمام طبي",
        description: "كرسي مريح يساعد في العناية اليومية بالمريض.",
        category: "patient-care",
        pricePerDay: 100,
        icon: "commode-chair",
    },
    {
        id: "air-mattress",
        name: "مرتبة هوائية طبية",
        description: "تساعد على راحة المريض وتحسين وضعية النوم.",
        category: "patient-care",
        pricePerDay: 150,
        icon: "air-mattress",
    },
    {
        id: "suction-machine",
        name: "جهاز شفط",
        description: "قوة شفط مناسبة للمساعدة في تنظيف مجرى التنفس.",
        category: "respiratory",
        pricePerDay: 180,
        icon: "suction-machine",
    },
];
