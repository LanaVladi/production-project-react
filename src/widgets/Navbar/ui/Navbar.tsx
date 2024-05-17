import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '../../../shared/ui/Dropdown/Dropdown';
import { Avatar } from '../../../shared/ui/Avatar/Avatar';
import { Text, TextTheme } from '../../../shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from '../../../shared/ui/appLink/AppLink';
import { RoutePath } from '../../../shared/config/routerConfig/routerConfig';
import { getUserAuthData, userActions } from '../../../entities/User';
import { LoginModal } from '../../../features/AuthByUsername/ui';
import { classNames } from '../../../shared/lib/classNames/classNames';
import clss from './Navbar.module.scss';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';

interface NavbarProps {
    className?: string;

}

export const Navbar = memo(({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);
    const { t } = useTranslation();

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogOut = useCallback(() => {
        dispatch(userActions.logOut());
    }, [dispatch]);

    if (authData) {
        return (
            <header className={classNames(clss.navbar, {}, [className])}>
                <Text className={clss.appName} title={t('Ulbi TV App')} theme={TextTheme.INVERTED} />
                <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY} className={clss.createBtn}>
                    {t('Create a new article')}
                </AppLink>

                <Dropdown
                    direction="bottom left"
                    className={clss.dropdown}
                    trigger={<Avatar size={30} src={authData.avatar} />}
                    items={[
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
