import { fetchServices, type Service } from "@/services/services.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type initialStatype = {
    services: Service[],
    service: Service | undefined,
    isLoading: boolean,
    error: string | null
}

const initialState: initialStatype = {
    services: [],
    service: undefined,
    isLoading: false,
    error: null
}

export const getServices = createAsyncThunk('services/getServices', async(_, { rejectWithValue }) => {
    try {
        return await fetchServices();
    } catch(err) {
        return rejectWithValue(err instanceof Error ? err.message : "Unable to load Services.")
    }
}) 

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
            })
            .addCase(getServices.rejected, (state, action) => {
                state.isLoading = false;
                state.error = typeof action.payload === "string" ? action.payload : "Unable to load services.";
            });
    },
});

export const { getServiceById } = serviceSlice.actions;
export default serviceSlice.reducer;