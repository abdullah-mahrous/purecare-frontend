import { configureStore } from '@reduxjs/toolkit'

import navReducer from '../features/navSlice'
import equipmentReducer from '../features/equipmentSlice'
import serviceSlice from '../features/serviceSlice'

export const store = configureStore({
  reducer: {
    nav: navReducer,
    equipment: equipmentReducer,
    services: serviceSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
