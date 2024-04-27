import { Suspense } from 'react';
import { Loader } from '../../../../shared/ui/Loader/Loader';
import { Modal } from '../../../../shared/ui/Modal/Modal';
// import LoginForm from '../LoginForm/LoginForm';
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
                {/* <LoginForm />  // для проверки размера бандла при прод */}
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
}
