import { useEffect } from 'react'
import { Outlet } from 'react-router'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { getServices } from '@/features/serviceSlice'

import NavBar from '../components/navbar/NavBar'
import Footer from '../components/Footer'

function RootLayout() {
    const dispatch = useAppDispatch();
    const { isLoading, error } = useAppSelector((state) => state.services);
    
    useEffect(() => {
        dispatch(getServices());
    }, [dispatch]);

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    ) 
}

export default RootLayout
