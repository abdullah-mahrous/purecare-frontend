import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../app/store";
import {
    createEquipment,
    deleteEquipment,
    fetchEquipmentById,
    fetchEquipments,
    updateEquipment,
    type Equipment,
    type EquipmentCategoryId,
    type EquipmentCreateInput,
    type EquipmentFilters,
    type EquipmentPagination,
    type EquipmentUpdateInput,
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
    pagination: { page: 1, limit: 12, total: 0, pages: 0, hasNextPage: false, hasPreviousPage: false },
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

export const getEquipmentById = createAsyncThunk(
    "equipment/getEquipmentById",
    async (id: string, { rejectWithValue }) => {
        try {
            return await fetchEquipmentById(id);
        } catch (error) {
            return rejectWithValue(getError(error, "Unable to load equipment."));
        }
    },
);

const getError = (error: unknown, fallback: string) => error instanceof Error ? error.message : fallback;

export const postEquipment = createAsyncThunk(
    "equipment/postEquipment",
    async (equipment: EquipmentCreateInput, { rejectWithValue }) => {
        try {
            return await createEquipment(equipment);
        } catch (error) {
            return rejectWithValue(getError(error, "Unable to create equipment."));
        }
    },
);

export const patchEquipment = createAsyncThunk(
    "equipment/patchEquipment",
    async ({ id, data }: { id: string; data: EquipmentUpdateInput }, { rejectWithValue }) => {
        try {
            return await updateEquipment(id, data);
        } catch (error) {
            return rejectWithValue(getError(error, "Unable to update equipment."));
        }
    },
);

export const deleteEquipmentById = createAsyncThunk(
    "equipment/deleteEquipment",
    async (id: string, { rejectWithValue }) => {
        try {
            await deleteEquipment(id);
            return id;
        } catch (error) {
            return rejectWithValue(getError(error, "Unable to delete equipment."));
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
        selectEquipment: (state, action: PayloadAction<string>) => {
            state.equipment = state.data.find((item) => item.id === action.payload);
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
                if (state.currentRequestId !== action.meta.requestId) 
                    return;

                state.data = action.payload.data.items;
                state.pagination = action.payload.data.pagination;
                state.isLoading = false;
                state.currentRequestId = undefined;
            })
            .addCase(getEquipments.rejected, (state, action) => {
                if (state.currentRequestId !== action.meta.requestId) return;

                state.isLoading = false;
                state.currentRequestId = undefined;
                state.error = typeof action.payload === "string" ? action.payload : "Unable to load equipment.";
            })
            .addCase(getEquipmentById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.equipment = undefined;
            })
            .addCase(getEquipmentById.fulfilled, (state, action) => {
                state.equipment = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getEquipmentById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = typeof action.payload === "string" ? action.payload : "Unable to load equipment.";
            })
            .addCase(postEquipment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(postEquipment.fulfilled, (state, action) => {
                state.data.unshift(action.payload);
                state.pagination.total += 1;
                state.isLoading = false;
            })
            .addCase(postEquipment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = typeof action.payload === "string" ? action.payload : "Unable to create equipment.";
            })
            .addCase(patchEquipment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(patchEquipment.fulfilled, (state, action) => {
                const index = state.data.findIndex((item) => item.id === action.payload.id);

                if (index >= 0)
                    state.data[index] = action.payload;

                if (state.equipment?.id === action.payload.id)
                    state.equipment = action.payload;

                state.isLoading = false;
            })
            .addCase(patchEquipment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = typeof action.payload === "string" ? action.payload : "Unable to update equipment.";
            })
            .addCase(deleteEquipmentById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteEquipmentById.fulfilled, (state, action) => {
                state.data = state.data.filter((item) => item.id !== action.payload);
                state.pagination.total = Math.max(0, state.pagination.total - 1);

                if (state.equipment?.id === action.payload)
                    state.equipment = undefined;

                state.isLoading = false;
            })
            .addCase(deleteEquipmentById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = typeof action.payload === "string" ? action.payload : "Unable to delete equipment.";
            });
    },
});

export const { setPage, setCategory, setSearch, setPriceRange, selectEquipment } = equipmentSlice.actions;
export default equipmentSlice.reducer;
