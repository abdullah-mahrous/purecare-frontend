import { apiRequest } from './api';
import { authenticatedRequest } from './auth.service';

export type WebsiteGeneralData = {
    emergencyNumber: string;
    phoneNumber: string;
    whatsappNumber: string;
    facebook: string;
    instagram: string;
    tiktook: string;
    introVideoUrl: string;
    currentRequestId?: string;
};

type WebsiteGeneralDataApi = Omit<WebsiteGeneralData, 'facebook' | 'instagram' | 'tiktook'> & {
    facebookUrl?: string | null;
    instagramUrl?: string | null;
    tiktokUrl?: string | null;
};

type ApiResponse = { data: WebsiteGeneralDataApi; success: boolean };
type UploadResponse = { data: { url: string }; success: boolean };

const fromApi = (data: WebsiteGeneralDataApi): WebsiteGeneralData => ({
    ...data,
    facebook: data.facebookUrl ?? '',
    instagram: data.instagramUrl ?? '',
    tiktook: data.tiktokUrl ?? '',
});

const toApi = ({ facebook, instagram, tiktook, ...data }: Partial<WebsiteGeneralData>): Partial<WebsiteGeneralDataApi> => ({
    ...data,
    ...(facebook !== undefined && { facebookUrl: facebook }),
    ...(instagram !== undefined && { instagramUrl: instagram }),
    ...(tiktook !== undefined && { tiktokUrl: tiktook }),
});

export async function fetchWebsiteGeneralData() {
    const response = await apiRequest<ApiResponse>('/website-general-data');
    return { ...response, data: fromApi(response.data) };
}

export async function updateWebsiteGeneralData(data: Partial<WebsiteGeneralData>) {
    const response = await authenticatedRequest<ApiResponse>('/website-general-data', {
        method: 'PATCH',
        body: toApi(data),
    });
    return { ...response, data: fromApi(response.data) };
}

export async function uploadIntroVideo(file: File, mediaUrl?: string) {
    const formData = new FormData();
    formData.append('file', file);
    if (mediaUrl) formData.append('mediaUrl', mediaUrl);

    return authenticatedRequest<UploadResponse>('/uploads', {
        method: 'POST',
        body: formData,
    });
}
