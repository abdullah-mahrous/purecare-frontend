import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createFaq, deleteFaq, fetchFaqs, updateFaq, type Faq, type FaqInput } from '@/services/faq.service';

type FaqState = { data: Faq[]; isLoading: boolean; hasLoaded: boolean; error: string | null };

const initialState: FaqState = { 
    data: [], 
    isLoading: false,
    hasLoaded: false,
    error: null 
};

const getError = (error: unknown, fallback: string) => error instanceof Error ? error.message : fallback;

export const getFaqs = createAsyncThunk('faqs/get', fetchFaqs);

export const postFaq = createAsyncThunk('faqs/post', async (data: FaqInput, { rejectWithValue }) => {
    try { 
        return await createFaq(data); 
    } catch (error) { 
        return rejectWithValue(getError(error, 'Unable to create FAQ.')); 
    }
});

export const patchFaq = createAsyncThunk('faqs/patch', async ({ id, data }: { id: string; data: Partial<FaqInput> }, { rejectWithValue }) => {
    try { 
        return await updateFaq(id, data); 
    } catch (error) { 
        return rejectWithValue(getError(error, 'Unable to update FAQ.')); 
    }
});

export const deleteFaqById = createAsyncThunk('faqs/delete', async (id: string, { rejectWithValue }) => {
    try { 
        await deleteFaq(id); return id; 
    } catch (error) { 
        return rejectWithValue(getError(error, 'Unable to delete FAQ.')); 
    }
});

const faqSlice = createSlice({
    name: 'faqs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Keep local CRUD results in sync without refetching the collection.
        builder
            .addCase(getFaqs.pending, (state) => { 
                state.isLoading = true; state.error = null; 
            })
            .addCase(getFaqs.fulfilled, (state, action) => { 
                state.data = action.payload.data; state.isLoading = false; state.hasLoaded = true;
            })
            .addCase(getFaqs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = getError(action.error, 'Unable to load FAQs.');
            })
            .addCase(postFaq.rejected, (state, action) => {
                state.error = typeof action.payload === 'string' ? action.payload : 'Unable to create FAQ.';
            })
            .addCase(patchFaq.fulfilled, (state, action) => {
                const index = state.data.findIndex((faq) => faq.id === action.payload.data.id);

                if (index >= 0) 
                    state.data[index] = action.payload.data;
            })
            .addCase(patchFaq.rejected, (state, action) => {
                state.error = typeof action.payload === 'string' ? action.payload : 'Unable to update FAQ.';
            })
            .addCase(deleteFaqById.rejected, (state, action) => {
                state.error = typeof action.payload === 'string' ? action.payload : 'Unable to delete FAQ.';
            })
            .addCase(deleteFaqById.fulfilled, (state, action) => {
                state.data = state.data.filter((faq) => faq.id !== action.payload);
            });
    },
});

export default faqSlice.reducer;
