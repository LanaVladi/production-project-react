/* eslint-disable react/no-unescaped-entities */
/* eslint-disable i18next/no-literal-string */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginModal } from '../../../features/AuthByUsername/ui';
import { classNames } from '../../../shared/lib/classNames/classNames';
import clss from './Navbar.module.scss';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';

interface NavbarProps {
    className?: string;

}

export function Navbar({ className }: NavbarProps) {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    return (
        <div className={classNames(clss.navbar, {}, [className])}>
            <Button className={classNames(clss.links)} theme={ButtonTheme.CLEAR} type="button" onClick={onShowModal}>
                {t('Sign in')}
            </Button>
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </div>
    );
}
