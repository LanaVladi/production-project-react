import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from '../../../entities/User';
import { LoginModal } from '../../../features/AuthByUsername/ui';
import { classNames } from '../../../shared/lib/classNames/classNames';
import clss from './Navbar.module.scss';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';

interface NavbarProps {
    className?: string;

}

export function Navbar({ className }: NavbarProps) {
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
            <div className={classNames(clss.navbar, {}, [className])}>
                <Button className={classNames(clss.links)} theme={ButtonTheme.CLEAR} type="button" onClick={onLogOut}>
                    {t('Sign out')}
                </Button>
            </div>
        );
    }

    return (

        <div className={classNames(clss.navbar, {}, [className])}>
            <Button className={classNames(clss.links)} theme={ButtonTheme.CLEAR} type="button" onClick={onShowModal}>
                {t('Sign in')}
            </Button>
            {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
        </div>
    );
}
