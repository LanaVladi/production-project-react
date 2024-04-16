import { classNames } from "../../../shared/lib/classNames";
import * as clss from './Navbar.module.scss';
import { AppLink, AppLinkTheme } from "../../../shared/ui/appLink/AppLink";

interface NavbarProps {
    className?: string;
}

export function Navbar({ className }: NavbarProps) {

    return (
        <div className={classNames(clss.navbar, {}, [className])}>
            <div className={classNames(clss.links)}>
                <AppLink to={'/'} theme={AppLinkTheme.SECONDARY}>Main</AppLink>
                <AppLink to={'/about'} theme={AppLinkTheme.SECONDARY}>About</AppLink>
            </div>

        </div>
    )
}
