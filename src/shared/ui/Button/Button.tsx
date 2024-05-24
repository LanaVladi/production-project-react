import {
    ButtonHTMLAttributes, FC, memo, ReactNode,
} from 'react';
import clss from './Button.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';

export enum ButtonTheme {
    CLEAR = 'clear',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline_red',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

    className?: string;
    /**
     * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
     */
    theme?: ButtonTheme;
    /**
     * Флаг, делающий кнопку квадратной
     */
    square?: boolean;
    /**
     * Размер кнопки в соответствии с дизайн системой
     */
    size?: ButtonSize;
    /**
     * Флаг, отвечающий за работу кнопки
     */
    disabled?: boolean;
    /**
     * Содержимое кнопки
     */
    children?: ReactNode;
    /**
     * Увеличивает кнопку на всю свободную ширину
     */
    fullWidth?: boolean;
    // className?: string;
    // children: ReactNode;
    // theme?: ButtonTheme;
    // square?: boolean;
    // size?: ButtonSize;
    // disabled?: boolean;
    // fullWidth?: boolean;
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ButtonTheme.OUTLINE,
        square,
        size = ButtonSize.M,
        disabled,
        fullWidth,
        ...otherProps
    } = props;

    const mods: Mods = {
        [clss[theme]]: true,
        [clss.square]: square,
        [clss[size]]: true,
        [clss.disabled]: disabled,
        [clss.fullWidth]: fullWidth,
    };

    return (
        <button
            type="button"
            className={classNames(clss.button, mods, [className])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});
