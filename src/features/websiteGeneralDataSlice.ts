import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    fetchWebsiteGeneralData,
    updateWebsiteGeneralData,
    type WebsiteGeneralData,
} from '@/services/websiteGeneralData.service';

type WebsiteGeneralDataState = WebsiteGeneralData & { isLoading: boolean; hasLoaded: boolean; error: string | null };

const initialState: WebsiteGeneralDataState = {
    emergencyNumber: '+201212900739',
    phoneNumber: '+201556585858',
    whatsappNumber: '+201556585858',
    facebook: 'https://www.facebook.com/profile.php?id=100066652914958',
    instagram: 'https://www.instagram.com/pure_care33',
    tiktook: 'https://www.tiktok.com/@pure.care1?_t=8kB7etXVrEL&_r=1',
    introVideoUrl: 'https://res.cloudinary.com/qewabr3c/video/upload/v1788440079/purecare/trdctr63qpwygas4lrzb.mp4',
    isLoading: false,
    hasLoaded: false,
    error: null,
    currentRequestId: undefined,
};

const getError = (error: unknown, fallback: string) => error instanceof Error ? error.message : fallback;

export const getWebsiteGeneralData = createAsyncThunk('websiteGeneralData/get', fetchWebsiteGeneralData);

export const patchWebsiteGeneralData = createAsyncThunk(
    'websiteGeneralData/patch',
    async (data: Partial<WebsiteGeneralData>, { rejectWithValue }) => {
        try {
            return await updateWebsiteGeneralData(data);
        } catch (error) {
            return rejectWithValue(getError(error, 'Unable to update website general data.'));
        }
    },
);

const websiteGeneralDataSlice = createSlice({
    name: 'websiteGeneralData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWebsiteGeneralData.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(getWebsiteGeneralData.fulfilled, (state, action) => {
                Object.assign(state, action.payload.data);
                state.isLoading = false;
                state.hasLoaded = true;
            })
            .addCase(getWebsiteGeneralData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = getError(action.error, 'Unable to load website general data.');
            })
            .addCase(patchWebsiteGeneralData.fulfilled, (state, action) => {
                Object.assign(state, action.payload.data);
                state.isLoading = false;
            })
            .addCase(patchWebsiteGeneralData.rejected, (state, action) => {
                state.error = typeof action.payload === 'string' ? action.payload : 'Unable to update website general data.';
            });
    },
});

export default websiteGeneralDataSlice.reducer;
