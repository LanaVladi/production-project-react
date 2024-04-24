/* eslint-disable i18next/no-literal-string */
import './styles/index.scss';
import { Suspense } from 'react';
import { AppRouter } from './providers/router';
import { Navbar } from '../widgets/Navbar';
import { Sidebar } from '../widgets/Sidebar';
import '../../src/shared/config/i18n/i18n';
import { classNames } from '../shared/lib/classNames/classNames';
import { useTheme } from './providers/themeProvider';

function App() {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [])}>
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
