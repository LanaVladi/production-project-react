import { memo, useMemo, useState } from 'react';
import { SidebarItemsList } from '../../../../widgets/Sidebar/model/items';
import { ThemeSwitcher } from '../../../../widgets/ThemeSwitcher';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './Sidebar.module.scss';
import { LangSwitcher } from '../../../../widgets/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '../../../../shared/ui/Button/Button';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(() => SidebarItemsList.map((item) => (
        <SidebarItem
            item={item}
            collapsed={collapsed}
            key={item.path}
        />
    )), [collapsed]);

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
                {itemsList}
            </div>

            <div className={clss.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={clss.lang} />
            </div>

        </div>
    );
});
