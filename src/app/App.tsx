import { Route, Routes } from "react-router-dom";
import './/styles/index.scss';
import { Link } from "react-router-dom";
import { Suspense } from "react";
import { classNames } from "../shared/lib/classNames";
import { useTheme } from "../app/providers/themeProvider/lib/useTheme";
import { AboutPage } from "../pages/AboutPage";
import { MainPage } from "../pages/MainPage";

function App() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>TOGGLE THEME</button>
            <Link to={'/'}>Main</Link>
            <Link to={'/about'}>About</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </Suspense>
        </ div>
    )
}

export default App;