import { useTranslation } from 'react-i18next';
import FocusLock from 'react-focus-lock';
import { Input } from '../../../../shared/ui/Input/Input';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '../../../../shared/ui/Button/Button';
import clss from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export function LoginForm({ className }: LoginFormProps) {
    const { t } = useTranslation();

    return (
        <div className={classNames(clss.loginForm, {}, [className])}>
            <FocusLock>
                <Input type="text" className={classNames(clss.input)} placeholder={t('Enter username')} />
                <Input type="text" className={classNames(clss.input)} placeholder={t('Enter password')} />
            </FocusLock>

            <Button className={classNames(clss.loginbtn)} theme={ButtonTheme.CLEAR} type="button">
                {t('Sign in')}
            </Button>
        </div>
    );
}
