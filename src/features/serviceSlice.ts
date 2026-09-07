import { createService, deleteService, fetchServices, updateService, type Service, type ServiceInput } from "@/services/services.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type initialStatype = {
    services: Service[],
    service: Service | undefined,
    isLoading: boolean,
    hasLoaded: boolean,
    error: string | null
}

const initialState: initialStatype = {
    services: [],
    service: undefined,
    isLoading: false,
    hasLoaded: false,
    error: null
}

export const getServices = createAsyncThunk('services/getServices', async(_, { rejectWithValue }) => {
    try {
        return await fetchServices();
    } catch(err) {
        return rejectWithValue(err instanceof Error ? err.message : "Unable to load Services.")
    }
}) 

export const postService = createAsyncThunk('services/post', async (data: ServiceInput, { rejectWithValue }) => {
    try { return await createService(data); }
    catch (error) { return rejectWithValue(error instanceof Error ? error.message : 'Unable to create service.'); }
});

export const patchService = createAsyncThunk('services/patch', async ({ id, data }: { id: string; data: Partial<ServiceInput> }, { rejectWithValue }) => {
    try { return await updateService(id, data); }
    catch (error) { return rejectWithValue(error instanceof Error ? error.message : 'Unable to update service.'); }
});

export const deleteServiceById = createAsyncThunk('services/delete', async (id: string, { rejectWithValue }) => {
    try { await deleteService(id); return id; }
    catch (error) { return rejectWithValue(error instanceof Error ? error.message : 'Unable to delete service.'); }
});

const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        getServiceById: (state, action) => {
            state.service = state.services.find(item => item.id == action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getServices.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.services = action.payload;
                state.isLoading = false;
                state.hasLoaded = true;
            })
            .addCase(getServices.rejected, (state, action) => {
                state.isLoading = false;
                state.error = typeof action.payload === "string" ? action.payload : "Unable to load services.";
            })
            .addCase(postService.rejected, (state, action) => {
                state.error = typeof action.payload === "string" ? action.payload : "Unable to create service.";
            })
            .addCase(postService.fulfilled, (state, action) => {
                state.services.unshift(action.payload.data);
            })
            .addCase(patchService.rejected, (state, action) => {
                state.error = typeof action.payload === "string" ? action.payload : "Unable to update service.";
            })
            .addCase(patchService.fulfilled, (state, action) => {
                const index = state.services.findIndex((item) => item.id === action.payload.data.id);
                if (index >= 0) state.services[index] = action.payload.data;
                if (state.service?.id === action.payload.data.id) state.service = action.payload.data;
            })
            .addCase(deleteServiceById.rejected, (state, action) => {
                state.error = typeof action.payload === "string" ? action.payload : "Unable to delete service.";
            })
            .addCase(deleteServiceById.fulfilled, (state, action) => {
                state.services = state.services.filter((item) => item.id !== action.payload);
                if (state.service?.id === action.payload) state.service = undefined;
            });
    },
});

export const { getServiceById } = serviceSlice.actions;
export default serviceSlice.reducer;
