import './styles/index.scss';
import { Suspense, useEffect } from 'react';
import { useTheme } from '../app/providers/themeProvider/lib/useTheme';
import { AppRouter } from './providers/router';
import { Navbar } from '../widgets/Navbar';
import { Sidebar } from '../widgets/Sidebar';
import { classNames } from '../shared/lib/classNames';
import '../shared/config/routerConfig/i18n/i18n';

function App() {
    const { theme } = useTheme();

    // useEffect(() => {
    //     throw new Error();
    // });

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
