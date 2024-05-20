import React, {
    ReactNode, useCallback, useEffect,
} from 'react';
import { useTheme } from '../../../app/providers/themeProvider';
import { classNames, Mods } from '../../../shared/lib/classNames/classNames';
import { Overlay } from '../Overlay/Overlay';
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
    const { theme } = useTheme();

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
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const mods: Mods = {
        [clss.opened]: isOpen,
    };

    return (
    // <Portal>
    //     <div className={classNames(clss.Modal, mods, [className, theme, 'app_modal'])}>
    //         <Overlay onClick={closeHandler} />
    //         <div
    //             className={clss.content}
    //         >
    //             {children}
    //         </div>
    //     </div>
    // </Portal>

        <Portal>
            <div className={classNames(clss.modal, mods, [className])}>
                <div className={clss.overlay} onClick={closeHandler}>
                    <div className={classNames(clss.content, mods, [className])} onClick={onContentClick}>{children}</div>
                    {/* <Button className={clss.closebtn} onClick={closeHandler}>{t('CLOSE')}</Button> */}
                </div>
            </div>
        </Portal>

    );
}
