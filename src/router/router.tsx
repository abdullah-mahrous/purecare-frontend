import { createBrowserRouter } from 'react-router'

import { routes } from './routes.ts'
import { homeLoader, loadWebsiteEssentials, equipmentsLoader, equipmentDetailsLoader, serviceLoader } from '../router/loaders.ts'

import RootLayout from '../layouts/RootLayout.tsx'
import LoadingScreen from '@/components/LoadingScreen.tsx'

export const router = createBrowserRouter([
  {
    path: routes.adminLogin,
    lazy: async () => ({ Component: (await import('../pages/AdminLoginPage.tsx')).default }),
    HydrateFallback: LoadingScreen,
  },
  {
    path: routes.admin,
    lazy: async () => ({ Component: (await import('../pages/AdminPanelPage.tsx')).default }),
    HydrateFallback: LoadingScreen,
  },
  {
    path: routes.adminPanel,
    lazy: async () => ({ Component: (await import('../pages/AdminPanelPage.tsx')).default }),
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
        lazy: async () => ({
          Component: (await import('../pages/HomePage.tsx')).default,
          loader: homeLoader,
        }),
      },
      {
        path: routes.servicesPattern,
        lazy: async () => ({
          Component: (await import('../pages/ServicePage.tsx')).default,
          loader: serviceLoader,
        }),
      },
      {
        path: routes.reservation,
        lazy: async () => ({ Component: (await import('../pages/ReservationPage.tsx')).default }),
      },
      {
        path: routes.sentSuccessfully,
        lazy: async () => ({ Component: (await import('../pages/SentSuccessfully.tsx')).default }),
      },
      {
        path: routes.careers,
        lazy: async () => ({ Component: (await import('../pages/CareersPage.tsx')).default }),
      },
      {
        path: routes.medicalEquipments,
        lazy: async () => ({
          Component: (await import('../pages/MidicalEquipmentsPage.tsx')).default,
          loader: equipmentsLoader,
        }),
      },
      {
        path: routes.medicalEquipmentDetailsPattern,
        lazy: async () => ({
          Component: (await import('../pages/MedicalEquipmentDetailsPage.tsx')).default,
          loader: equipmentDetailsLoader,
        }),
      },
      {
        path: routes.notFound,
        lazy: async () => ({ Component: (await import('../pages/NotFound.tsx')).default }),
      },
    ],
  },
])
