import { store } from '@/app/store'
import { getFaqs } from '@/features/faqSlice';
import { getServices } from '@/features/serviceSlice'
import { getTestimonials } from '@/features/testimonialSlice';
import { getWebsiteGeneralData } from '@/features/websiteGeneralDataSlice'
import { getEquipmentById, getEquipments, selectEquipment } from '@/features/equipmentSlice'
import type { LoaderFunctionArgs } from 'react-router'

export async function loadWebsiteEssentials() {
    await store.dispatch(getWebsiteGeneralData());
    
    if(store.getState().services.services.length === 0)
        await store.dispatch(getServices());
}

export async function homeLoader() {
    if(store.getState().faqs.data.length === 0)
        await store.dispatch(getFaqs());

    if(store.getState().testimonials.data.length === 0)
        await store.dispatch(getTestimonials());
}

export async function equipmentsLoader() {
    try {
        if(store.getState().equipment.data.length === 0)
            await store.dispatch(getEquipments()).unwrap();
    } catch (error) {
        console.error('Error loading equipments page data:', error);
        return null;
    }
}

export async function equipmentDetailsLoader({ params }: LoaderFunctionArgs) {
    const equipmentId = params.equipmentId;

    if (!equipmentId)
        return null;

    store.dispatch(selectEquipment(equipmentId));

    if (!store.getState().equipment.equipment)
        return store.dispatch(getEquipmentById(equipmentId));
}