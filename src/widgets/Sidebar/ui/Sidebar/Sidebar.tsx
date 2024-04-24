import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeSwitcher } from '../../../../widgets/ThemeSwitcher';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './Sidebar.module.scss';
import { LangSwitcher } from '../../../../widgets/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '../../../../shared/ui/Button/Button';
import { AppLink, AppLinkTheme } from '../../../../shared/ui/appLink/AppLink';
import { RoutePath } from '../../../../shared/config/routerConfig/routerConfig';
import AboutIcon from '../../../../shared/assets/icons/about-20-20.svg';
import MainIcon from '../../../../shared/assets/icons/main-20-20.svg';

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div
            data-testid="sidebar"
            className={classNames(
                clss.sidebar,
                { [clss.collapsed]: collapsed },
                [className],
            )}
        >
            <Button
                data-testid="sidebar-toggle"
                type="button"
                onClick={onToggle}
                className={clss.collapseBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                size={ButtonSize.M}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={clss.items}>
                <AppLink to={RoutePath.main} theme={AppLinkTheme.PRIMARY} className={clss.item}>
                    <MainIcon className={clss.icon} />
                    <span className={clss.link}>
                        {t('Main')}
                    </span>

                </AppLink>
                <AppLink to={RoutePath.about} theme={AppLinkTheme.PRIMARY} className={clss.item}>

                    <AboutIcon className={clss.icon} />
                    <span className={clss.link}>
                        {t('About')}
                    </span>
                </AppLink>
            </div>

            <div className={clss.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={clss.lang} />
            </div>

        </div>
    );
}
