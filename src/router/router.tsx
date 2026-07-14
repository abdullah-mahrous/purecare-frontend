import { createBrowserRouter } from 'react-router'
import RootLayout from '../layouts/RootLayout.tsx'
import HomePage from '../pages/HomePage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
])
