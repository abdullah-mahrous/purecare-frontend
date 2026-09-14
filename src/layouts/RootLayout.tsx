import { Outlet } from 'react-router'

import NavBar from '../components/navbar/NavBar'
import Footer from '../components/Footer'
import AppLoader from '@/components/AppLoader'

function RootLayout() {

    return (
        <>
            <AppLoader />
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default RootLayout
