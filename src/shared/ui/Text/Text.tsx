import { memo } from 'react';
import { classNames, Mods } from '../../../shared/lib/classNames/classNames';
import clss from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
    } = props;

    const mods: Mods = {
        [clss[theme]]: true,
        [clss[align]]: true,
    };

    return (
        <div className={classNames(clss.Text, mods, [className])}>
            {title && <p className={clss.title}>{title}</p>}
            {text && <p className={clss.text}>{text}</p>}
        </div>
    );
});
