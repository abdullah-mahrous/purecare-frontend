import { createBrowserRouter } from 'react-router'

import { routes } from './routes.ts'

import RootLayout from '../layouts/RootLayout.tsx'
import HomePage from '../pages/HomePage.tsx'
import ServicePage from '../pages/ServicePage.tsx'
import MedicalEquipmentPage from '../pages/MidicalEquipmentPage.tsx'
import Careers from '../pages/CareersPage.tsx'
import ReservationPage from '../pages/ReservationPage.tsx'

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: routes.services('serviceId'),
        element: <ServicePage />,
      },
      {
        path: routes.reservation,
        element: <ReservationPage />,
      },
      {
        path: routes.careers,
        element: <Careers />,
      },
      {
        path: routes.medicalEquipment,
        element: <MedicalEquipmentPage />,
      },
    ],
  },
])
