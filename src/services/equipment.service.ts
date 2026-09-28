import { apiRequest } from "./api";
import { authenticatedRequest } from "./auth.service";

/** Category values are accepted by the API's case-insensitive category filter. */
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

export type ArabicEquipmentCategory = Omit<EquipmentCategory, "id"> & {
    id: EquipmentCategoryId;
    label: string;
};

export type Equipment = {
    id: string;
    name: string;
    nameAr: string;
    nameEn: string;
    description: string;
    descriptionAr: string;
    descriptionEn: string;
    category: string | null;
    categoryAr: string;
    categoryEn: string;
    pricePerDay: number;
    imageUrl?: string;
    inStock?: boolean;
};

export type EquipmentFilters = {
    page: number;
    limit: number;
    category: EquipmentCategoryId | null;
    search: string;
    minPrice: number | null;
    maxPrice: number | null;
};

export type EquipmentPagination = {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

export type EquipmentListResponse = {
    data: Equipment[];
    pagination: EquipmentPagination;
};

export type EquipmentCreateInput = {
    nameAr: string;
    nameEn: string;
    descriptionAr: string;
    descriptionEn: string;
    categoryAr: string;
    categoryEn: string;
    price: number;
    equipmentImg: File;
    available?: boolean;
};

export type EquipmentUpdateInput = Partial<Omit<EquipmentCreateInput, "equipmentImg">> & {
    equipmentImg?: File;
};

type EquipmentApiItem = {
    id: string | number;
    nameAr: string;
    nameEn: string;
    descriptionAr: string;
    descriptionEn: string;
    categoryAr: string;
    categoryEn: string;
    price: number | string;
    imgUrl?: string | null;
    available: boolean;
};

type EquipmentResponse = {
    success: boolean;
    data: {
        items: EquipmentApiItem[]; 
        pagination: Pick<EquipmentPagination, "page" | "limit" | "total" | "pages">
    };
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

export const arabicCategoryLabels: Record<EquipmentCategoryId, string> = {
    "Mobility & Rehabilitation": "التنقل وإعادة التأهيل",
    "Respiratory Equipment": "معدات الجهاز التنفسي",
    "Patient Beds & Supplies": "أسرة ومستلزمات المرضى",
    "Monitoring Devices": "أجهزة المراقبة",
    "Home ICU & Critical Care": "العناية المركزة المنزلية والرعاية الحرجة",
    "Daily Care Supplies": "مستلزمات الرعاية اليومية",
    "Post-Surgery Recovery": "التعافي بعد الجراحة",
    "Diagnostic Equipment": "أجهزة التشخيص",
};

/** Arabic labels retain the English category value so requests use the API identifiers. */
export const arabicEquipmentCategories: readonly ArabicEquipmentCategory[] = categories.map((category) => ({
    id: category,
    label: arabicCategoryLabels[category],
    icon: categoryIcons[category],
}));

const numberValue = (value: number | string | null | undefined) => {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
};

/** Maps the backend's bilingual equipment model to the Arabic UI model. */
export const mapEquipment = (equipment: EquipmentApiItem): Equipment => ({
    id: String(equipment.id),
    name: equipment.nameAr,
    nameAr: equipment.nameAr,
    nameEn: equipment.nameEn,
    description: equipment.descriptionAr,
    descriptionAr: equipment.descriptionAr,
    descriptionEn: equipment.descriptionEn,
    category: equipment.categoryEn || equipment.categoryAr || null,
    categoryAr: equipment.categoryAr,
    categoryEn: equipment.categoryEn,
    pricePerDay: numberValue(equipment.price),
    imageUrl: equipment.imgUrl ?? undefined,
    inStock: equipment.available,
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

    if (category) 
        query.set("category", category);

    if (search.trim()) 
        query.set("search", search.trim());

    if(maxPrice || minPrice) {
        query.set("minPrice", String(minPrice));
        query.set("maxPrice", String(maxPrice));
    }

    return query.toString();
};

/** Retrieves a filtered, paginated equipment listing from GET /api/equipment. */
export async function fetchEquipments(filters: EquipmentFilters): Promise<{success: boolean;data: {items: Equipment[];pagination: EquipmentPagination;}}> {
    const query = buildEquipmentQuery(filters);
    const response = await apiRequest<EquipmentResponse>(`/equipment?${query}`);
    const { page, pages, ...pagination } = response.data.pagination;

    return {
        ...response,
        data: {
            items: response.data.items.map(mapEquipment),
            pagination: {
                ...response.data.pagination,
                page,
                pages,
                hasNextPage: page < pages,
                hasPreviousPage: page > 1,
                ...pagination,
            },
        },
    };
}

/** Retrieves one equipment item from GET /api/equipment/:id. */
export async function fetchEquipmentById(id: string): Promise<{success: boolean; data: Equipment}> {
    const response = await apiRequest<{success: boolean; data: EquipmentApiItem}>(`/equipment/${id}`);
    return { ...response, data: mapEquipment(response.data) };
}

const equipmentFormData = (equipment: EquipmentCreateInput | EquipmentUpdateInput) => {
    const formData = new FormData();

    Object.entries(equipment).forEach(([field, value]) => {
        if (value !== undefined)
            formData.append(field, value instanceof File ? value : String(value));
    });

    return formData;
};

/** Creates equipment for the authenticated admin panel. */
export async function createEquipment(equipment: EquipmentCreateInput): Promise<Equipment> {
    const response = await authenticatedRequest<{success: boolean; data: EquipmentApiItem}>("/equipment", {
        method: "POST",
        body: equipmentFormData(equipment),
    });

    return mapEquipment(response.data);
}

/** Updates equipment for the authenticated admin panel. */
export async function updateEquipment(id: string, equipment: EquipmentUpdateInput): Promise<Equipment> {
    const response = await authenticatedRequest<{success: boolean; data: EquipmentApiItem}>(`/equipment/${id}`, {
        method: "PATCH",
        body: equipmentFormData(equipment),
    });

    return mapEquipment(response.data);
}

/** Deletes equipment for the authenticated admin panel. */
export function deleteEquipment(id: string) {
    return authenticatedRequest<void>(`/equipment/${id}`, { method: "DELETE" });
}
