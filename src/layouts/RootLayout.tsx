import { Outlet } from 'react-router'

import NavBar from '../components/navbar/NavBar'
import Footer from '../components/Footer'
import AppLoader from '@/components/AppLoader'
import ScrollTop from '@/components/ScrollTop'

function RootLayout() {

    return (
        <>
            <ScrollTop />
            <AppLoader />
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default RootLayout
