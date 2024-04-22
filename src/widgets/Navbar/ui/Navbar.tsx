import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from '../../../shared/ui/appLink/AppLink';
// import { AppLink, AppLinkTheme } from '../shared/ui/AppLink/AppLink';
// import { AppLink, AppLinkTheme } from '../../../shared/ui/appLink/AppLink';
// import { AppLink, AppLinkTheme } from '../../../shared/ui/AppLink/AppLink';
import { classNames } from '../../../shared/lib/classNames/classNames';
import clss from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export function Navbar({ className }: NavbarProps) {
    const { t } = useTranslation();

    return (
        <div className={classNames(clss.navbar, {}, [className])}>
            <div className={classNames(clss.links)}>
                <AppLink to="/" theme={AppLinkTheme.SECONDARY}>
                    {t('Main')}
                </AppLink>
                <AppLink to="/about" theme={AppLinkTheme.RED}>
                    {t('About')}
                </AppLink>
            </div>

        </div>
    );
}
