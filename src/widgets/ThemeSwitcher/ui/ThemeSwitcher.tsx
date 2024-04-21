import React from 'react';
import { Theme, useTheme } from '../../../app/providers/themeProvider';
import { classNames } from '../../../shared/lib/classNames/classNames';
import * as clss from './ThemeSwitcher.module.scss';
import LightIcon from '../../../shared/assets/icons/theme-light.svg';
import DarkIcon from '../../../shared/assets/icons/theme-dark.svg';
import { Button, ThemeButton } from '../../../shared/ui/Button/Button';

interface ThemeSwitcherProps {
    className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ThemeButton.CLEAR}
            onClick={toggleTheme}
            className={classNames(clss.themeswitcher, {}, [className])}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
}
