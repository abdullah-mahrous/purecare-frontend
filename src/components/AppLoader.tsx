import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router'

import LoadingScreen from '@/components/LoadingScreen';

const AppLoader = () => {
    const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (navigation.state === "loading") {
            const resetLoader = window.setTimeout(() => {
                setIsVisible(true);
                setIsExiting(false);
            }, 0);

            return () => window.clearTimeout(resetLoader);
        }

        if (!isVisible) return;

        const exitStart = window.setTimeout(() => setIsExiting(true), 0);
        const timeout = window.setTimeout(() => {
            setIsVisible(false);
            setIsExiting(false);
        }, 400);

        return () => {
            window.clearTimeout(exitStart);
            window.clearTimeout(timeout);
        };
    }, [isVisible, navigation.state]);

    if (!isVisible) return null;

    return <LoadingScreen isExiting={isExiting} />;
};

export default AppLoader;