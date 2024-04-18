import { useTranslation } from 'react-i18next';
import { classNames } from '../../../shared/lib/classNames';
import * as clss from './Navbar.module.scss';
import { AppLink, AppLinkTheme } from '../../../shared/ui/appLink/AppLink';

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
                <AppLink to="/about" theme={AppLinkTheme.SECONDARY}>
                    {t('About')}
                </AppLink>
            </div>

        </div>
    );
}
