import { Route, Routes } from "react-router-dom";
import Counter from "./components/Counter";
import './index.scss';
import AboutPage from "./pages/AboutPage/AboutPage";
import MainPage from "./pages/MainPage/MainPage";
import { Link } from "react-router-dom";
import { AboutPageLazy } from "./pages/AboutPage/AboutPage.lazy";
import { MainPageLazy } from "./pages/MainPage/MainPage.lazy";
import { Suspense } from "react";

function App() {
    return (
        <div className="app">
            <Link to={'/'}>Main</Link>
            <Link to={'/about'}>About</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/about" element={<AboutPageLazy />} />
                    <Route path="/" element={<MainPageLazy />} />
                </Routes>
            </Suspense>
            {/* <Counter /> */}
        </div>
    )
}

export default App;