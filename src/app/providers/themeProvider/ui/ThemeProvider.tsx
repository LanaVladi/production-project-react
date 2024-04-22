// import {
//     FC, PropsWithChildren, useMemo, useState,
// } from 'react';
// import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

// const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

// // interface ThemeProviderProps {
// //     children: React.ReactNode;
// // }

// // export function ThemeProvider({ children }: ThemeProviderProps) {

// export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
//     const [theme, setTheme] = useState<Theme>(defaultTheme);

//     const defaultProps = useMemo(() => ({
//         theme,
//         setTheme,
//     }), [theme]);

//     return (
//         <ThemeContext.Provider value={defaultProps}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

import React, { FC, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

interface ThemeProviderProps {
    initialTheme?: Theme;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
