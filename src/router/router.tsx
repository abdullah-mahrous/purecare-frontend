import { createBrowserRouter } from 'react-router'

import { routes } from './routes.ts'
import { homeLoader, loadWebsiteEssentials, equipmentsLoader, equipmentDetailsLoader, serviceLoader } from '../router/loaders.ts'

import RootLayout from '../layouts/RootLayout.tsx'
import HomePage from '../pages/HomePage.tsx'
import ServicePage from '../pages/ServicePage.tsx'
import MedicalEquipmentPage from '../pages/MidicalEquipmentsPage.tsx'
import MedicalEquipmentDetailsPage from '../pages/MedicalEquipmentDetailsPage.tsx'
import Careers from '../pages/CareersPage.tsx'
import ReservationPage from '../pages/ReservationPage.tsx'
import SentSuccessfully from '../pages/SentSuccessfully.tsx'
import NotFound from '../pages/NotFound.tsx'
import AdminLoginPage from '../pages/AdminLoginPage.tsx'
import AdminPanelPage from '../pages/AdminPanelPage.tsx'
import LoadingScreen from '@/components/LoadingScreen.tsx'

export const router = createBrowserRouter([
  {
    path: routes.adminLogin,
    element: <AdminLoginPage />,
    HydrateFallback: LoadingScreen,
  },
  {
    path: routes.admin,
    element: <AdminPanelPage />,
    HydrateFallback: LoadingScreen,
  },
  {
    path: routes.adminPanel,
    element: <AdminPanelPage />,
    HydrateFallback: LoadingScreen,
  },
  {
    path: routes.home,
    element: <RootLayout />,
    loader: loadWebsiteEssentials,
    HydrateFallback: LoadingScreen,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: routes.servicesPattern,
        element: <ServicePage />,
        loader: serviceLoader,
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
        loader: equipmentsLoader,
      },
      {
        path: routes.medicalEquipmentDetailsPattern,
        element: <MedicalEquipmentDetailsPage />,
        loader: equipmentDetailsLoader,
      },
      {
        path: routes.notFound,
        element: <NotFound />,
      },
    ],
  },
])
