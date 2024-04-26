import { Suspense } from 'react';
import { Loader } from '../../../../shared/ui/Loader/Loader';
import { Modal } from '../../../../shared/ui/Modal/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export function LoginModal({ className, isOpen, onClose }: LoginModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Suspense fallback={<Loader />}>
                <LoginFormAsync />
            </Suspense>
        </Modal>
    );
}
