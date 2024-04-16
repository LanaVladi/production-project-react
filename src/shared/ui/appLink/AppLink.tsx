import { Link, LinkProps } from "react-router-dom";
import { classNames } from "../../../shared/lib/classNames";
import * as clss from './AppLink.module.scss';
import { FC } from "react";


export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    children: React.ReactNode;
    theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = (props) => {

    const { className,
        children,
        to,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps } = props;

    return (
        <Link
            to={to}
            className={classNames(clss.applink, {}, [className, clss[theme]])}
            {...otherProps}
        >
            {children}

        </Link>
    )
}