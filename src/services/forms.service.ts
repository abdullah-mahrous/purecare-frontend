import { apiRequest } from './api';
import { authenticatedRequest } from './auth.service';
import type { ReservationFormFields } from '../utils/validation/reservationSchema';
import type { CareerFormFields } from '../utils/validation/careerSchema';

export function submitReservationForm(body: ReservationFormFields) {
	return apiRequest<void>('/reservations', {
		method: 'POST',
		body: { ...body, desiredDate: new Date(body.desiredDate).toISOString() },
	});
}

export function fetchReservations() {
	return authenticatedRequest('/reservations');
}

export function fetchCareers() {
	return authenticatedRequest('/careers');
}

export function submitCareerForm(body: CareerFormFields) {
	// Careers accepts multipart data because it includes uploaded documents.
	const formData = new FormData();

	Object.entries(body).forEach(([name, value]) => {
		if (Array.isArray(value))
			value.forEach(file => formData.append(name, file instanceof File ? file : String(file)));
		else if (value !== undefined)
			formData.append(name, String(value));
	});

	return apiRequest<void>('/careers', { method: 'POST', body: formData });
}

export function deleteCareer(id: string) {
	return authenticatedRequest<void>(`/careers/${id}`, { method: 'DELETE' });
}
