import { createBrowserRouter } from 'react-router'

import { routes } from './routes.ts'

import RootLayout from '../layouts/RootLayout.tsx'
import HomePage from '../pages/HomePage.tsx'
import ServicePage from '../pages/ServicePage.tsx'
import MedicalEquipmentPage from '../pages/MidicalEquipmentsPage.tsx'
import MedicalEquipmentDetailsPage from '../pages/MedicalEquipmentDetailsPage.tsx'
import Careers from '../pages/CareersPage.tsx'
import ReservationPage from '../pages/ReservationPage.tsx'
import SentSuccessfully from '../pages/SentSuccessfully.tsx'
import NotFound from '../pages/NotFound.tsx'

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
        path: routes.servicesPattern,
        element: <ServicePage />,
      },
      {
        path: routes.reservation,
        element: <ReservationPage />,
      },
      {
        path: routes.sentSuccessfully,
        element: <SentSuccessfully />,
      },
      {
        path: routes.careers,
        element: <Careers />,
      },
      {
        path: routes.medicalEquipments,
        element: <MedicalEquipmentPage />,
      },
      {
        path: routes.medicalEquipmentDetailsPattern,
        element: <MedicalEquipmentDetailsPage />,
      },
      {
        path: routes.notFound,
        element: <NotFound />,
      },
    ],
  },
])
