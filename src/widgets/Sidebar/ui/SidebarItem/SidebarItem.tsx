import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { AppLink, AppLinkTheme } from '../../../../shared/ui/appLink/AppLink';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model/items';
import { getUserAuthData } from '../../../../entities/User';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
            className={classNames(clss.item, { [clss.collapsed]: collapsed })}
        >
            <item.Icon className={clss.icon} />
            <span className={clss.link}>
                {t(item.text)}
            </span>
        </AppLink>
    );
});
