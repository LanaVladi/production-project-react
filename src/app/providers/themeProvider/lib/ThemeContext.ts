import { createContext } from "react";

export const enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

export const LOCAL_STORAGE_KEY_THEME = 'theme';

export interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({});
