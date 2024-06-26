import { Link, LinkProps } from 'react-router-dom';
import React, { FC, ReactNode } from 'react';
import clss from './AppLink.module.scss';
// import * as clss from './AppLink.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    children: ReactNode;
    theme?: AppLinkTheme;
}

export const AppLink = (props: AppLinkProps) => {
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
