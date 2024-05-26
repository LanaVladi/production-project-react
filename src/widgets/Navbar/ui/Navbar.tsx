import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Text, TextTheme } from '../../../shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from '../../../shared/ui/appLink/AppLink';
import { getRouteArticleCreate } from '../../../shared/const/router';
import { getUserAuthData } from '../../../entities/User';
import { LoginModal } from '../../../features/AuthByUsername/ui';
import { classNames } from '../../../shared/lib/classNames/classNames';
import clss from './Navbar.module.scss';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';
import { HStack } from '../../../shared/ui/Stack';
import { NotificationButton } from '../../../features/notificationButton';
import { AvatarDropdown } from '../../../features/avatarDropdown';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    if (authData) {
        return (
            <header className={classNames(clss.navbar, {}, [className])}>
                <Text className={clss.appName} title={t('Ulbi TV App')} theme={TextTheme.INVERTED} />
                <AppLink to={getRouteArticleCreate()} theme={AppLinkTheme.SECONDARY} className={clss.createBtn}>
                    {t('Create a new article')}
                </AppLink>

                <HStack gap="16" className={clss.actions}>
                    <NotificationButton />
                    <AvatarDropdown />
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
