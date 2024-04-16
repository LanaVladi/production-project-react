import { createRoot } from 'react-dom/client';
// import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { ThemeProvider } from './app/providers/themeProvider/ui/ThemeProvider';
import './shared/config/routerConfig/i18n/i18n'; // важный момент!!!

const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </BrowserRouter>,
);

// const root = ReactDOM.render(
//     <BrowserRouter>
//         <ThemeProvider>
//             <App />
//         </ThemeProvider>
//     </BrowserRouter>,
//     document.getElementById('root'));
