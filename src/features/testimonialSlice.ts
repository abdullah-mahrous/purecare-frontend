import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    createTestimonial,
    deleteTestimonial,
    fetchTestimonials,
    updateTestimonial,
    type Testimonial,
} from '@/services/testimonial.service';

type TestimonialInput = Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>;
type TestimonialState = { data: Testimonial[]; isLoading: boolean; error: string | null };

const initialState: TestimonialState = { 
    data: [], 
    isLoading: false, 
    error: null 
};

const getError = (error: unknown, fallback: string) => error instanceof Error ? error.message : fallback;

export const getTestimonials = createAsyncThunk('testimonials/get', fetchTestimonials);

export const postTestimonial = createAsyncThunk('testimonials/post', async (data: TestimonialInput, { rejectWithValue }) => {
    try { 
        return await createTestimonial(data); 
    } catch (error) { 
        return rejectWithValue(getError(error, 'Unable to create testimonial.')); 
    }
});

export const patchTestimonial = createAsyncThunk('testimonials/patch', async ({ id, data }: { id: string; data: Partial<TestimonialInput> }, { rejectWithValue }) => {
    try { 
        return await updateTestimonial(id, data); 
    } catch (error) { 
        return rejectWithValue(getError(error, 'Unable to update testimonial.')); 
    }
});

export const deleteTestimonialById = createAsyncThunk('testimonials/delete', async (id: string, { rejectWithValue }) => {
    try { 
        await deleteTestimonial(id); return id; 
    } catch (error) { 
        return rejectWithValue(getError(error, 'Unable to delete testimonial.')); 
    }
});

const testimonialSlice = createSlice({
    name: 'testimonials',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Keep local CRUD results in sync without refetching the collection.
        builder
            .addCase(getTestimonials.pending, (state) => { 
                state.isLoading = true; state.error = null; 
            })
            .addCase(getTestimonials.fulfilled, (state, action) => { 
                state.data = action.payload.data; state.isLoading = false; 
            })
            .addCase(getTestimonials.rejected, (state, action) => { 
                state.isLoading = false; state.error = getError(action.error, 'Unable to load testimonials.'); 
            })
            .addCase(postTestimonial.fulfilled, (state, action) => { 
                state.data.push(action.payload.data); 
            })
            .addCase(postTestimonial.rejected, (state, action) => {
                state.error = typeof action.payload === 'string' ? action.payload : 'Unable to create testimonial.';
            })
            .addCase(patchTestimonial.fulfilled, (state, action) => {
                const index = state.data.findIndex((testimonial) => testimonial.id === action.payload.data.id);
                if (index >= 0) state.data[index] = action.payload.data;
            })
            .addCase(patchTestimonial.rejected, (state, action) => {
                state.error = typeof action.payload === 'string' ? action.payload : 'Unable to update testimonial.';
            })
            .addCase(deleteTestimonialById.rejected, (state, action) => {
                state.error = typeof action.payload === 'string' ? action.payload : 'Unable to delete testimonial.';
            })
            .addCase(deleteTestimonialById.fulfilled, (state, action) => {
                state.data = state.data.filter((testimonial) => testimonial.id !== action.payload);
            });
    },
});

export default testimonialSlice.reducer;