import { ButtonHTMLAttributes, FC } from "react";
import * as clss from './Button.module.scss';
import { classNames } from "../../../../shared/lib/classNames";


export enum ButtonTheme {
    CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
    theme?: ButtonTheme;

}

export const Button: FC<ButtonProps> = (props) => {
    const { className,
        children,
        theme,
        ...otherProps } = props;
    return (
        <button className={classNames(clss.button, {}, [clss[theme]])}
            {...otherProps}>
            {children}
        </button>
    )
}