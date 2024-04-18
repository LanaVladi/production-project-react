import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeSwitcher } from '../../../../widgets/ThemeSwitcher';
import { classNames } from '../../../../shared/lib/classNames';
import * as clss from './Sidebar.module.scss';
import { LangSwitcher } from '../../../../widgets/LangSwitcher';

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
        <div className={classNames(
            clss.sidebar,
            { [clss.collapsed]: collapsed },
            [className],
        )}
        >
            <button type="button" onClick={onToggle}>{t('Toggle')}</button>
            <div className={clss.switchers}>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>

        </div>
    );
}
