import { apiRequest } from './api';
import { authenticatedRequest } from './auth.service';

export type Testimonial = {
    id: string;
    nameAr: string;
    nameEn: string;
    gender: string;
    commentAr: string;
    commentEn: string;
    createdAt: string;
    updatedAt: string;
};

type TestimonialInput = Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>;
type ApiResponse = { data: Testimonial[]; success: boolean };
type ItemResponse = { data: Testimonial; success: boolean };

export function fetchTestimonials() {
    return apiRequest<ApiResponse>('testimonials');
}

export function createTestimonial(data: TestimonialInput) {
    return authenticatedRequest<ItemResponse>('testimonials', { method: 'POST', body: data });
}

export function updateTestimonial(id: string, data: Partial<TestimonialInput>) {
    return authenticatedRequest<ItemResponse>(`testimonials/${id}`, { method: 'PATCH', body: data });
}

export function deleteTestimonial(id: string) {
    return authenticatedRequest<void>(`testimonials/${id}`, { method: 'DELETE' });
}