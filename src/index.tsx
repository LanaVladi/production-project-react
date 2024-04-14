import { createRoot } from 'react-dom/client';
// import ReactDOM from 'react-dom';
import App from './app/App';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from './app/providers/themeProvider/ui/ThemeProvider';


const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </BrowserRouter>
)

// const root = ReactDOM.render(
//     <BrowserRouter>
//         <ThemeProvider>
//             <App />
//         </ThemeProvider>
//     </BrowserRouter>,
//     document.getElementById('root'));