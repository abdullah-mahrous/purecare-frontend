import { configureStore } from '@reduxjs/toolkit'
import navReducer from '../features/navSlice'
import equipmentReducer from '../features/equipmentSlice'

export const store = configureStore({
  reducer: {
    nav: navReducer,
    equipment: equipmentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
