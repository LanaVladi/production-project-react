import './styles/index.scss';
import React, { Suspense, useEffect } from 'react';
import { useTheme } from '../app/providers/themeProvider/lib/useTheme';
import { AppRouter } from './providers/router';
import { Navbar } from '../widgets/Navbar';
import { Sidebar } from '../widgets/Sidebar';
import '../shared/config/routerConfig/i18n/i18n';
import { classNames } from '../shared/lib/classNames/classNames';

function App() {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}

export default App;
