import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeSwitcher } from '../../../../widgets/ThemeSwitcher';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './Sidebar.module.scss';
import { LangSwitcher } from '../../../../widgets/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '../../../../shared/ui/Button/Button';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../../../widgets/Sidebar/model/selectors/getSidebarItems';
import { VStack } from '../../../../shared/ui/Stack';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemsList = useSelector(getSidebarItems);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(() => sidebarItemsList.map((item) => (
        <SidebarItem
            item={item}
            collapsed={collapsed}
            key={item.path}
        />
    )), [collapsed, sidebarItemsList]);

    return (
        <nav
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
            <VStack gap="8" className={clss.items}>
                {itemsList}
            </VStack>

            <div className={clss.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={clss.lang} />
            </div>

        </nav>
    );
});
