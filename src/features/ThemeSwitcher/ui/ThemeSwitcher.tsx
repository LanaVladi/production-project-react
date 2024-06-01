import { memo, useCallback } from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '../../../shared/lib/hooks/useTheme/useTheme';
import { classNames } from '../../../shared/lib/classNames/classNames';
import LightIcon from '../../../shared/assets/icons/theme-light.svg';
import DarkIcon from '../../../shared/assets/icons/theme-dark.svg';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';
import { Theme } from '../../../shared/const/theme';
import { saveJsonSettings } from '../../../entities/User';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            // console.log(`Theme ${newTheme}`);
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [dispatch, toggleTheme]);

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            onClick={onToggleHandler}
            className={classNames('', {}, [className])}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
});
