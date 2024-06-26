/* eslint-disable i18next/no-literal-string */
import './styles/index.scss';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppRouter } from './providers/router';
import { Navbar } from '../widgets/Navbar';
import { Sidebar } from '../widgets/Sidebar';
import '../../src/shared/config/i18n/i18n';
import { classNames } from '../shared/lib/classNames/classNames';
import { getUserInited, initAuthData } from '../entities/User';
import { useTheme } from '../shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '../shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '../widgets/PageLoader';

function App() {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited) {
        return <PageLoader />;
    }

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
