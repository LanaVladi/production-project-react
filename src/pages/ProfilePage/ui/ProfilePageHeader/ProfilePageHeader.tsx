import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { getUserAuthData } from '../../../../entities/User';
import {
    getProfileData, getProfileReadonly, profileActions, updateProfileData,
} from '../../../../entities/Profile';
import { Button, ButtonTheme } from '../../../../shared/ui/Button/Button';
import { Text } from '../../../../shared/ui/Text/Text';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import clss from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const isCanEdit = authData?.id === profileData?.id;
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <div className={classNames(clss.ProfilePageHeader, {}, [className])}>
            <Text title={t('Profile')} />
            {isCanEdit && (
                <div className={clss.btnsWrapper}>
                    {readonly
                        ? (
                            <Button
                                className={clss.editBtn}
                                theme={ButtonTheme.OUTLINE}
                                onClick={onEdit}
                            >
                                {t('Edit')}
                            </Button>
                        )
                        : (
                            <>
                                <Button
                                    className={clss.editBtn}
                                    theme={ButtonTheme.OUTLINE_RED}
                                    onClick={onCancelEdit}
                                >
                                    {t('Cancel')}
                                </Button>
                                <Button
                                    className={clss.saveBtn}
                                    theme={ButtonTheme.OUTLINE}
                                    onClick={onSave}
                                >
                                    {t('Save')}
                                </Button>
                            </>
                        )}
                </div>
            )}

        </div>
    );
};
