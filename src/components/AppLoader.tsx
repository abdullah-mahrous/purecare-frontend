import { useNavigation } from 'react-router'

import LoadingScreen from '@/components/LoadingScreen';

const AppLoader = () => {
    const navigation = useNavigation();

    if (navigation.state === "loading") {
        return <LoadingScreen />;
    }

    return null;
};

export default AppLoader;