import { useTranslation } from 'react-i18next';
import FocusLock from 'react-focus-lock';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { Input } from '../../../../shared/ui/Input/Input';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '../../../../shared/ui/Button/Button';
import clss from './LoginForm.module.scss';
import { loginActions } from '../../model/slice/LoginSlice';
import { Text, TextTheme } from '../../../../shared/ui/Text/Text';

export interface LoginFormProps {
    className?: string;
}

const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const loginForm = useSelector(getLoginState);
    const {
        username, password, isLoading, error,
    } = loginForm;

    const handleChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const handleChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const handleClickSignIn = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, password, username]);

    return (
        <div className={classNames(clss.loginForm, {}, [className])}>
            <Text title={t('Authorization form')} theme={TextTheme.PRIMARY} />
            {error && <Text text={t('Incorrect username or password')} theme={TextTheme.ERROR} />}
            <FocusLock>
                <Input
                    type="text"
                    className={classNames(clss.input)}
                    placeholder={t('Enter username')}
                    onChange={handleChangeUsername}
                    value={username}
                />
                <Input
                    type="text"
                    className={classNames(clss.input)}
                    placeholder={t('Enter password')}
                    onChange={handleChangePassword}
                    value={password}
                />
            </FocusLock>

            <Button
                className={classNames(clss.loginbtn)}
                theme={ButtonTheme.OUTLINE}
                type="button"
                onClick={handleClickSignIn}
                disabled={isLoading}
            >
                {t('Sign in')}
            </Button>
        </div>
    );
});

export default LoginForm;
