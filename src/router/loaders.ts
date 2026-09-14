import { redirect } from 'react-router'
import { store } from '@/app/store'
import { getFaqs } from '@/features/faqSlice';
import { getServiceById, getServices } from '@/features/serviceSlice'
import { getTestimonials } from '@/features/testimonialSlice';
import { getWebsiteGeneralData } from '@/features/websiteGeneralDataSlice'
import { getEquipmentById, getEquipments, selectEquipment } from '@/features/equipmentSlice'
import type { LoaderFunctionArgs } from 'react-router'

export const minimumDelay = (ms: number) =>
    new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
});

export async function loadWebsiteEssentials() {
    if(store.getState().services.services.length === 0 || store.getState().websiteGeneralData.currentRequestId)
        await Promise.all([
            store.dispatch(getWebsiteGeneralData()),
            
            store.getState().services.services.length === 0
                ? store.dispatch(getServices())
                : Promise.resolve(),

            minimumDelay(2000),
        ]);
}

export async function homeLoader() {
    if(store.getState().faqs.data.length === 0 || store.getState().testimonials.data.length === 0)
        await Promise.all([
            store.getState().faqs.data.length === 0
                ? store.dispatch(getFaqs())
                : Promise.resolve(),

            store.getState().testimonials.data.length === 0
                ? store.dispatch(getTestimonials())
                : Promise.resolve(),

            minimumDelay(2000),
        ]);
}

export async function serviceLoader({ params }: LoaderFunctionArgs) {
    const serviceId = params.serviceId;

    if (!serviceId)
        return null;

    if(store.getState().services.services.length === 0)
        await Promise.all([
            store.dispatch(getServices()),
            minimumDelay(2000),
        ]);

    store.dispatch(getServiceById(serviceId));
    
    // to redirect to not found page if the service is not found
    if (!store.getState().services.service)
        throw redirect('/not-found');
}

export async function equipmentsLoader() {
    if(store.getState().equipment.data.length === 0)
        await Promise.all([
            store.getState().equipment.data.length === 0
                ? store.dispatch(getEquipments())
                : Promise.resolve(),

            minimumDelay(2000),
        ]);
}

export async function equipmentDetailsLoader({ params }: LoaderFunctionArgs) {
    const equipmentId = params.equipmentId;

    if (!equipmentId)
        return null;

    store.dispatch(selectEquipment(equipmentId));

    if (!store.getState().equipment.equipment)
        await Promise.all([
            store.dispatch(getEquipmentById(equipmentId)),
            minimumDelay(2000),
        ]);

    // to redirect to not found page if the equipment is not found
    if (!store.getState().equipment.equipment)
        throw redirect('/not-found');
}