import { Outlet } from 'react-router'
import NavBar from '../components/navbar/NavBar'
import Footer from '../components/Footer'

function RootLayout() {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    ) 
}

export default RootLayout
