import { apiRequest } from "./api";

/** Category values are shared by the UI and the equipment API. */
export const categories = [
    "Mobility & Rehabilitation",
    "Respiratory Equipment",
    "Patient Beds & Supplies",
    "Monitoring Devices",
    "Home ICU & Critical Care",
    "Daily Care Supplies",
    "Post-Surgery Recovery",
    "Diagnostic Equipment",
] as const;

export type EquipmentCategoryId = (typeof categories)[number];

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
    | "stethoscope"
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
    category: EquipmentCategoryId | null;
    pricePerDay: number;
    imageUrl?: string;
    inStock?: boolean;
};

export type EquipmentFilters = {
    page: number;
    limit: number;
    category: EquipmentCategoryId | null;
    search: string;
    minPrice: number;
    maxPrice: number;
};

export type EquipmentPagination = {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

export type EquipmentListResponse = {
    data: Equipment[];
    pagination: EquipmentPagination;
};

type EquipmentApiItem = {
    id: string | number;
    name: string;
    description?: string | null;
    category?: EquipmentCategoryId | null;
    price?: number | string | null;
    pricePerDay?: number | string | null;
    price_per_day?: number | string | null;
    imageUrl?: string | null;
    image_url?: string | null;
    image?: string | null;
    inStock?: boolean;
    in_stock?: boolean;
};

type EquipmentApiResponse = {
    data: EquipmentApiItem[];
    pagination: EquipmentPagination;
};

const categoryIcons: Record<EquipmentCategoryId, EquipmentIconName> = {
    "Mobility & Rehabilitation": "wheelchair",
    "Respiratory Equipment": "lungs",
    "Patient Beds & Supplies": "hospital-bed",
    "Monitoring Devices": "patient-monitor",
    "Home ICU & Critical Care": "heart",
    "Daily Care Supplies": "commode-chair",
    "Post-Surgery Recovery": "walker",
    "Diagnostic Equipment": "stethoscope",
};

export const equipmentCategories: readonly EquipmentCategory[] = [
    { id: "all", label: "All categories", icon: "grid" },
    ...categories.map((category) => ({
        id: category,
        label: category,
        icon: categoryIcons[category],
    })),
];

const numberValue = (value: number | string | null | undefined) => {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
};

/** Maps API field naming variations to the listing model used by the UI. */
export const mapEquipment = (equipment: EquipmentApiItem): Equipment => ({
    id: String(equipment.id),
    name: equipment.name,
    description: equipment.description ?? "",
    category: equipment.category ?? null,
    pricePerDay: numberValue(equipment.pricePerDay ?? equipment.price_per_day ?? equipment.price),
    imageUrl: equipment.imageUrl ?? equipment.image_url ?? equipment.image ?? undefined,
    inStock: equipment.inStock ?? equipment.in_stock,
});

export const mapEquipmentResponse = (response: EquipmentApiResponse): EquipmentListResponse => ({
    data: response.data.map(mapEquipment),
    pagination: response.pagination,
});

export const buildEquipmentQuery = ({
    page,
    limit,
    category,
    search,
    minPrice,
    maxPrice,
}: EquipmentFilters) => {
    const query = new URLSearchParams({ page: String(page), limit: String(limit) });

    if (category) query.set("category", category);
    if (search.trim()) query.set("search", search.trim());
    query.set("minPrice", String(minPrice));
    query.set("maxPrice", String(maxPrice));

    return query.toString();
};

/** Retrieves a filtered, paginated equipment listing from GET /api/equipment. */
export async function getEquipment(filters: EquipmentFilters): Promise<EquipmentListResponse> {
    const query = buildEquipmentQuery(filters);
    // const response = await apiRequest<EquipmentApiResponse>(`/equipment?${query}`);
    const response = equipmentItems;
    // return mapEquipmentResponse(response);
    return mapEquipmentResponse({data:response, pagination: {page: 1,
    limit: 10,
    totalItems: 50,
    totalPages: 5,
    hasNextPage: true,
    hasPreviousPage: false}});
}

/** Temporary listing data retained for local development until the rental endpoint is available. */
export const equipmentItems: Equipment[] = [
    { id: "wheelchair", name: "كرسي متحرك", description: "كرسي مريح وقابل للطي لتسهيل الحركة اليومية.", category: "Mobility & Rehabilitation", pricePerDay: 120, imageUrl: '/src/assets/ox.avif', inStock: true },
    { id: "electric-hospital-bed", name: "سرير طبي كهربائي", description: "سرير قابل للتعديل لراحة المريض وسلامته في المنزل.", category: "Patient Beds & Supplies", pricePerDay: 250, imageUrl: "/src/assets/nebulizer.webp" },
    { id: "oxygen-concentrator", name: "جهاز تركيز الأكسجين", description: "دعم أكسجين موثوق لتحسين التنفس براحة أكبر.", category: "Respiratory Equipment", pricePerDay: 300, imageUrl: "/src/assets/ox.avif", inStock: true },
    { id: "nebulizer", name: "جهاز نيبولايزر", description: "جهاز عملي للمساعدة في جلسات العلاج التنفسي.", category: "Respiratory Equipment", pricePerDay: 90, imageUrl: "/src/assets/ox.avif" },
    { id: "walker", name: "مشاية", description: "مشاية ثابتة تساعد على التوازن والحركة بأمان.", category: "Mobility & Rehabilitation", pricePerDay: 80, imageUrl: "/src/assets/ox.avif" },
    { id: "patient-monitor", name: "جهاز مراقبة المرضى", description: "لمتابعة العلامات الحيوية مثل النبض والتنفس والأكسجين.", category: "Monitoring Devices", pricePerDay: 200, imageUrl: "/src/assets/ox.avif" },
    { id: "commode-chair", name: "كرسي حمام طبي", description: "كرسي مريح يساعد في العناية اليومية بالمريض.", category: "Daily Care Supplies", pricePerDay: 100, imageUrl: "/src/assets/ox.avif" },
    { id: "air-mattress", name: "مرتبة هوائية طبية", description: "تساعد على راحة المريض وتحسين وضعية النوم.", category: "Patient Beds & Supplies", pricePerDay: 150, imageUrl: "/src/assets/ox.avif" },
    { id: "suction-machine", name: "جهاز شفط", description: "قوة شفط مناسبة للمساعدة في تنظيف مجرى التنفس.", category: "Home ICU & Critical Care", pricePerDay: 180, imageUrl: "/src/assets/ox.avif" },
];
