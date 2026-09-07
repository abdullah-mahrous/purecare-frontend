import { configureStore } from '@reduxjs/toolkit'

import navReducer from '../features/navSlice'
import equipmentReducer from '../features/equipmentSlice'
import serviceSlice from '../features/serviceSlice'
import faqReducer from '../features/faqSlice'
import testimonialReducer from '../features/testimonialSlice'
import websiteGeneralDataReducer from '../features/websiteGeneralDataSlice'

export const store = configureStore({
  reducer: {
    nav: navReducer,
    equipment: equipmentReducer,
    services: serviceSlice,
    faqs: faqReducer,
    testimonials: testimonialReducer,
    websiteGeneralData: websiteGeneralDataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
