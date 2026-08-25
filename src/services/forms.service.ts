import { apiRequest } from './api';
import type { ReservationFormFields } from '../utils/validation/reservationSchema';
import type { CareerFormFields } from '../utils/validation/careerSchema';

export function submitReservationForm(body: ReservationFormFields) {
	return apiRequest<void>('/reservations', { method: 'POST', body });
}

export function submitCareerForm(body: CareerFormFields) {
	const formData = new FormData();

	Object.entries(body).forEach(([name, value]) => {
		if (Array.isArray(value))
			value.forEach(file => formData.append(name, file));
		else if (value !== undefined)
			formData.append(name, String(value));
	});

	return apiRequest<void>('/careers', { method: 'POST', body: formData });
}