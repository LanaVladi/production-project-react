import React, {
    ReactNode, useCallback, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Button } from '../Button/Button';
import { Portal } from '../Portal/Portal';
import clss from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export function Modal(props: ModalProps) {
    const {
        className, children, isOpen, onClose,
    } = props;

    const { t } = useTranslation();

    const closeHandler = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (isOpen && e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler, isOpen]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onkeydown);
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const mods: Record<string, boolean> = {
        [clss.opened]: isOpen,
        [clss.theme]: true,
    };

    return (
        <Portal>
            <div className={classNames(clss.modal, mods, [className])}>
                <div className={clss.overlay} onClick={closeHandler}>
                    <div className={clss.content} onClick={onContentClick}>{children}</div>
                    <Button className={clss.closebtn} onClick={closeHandler}>{t('CLOSE')}</Button>
                </div>
            </div>
        </Portal>

    );
}
