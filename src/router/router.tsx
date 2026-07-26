import { createBrowserRouter } from 'react-router'
import RootLayout from '../layouts/RootLayout.tsx'
import HomePage from '../pages/HomePage.tsx'
import ServicePage from '../pages/ServicePage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'services/:serviceSlug',
        element: <ServicePage />,
      },
    ],
  },
])
