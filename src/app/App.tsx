import './/styles/index.scss';
import { classNames } from "../shared/lib/classNames";
import { useTheme } from "../app/providers/themeProvider/lib/useTheme";
import { AppRouter } from './providers/router';
import { Navbar } from '../widgets/Navbar';

function App() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Navbar />
            <button onClick={toggleTheme}>TOGGLE THEME</button>
            <AppRouter />
        </ div>
    )
}

export default App;