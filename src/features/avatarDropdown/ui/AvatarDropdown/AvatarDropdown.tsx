import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown } from '../../../../shared/ui/Popups';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '../../../../entities/User';
import { Avatar } from '../../../../shared/ui/Avatar/Avatar';
import { getRouteAdmin, getRouteProfile } from '../../../../shared/const/router';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const authData = useSelector(getUserAuthData);

    const onLogOut = useCallback(() => {
        dispatch(userActions.logOut());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (!authData) {
        return null;
    }

    return (

        <Dropdown
            direction="bottom left"
            className={classNames('', {}, [className])}
            items={[

                ...(isAdminPanelAvailable ? [{
                    content: t('Admin Panel'),
                    href: getRouteAdmin(),
                }] : []), // разворачиваем массив и в нем условие, если isAdminPanelAvailable,
                // то у нас отрисовывается массив с админ панелью, если нет, то пустой
                {
                    content: t('Profile'),
                    href: getRouteProfile(authData.id),
                },
                {
                    content: t('Sign out'),
                    onClick: onLogOut,
                },
            ]}
            trigger={<Avatar fallbackInverted size={30} src={authData.avatar} />}
        />
    );
});
