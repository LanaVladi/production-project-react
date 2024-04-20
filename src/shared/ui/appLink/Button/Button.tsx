import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import clss from './Button.module.scss';
import { classNames } from '../../../lib/classNames/classNames';

export enum ButtonTheme {
    CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
    theme?: ButtonTheme;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        theme,
        ...otherProps
    } = props;
    return (
        <button
            type="button"
            className={classNames(clss.button, { [clss[ButtonTheme.CLEAR]]: true }, [])}
            {...otherProps}
        >
            {children}
        </button>
    );
};
