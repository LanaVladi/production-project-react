/* eslint-disable i18next/no-literal-string */
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SidebarItemsList } from '../../../../widgets/Sidebar/model/items';
import { ThemeSwitcher } from '../../../../widgets/ThemeSwitcher';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './Sidebar.module.scss';
import { LangSwitcher } from '../../../../widgets/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '../../../../shared/ui/Button/Button';
import { AppLink, AppLinkTheme } from '../../../../shared/ui/appLink/AppLink';
import { RoutePath } from '../../../../shared/config/routerConfig/routerConfig';
import AboutIcon from '../../../../shared/assets/icons/about-20-20.svg';
import MainIcon from '../../../../shared/assets/icons/main-20-20.svg';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();
    const [test, setTest] = useState(0);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    // const itemsList = useMemo(() => SidebarItemsList.map((item) => (
    //     <SidebarItem
    //         item={item}
    //         collapsed={collapsed}
    //         key={item.path}
    //     />
    // )), [collapsed]);

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
                <button type="button" onClick={() => setTest(test + 1)}>Test</button>
                {/* {itemsList} */}
                {SidebarItemsList.map((item) => (<SidebarItem item={item} collapsed={collapsed} key={item.path} />))}
            </div>

            <div className={clss.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={clss.lang} />
            </div>

        </div>
    );
}
