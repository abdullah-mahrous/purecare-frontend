import { Outlet } from 'react-router'
import NavBar from '../components/navbar/NavBar'

function RootLayout() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    ) 
}

export default RootLayout
