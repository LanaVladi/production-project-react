import { useTranslation } from 'react-i18next';
import FocusLock from 'react-focus-lock';
import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import { DynamicModuleLoader } from '../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ReduxStoreWithManager } from '../../../../app/providers/StoreProvider';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { Input } from '../../../../shared/ui/Input/Input';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '../../../../shared/ui/Button/Button';
import clss from './LoginForm.module.scss';
import { loginActions, loginReducer } from '../../model/slice/LoginSlice';
import { Text, TextTheme } from '../../../../shared/ui/Text/Text';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';

export interface LoginFormProps {
    className?: string;
}

const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

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
        // eslint-disable-next-line i18next/no-literal-string
        <DynamicModuleLoader removeAfterUnmount name="LoginForm" reducer={loginReducer}>
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
        </DynamicModuleLoader>
    );
});

export default LoginForm;
