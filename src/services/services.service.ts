import { apiRequest } from "./api.ts";
import { authenticatedRequest } from './auth.service';
import { type Faq } from './faq.service';

export type ServiceDetails = {
    id: string;
    serviceId: string;
    iconUrl: string;
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
};

export type ServiceInput = Omit<Service, 'id' | 'imgUrl' | 'createdAt' | 'updatedAt' | 'targeted' | 'included' | 'faqs'> & { serviceImg?: File };
export type ServiceDetailsInput = Omit<ServiceDetails, 'id' | 'serviceId' | 'iconUrl'> & { icon?: File };

type ItemResponse<T> = { data: T; success: boolean };

export type Service = {
    id: string;
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
    imgUrl: string;
    rate: number;
    customersCount: number;
    responseTime: string;
    createdAt: string;
    updatedAt: string;
    targeted: ServiceDetails[];
    included: ServiceDetails[];
    faqs: Faq[];
};

export async function fetchServices() {
    const response = await apiRequest<{ data: Service[], success: string }>('services');

    return response.data;
}

const asFormData = (data: Record<string, unknown>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '')
            formData.append(key, value instanceof File ? value : String(value));
    });

    return formData;
};

export function createService(data: ServiceInput) {
    return authenticatedRequest<ItemResponse<Service>>('/services', { method: 'POST', body: asFormData(data) });
}

export function updateService(id: string, data: Partial<ServiceInput>) {
    return authenticatedRequest<ItemResponse<Service>>(`/services/${id}`, { method: 'PATCH', body: asFormData(data) });
}

export function deleteService(id: string) {
    return authenticatedRequest<void>(`/services/${id}`, { method: 'DELETE' });
}

const childEndpoint = (serviceId: string, type: 'included-services' | 'targeted-customers', id?: string) =>
    `/services/${serviceId}/${type}${id ? `/${id}` : ''}`;

export function createServiceDetail(serviceId: string, type: 'included-services' | 'targeted-customers', data: ServiceDetailsInput) {
    return authenticatedRequest<ItemResponse<ServiceDetails>>(childEndpoint(serviceId, type), { method: 'POST', body: asFormData(data) });
}

export function updateServiceDetail(serviceId: string, type: 'included-services' | 'targeted-customers', id: string, data: Partial<ServiceDetailsInput>) {
    return authenticatedRequest<ItemResponse<ServiceDetails>>(childEndpoint(serviceId, type, id), { method: 'PATCH', body: asFormData(data) });
}

export function deleteServiceDetail(serviceId: string, type: 'included-services' | 'targeted-customers', id: string) {
    return authenticatedRequest<void>(childEndpoint(serviceId, type, id), { method: 'DELETE' });
}
