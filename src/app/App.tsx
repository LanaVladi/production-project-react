/* eslint-disable i18next/no-literal-string */
import './styles/index.scss';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRouter } from './providers/router';
import { Navbar } from '../widgets/Navbar';
import { Sidebar } from '../widgets/Sidebar';
import '../../src/shared/config/i18n/i18n';
import { classNames } from '../shared/lib/classNames/classNames';
import { getUserInited, userActions } from '../entities/User';
import { useTheme } from '../shared/lib/hooks/useTheme/useTheme';
import { useJsonSettingsByKey } from '../entities/User/model/selectors/jsonSettings';

function App() {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);
    // const themeFromSettings = useJsonSettingsByKey('theme');
    // console.log('themeFromSettings:', themeFromSettings);
    // const isFirstVisit = useJsonSettingsByKey('isFirstVisit');
    // console.log('isFirstVisit:', isFirstVisit);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

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
