import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import * as clss from './Button.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export enum ThemeButton {
    CLEAR = 'clear',
    OUTLINE = 'outline',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
    theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        theme,
        ...otherProps
    } = props;
    console.log('clss.button', clss.button);
    console.log('clss.clear', clss.clear);

    return (
        <button
            type="button"
            className={classNames(clss.button, { [clss[theme]]: true }, [className])}
            {...otherProps}
        >

            {children}
        </button>
    );
};
