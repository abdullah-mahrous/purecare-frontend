import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router'

import LoadingScreen from '@/components/LoadingScreen';

const AppLoader = () => {
    const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (navigation.state === "loading") {
            setIsVisible(true);
            setIsExiting(false);
            return;
        }

        if (!isVisible) return;

        setIsExiting(true);
        const timeout = window.setTimeout(() => {
            setIsVisible(false);
            setIsExiting(false);
        }, 400);

        return () => window.clearTimeout(timeout);
    }, [isVisible, navigation.state]);

    if (!isVisible) return null;

    return <LoadingScreen isExiting={isExiting} />;
};

export default AppLoader;