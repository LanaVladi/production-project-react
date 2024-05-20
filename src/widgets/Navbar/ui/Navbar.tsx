import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Popover } from '../../../shared/ui/Popups';
import { Dropdown } from '../../../shared/ui/Popups/ui/Dropdown/Dropdown';
import { Avatar } from '../../../shared/ui/Avatar/Avatar';
import { Text, TextTheme } from '../../../shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from '../../../shared/ui/appLink/AppLink';
import { RoutePath } from '../../../shared/config/routerConfig/routerConfig';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '../../../entities/User';
import { LoginModal } from '../../../features/AuthByUsername/ui';
import { classNames } from '../../../shared/lib/classNames/classNames';
import clss from './Navbar.module.scss';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';
import { HStack } from '../../../shared/ui/Stack';
import { Icon } from '../../../shared/ui/Icon/Icon';
import NotificationIcon from '../../../shared/assets/icons/notification-20-20.svg';
import { NotificationList } from '../../../entities/Notification';

interface NavbarProps {
    className?: string;

}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogOut = useCallback(() => {
        dispatch(userActions.logOut());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (authData) {
        return (
            <header className={classNames(clss.navbar, {}, [className])}>
                <Text className={clss.appName} title={t('Ulbi TV App')} theme={TextTheme.INVERTED} />
                <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY} className={clss.createBtn}>
                    {t('Create a new article')}
                </AppLink>

                <HStack gap="16" className={clss.actions}>
                    <Popover
                        direction="bottom left"
                        trigger={(
                            <Button theme={ButtonTheme.CLEAR}>
                                <Icon Svg={NotificationIcon} inverted />
                            </Button>
                        )}
                    >
                        <NotificationList />
                    </Popover>

                    <Dropdown
                        direction="bottom left"
                        trigger={<Avatar size={30} src={authData.avatar} />}
                        items={[

                            ...(isAdminPanelAvailable ? [{
                                content: t('Admin Panel'),
                                href: RoutePath.admin_panel,
                            }] : []), // разворачиваем массив и в нем условие, если isAdminPanelAvailable,
                            // то у нас отрисовывается массив с админ панелью, если нет, то пустой
                            {
                                content: t('Profile'),
                                href: RoutePath.profile + authData.id,
                            },
                            {
                                content: t('Sign out'),
                                onClick: onLogOut,
                            },
                        ]}
                    />
                </HStack>
            </header>
        );
    }

    return (

        <header className={classNames(clss.navbar, {}, [className])}>
            <Button className={classNames(clss.links)} theme={ButtonTheme.CLEAR} type="button" onClick={onShowModal}>
                {t('Sign in')}
            </Button>
            {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
        </header>
    );
});
