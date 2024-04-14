import './/styles/index.scss';
import { Link } from "react-router-dom";
import { classNames } from "../shared/lib/classNames";
import { useTheme } from "../app/providers/themeProvider/lib/useTheme";
import { AppRouter } from './providers/router';

function App() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>TOGGLE THEME</button>
            <Link to={'/'}>Main</Link>
            <Link to={'/about'}>About</Link>
            <AppRouter />
        </ div>
    )
}

export default App;