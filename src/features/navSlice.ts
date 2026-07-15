import { createSlice } from '@reduxjs/toolkit';

const navSlice = createSlice({
    name: 'nav',
    initialState: {
        isDrawerOpen: false
    },
    reducers: {
        openDrawer: (state) => {
            state.isDrawerOpen = true;
        },
        closeDrawer: (state) => {
            state.isDrawerOpen = false;
        }
    }
});

export const { openDrawer, closeDrawer } = navSlice.actions;
export default navSlice.reducer;