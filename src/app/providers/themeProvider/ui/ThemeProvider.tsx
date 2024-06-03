import {
    ReactNode, useEffect, useMemo, useState,
} from 'react';
import { useJsonSettings } from '../../../../entities/User';
import { LOCAL_STORAGE_THEME_KEY } from '../../../../shared/const/localstorage';
import { Theme } from '../../../../shared/const/theme';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';

// const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { initialTheme, children } = props;

    const { theme: defaultTheme = Theme.LIGHT } = useJsonSettings();
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    useEffect(() => {
        // if (!isThemeInited) {
        setTheme(defaultTheme);
        // setThemeInited(true);
        // }
    }, [defaultTheme]);

    // const { theme: defaultTheme } = useJsonSettings();
    // const [isThemeInited, setThemeInited] = useState(false);

    // const [theme, setTheme] = useState<Theme>(
    //     initialTheme || defaultTheme || Theme.LIGHT,
    // );

    // const defaultProps = useMemo(() => ({
    //     theme,
    //     setTheme,
    // }), [theme]);

    // useEffect(() => {
    //     if (!isThemeInited && defaultTheme) {
    //         setTheme(defaultTheme);
    //         setThemeInited(true);
    //     }
    // }, [defaultTheme, isThemeInited]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
