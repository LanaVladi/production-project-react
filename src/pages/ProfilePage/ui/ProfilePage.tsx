import { useTranslation } from 'react-i18next';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, TextTheme } from '../../../shared/ui/Text/Text';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    fetchProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly, getProfileValidateErrors,
    profileActions, ProfileCard, profileReducer, ValidateProfileError,
} from '../../../entities/Profile';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import { Country } from '../../../entities/Country';
import { Currency } from '../../../entities/Currency';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: t('SERVER_ERROR'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('INCORRECT_COUNTRY'),
        [ValidateProfileError.NO_DATA]: t('NO_DATA'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('INCORRECT_USER_DATA'),
        [ValidateProfileError.INCORRECT_AGE]: t('INCORRECT_AGE'),
    };

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') { // если у нас среда storybook, то запросы не отправляются в других 'jest', 'frontend' иначе
            dispatch(fetchProfileData());
        }
    }, [dispatch]);

    const onChangeFirstName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ first: value || '' }));
    }, [dispatch]);

    const onChangeLastName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ lastname: value || '' }));
    }, [dispatch]);

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ city: value || '' }));
    }, [dispatch]);

    const onChangeAge = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
    }, [dispatch]);

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ username: value || '' }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }));
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({ currency }));
    }, [dispatch]);

    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({ country }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                <ProfilePageHeader />
                {validateErrors?.length && validateErrors.map((error) => (
                    <Text key={error} theme={TextTheme.ERROR} text={validateErrorTranslates[error]} />
                ))}
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                    onChangeFirstName={onChangeFirstName}
                    onChangeLastName={onChangeLastName}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />

                {/* <ProfilePageHeader />
                <ProfileCard
                    data={{ first: 'Vasya', lastname: 'Kakkak', age: 66 }}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                    onChangeFirstName={onChangeFirstName}
                    onChangeLastName={onChangeLastName}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                // onChangeCurrency={onChangeCurrency}
                // onChangeCountry={onChangeCountry}
                /> */}
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
