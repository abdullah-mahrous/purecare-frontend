import { apiRequest } from './api';
import { authenticatedRequest } from './auth.service';

export type Faq = {
    id: string;
    questionAr: string;
    questionEn: string;
    answerAr: string;
    answerEn: string;
    createdAt: string;
    updatedAt: string;
};

export type FaqInput = Omit<Faq, 'id' | 'createdAt' | 'updatedAt'> & { serviceId?: string };
type ApiResponse = { data: Faq[]; success: boolean };
type ItemResponse = { data: Faq; success: boolean };

export function fetchFaqs() {
    return apiRequest<ApiResponse>('/faqs');
}

export function createFaq(data: FaqInput) {
    return authenticatedRequest<ItemResponse>('/faqs', { method: 'POST', body: data });
}

export function updateFaq(id: string, data: Partial<Omit<FaqInput, 'serviceId'>>) {
    return authenticatedRequest<ItemResponse>(`/faqs/${id}`, { method: 'PATCH', body: data });
}

export function deleteFaq(id: string) {
    return authenticatedRequest<void>(`/faqs/${id}`, { method: 'DELETE' });
}
