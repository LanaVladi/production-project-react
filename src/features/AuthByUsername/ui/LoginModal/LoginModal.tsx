import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Modal } from '../../../../shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import clss from './LoginModal.module.scss';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export function LoginModal({ className, isOpen, onClose }: LoginModalProps) {
    return (
        <Modal className={classNames(clss.loginModal, {}, [className])} isOpen={isOpen} onClose={onClose}>
            <LoginForm />
        </Modal>
    );
}
