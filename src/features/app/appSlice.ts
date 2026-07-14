import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  isReady: boolean
}

const initialState: AppState = {
  isReady: true,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppReady(state, action: PayloadAction<boolean>) {
      state.isReady = action.payload
    },
  },
})

export const { setAppReady } = appSlice.actions
export default appSlice.reducer
