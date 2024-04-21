// import { createRoot } from 'react-dom/client';
// // import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import App from './app/App';
// import { ThemeProvider } from './app/providers/themeProvider/ui/ThemeProvider';
// import './shared/config/i18n/i18n'; // важный момент!!!
// import { ErrorBoundary } from './app/providers/ErrorBoundary';

// const root = createRoot(document.getElementById('root'));
// root.render(
//     <BrowserRouter>
//         <ErrorBoundary>

//             <ThemeProvider>
//                 <App />
//             </ThemeProvider>
//         </ErrorBoundary>
//     </BrowserRouter>,
// );

import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/themeProvider';
import App from './app/App';
import './shared/config/i18n/i18n';
import { ErrorBoundary } from './app/providers/ErrorBoundary';

render(
    <BrowserRouter>
        <ErrorBoundary>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </ErrorBoundary>
    </BrowserRouter>,
    document.getElementById('root'),
);
