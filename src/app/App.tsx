import './/styles/index.scss';
import { useTheme } from "../app/providers/themeProvider/lib/useTheme";
import { AppRouter } from './providers/router';
import { Navbar } from '../widgets/Navbar';
import { Sidebar } from '../widgets/Sidebar';
import { classNames } from '../shared/lib/classNames';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import '../shared/config/routerConfig/i18n/i18n';

// function MyComponent() {
//     const { t, i18n } = useTranslation();

//     const toggleLang = () => {
//         i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en')
//     }

//     return (
//         <>
//             <button onClick={toggleLang}>{t("Translate")}</button>
//             <h1>{t('Test example')}</h1>
//         </>
//     )
// }


function App() {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback=''>
                <Navbar />
                {/* <MyComponent /> */}
                <div className='content-page'>
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </ div>
    )
}

export default App;