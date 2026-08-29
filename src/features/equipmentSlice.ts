import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../app/store";
import {
    fetchEquipments,
    type Equipment,
    type EquipmentCategoryId,
    type EquipmentFilters,
    type EquipmentPagination,
} from "../services/equipment.service";

type EquipmentState = {
    data: Equipment[];
    equipment: Equipment | undefined;
    filters: EquipmentFilters;
    pagination: EquipmentPagination;
    isLoading: boolean;
    error: string | null;
    currentRequestId?: string;
};

const initialState: EquipmentState = {
    data: [],
    equipment: undefined,
    filters: { page: 1, limit: 12, category: null, search: "", minPrice: 0, maxPrice: 1000 },
    pagination: { page: 1, limit: 12, totalItems: 0, totalPages: 0, hasNextPage: false, hasPreviousPage: false },
    isLoading: false,
    error: null,
};

export const getEquipments = createAsyncThunk(
    "equipment/getEquipment",
    async (_, { getState, rejectWithValue }) => {
        try {
            return await fetchEquipments((getState() as RootState).equipment.filters);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unable to load equipment.");
        }
    },
);

const equipmentSlice = createSlice({
    name: "equipment",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.filters.page = action.payload;
        },
        setCategory: (state, action: PayloadAction<EquipmentCategoryId | null>) => {
            state.filters.category = action.payload;
            state.filters.page = 1;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.filters.search = action.payload;
            state.filters.page = 1;
        },
        setPriceRange: (state, action: PayloadAction<[number, number]>) => {
            const [minPrice, maxPrice] = action.payload;
            state.filters.minPrice = minPrice;
            state.filters.maxPrice = maxPrice;
            state.filters.page = 1;
        },
        getEquipmentById: (state, action: PayloadAction<string>) => {
            state.equipment = state.data.find(item => item.id == action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEquipments.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
                state.currentRequestId = action.meta.requestId;
            })
            .addCase(getEquipments.fulfilled, (state, action) => {
                if (state.currentRequestId !== action.meta.requestId) return;

                state.data = action.payload.data;
                state.pagination = action.payload.pagination;
                state.isLoading = false;
                state.currentRequestId = undefined;
            })
            .addCase(getEquipments.rejected, (state, action) => {
                if (state.currentRequestId !== action.meta.requestId) return;

                state.isLoading = false;
                state.currentRequestId = undefined;
                state.error = typeof action.payload === "string" ? action.payload : "Unable to load equipment.";
            });
    },
});

export const { setPage, setCategory, setSearch, setPriceRange, getEquipmentById } = equipmentSlice.actions;
export default equipmentSlice.reducer;
