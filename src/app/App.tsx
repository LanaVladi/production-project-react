import './/styles/index.scss';
import { useTheme } from "../app/providers/themeProvider/lib/useTheme";
import { AppRouter } from './providers/router';
import { Navbar } from '../widgets/Navbar';
import { classNames } from '../shared/lib/classNames';

function App() {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Navbar />

            <AppRouter />
        </div>
    )
}

export default App;