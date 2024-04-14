import { FC, useMemo, useState } from "react";
import { LOCAL_STORAGE_KEY_THEME, Theme, ThemeContext } from "../lib/ThemeContext";

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_KEY_THEME) as Theme || Theme.LIGHT;

// interface ThemeProviderProps {
//     children: React.ReactNode;
// }

// export function ThemeProvider({ children }: ThemeProviderProps) {


export const ThemeProvider: FC<React.PropsWithChildren> = ({ children }) => {

    const [theme, setTheme] = useState<Theme>(defaultTheme);

    const defaultProps = useMemo(() => ({
        theme: theme,
        setTheme: setTheme
    }), [theme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )

}
