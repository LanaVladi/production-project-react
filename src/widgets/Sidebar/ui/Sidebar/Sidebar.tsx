import { useState } from 'react';
import { ThemeSwitcher } from '../../../../widgets/ThemeSwitcher';
import { classNames } from '../../../../shared/lib/classNames';
import * as clss from './Sidebar.module.scss';
import { LangSwitcher } from '../../../../widgets/LangSwitcher';

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(true);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div className={classNames(clss.sidebar, { [clss.collapsed]: collapsed }, [className])}>
            <button type="button" onClick={onToggle}>Toggle</button>
            <div className={clss.switchers}>
                <ThemeSwitcher />
                <LangSwitcher />
                {/* <LangSwitcher className={clss.lang} /> */}
            </div>

        </div>
    );
}
