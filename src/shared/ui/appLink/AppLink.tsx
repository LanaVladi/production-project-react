import { Link, LinkProps } from 'react-router-dom';
import React, { FC } from 'react';
import * as clss from './AppLink.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    children: React.ReactNode;
    theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = (props) => {
    const {
        className,
        children,
        to,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;

    return (
        <Link
            to={to}
            className={classNames(clss.applink, { [clss[theme]]: true }, [className])}
            {...otherProps}
        >
            {children}

        </Link>
    );
};
