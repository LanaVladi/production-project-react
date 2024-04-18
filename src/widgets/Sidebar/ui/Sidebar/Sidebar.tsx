import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeSwitcher } from '../../../../widgets/ThemeSwitcher';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './Sidebar.module.scss';
import { LangSwitcher } from '../../../../widgets/LangSwitcher';
import { Button } from '../../../../shared/ui/appLink/Button/Button';

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(true);
    const { t } = useTranslation();

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div
            data-testid="sidebar"
            className={classNames(
                clss.sidebar,
                { [clss.collapsed]: true },
                [],
            )}
        >
            <Button data-testid="sidebar-toggle" type="button" onClick={onToggle}>{t('Toggle')}</Button>
            <div className={clss.switchers}>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>

        </div>
    );
}
