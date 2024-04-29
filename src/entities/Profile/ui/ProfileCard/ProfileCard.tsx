import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { getProfileData } from '../../../../entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileIsLoading } from '../../../../entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../../../entities/Profile/model/selectors/getProfileError/getProfileError';
import { Text } from '../../../../shared/ui/Text/Text';
import { Button, ButtonTheme } from '../../../../shared/ui/Button/Button';
import { Input } from '../../../../shared/ui/Input/Input';
import clss from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
    const { t } = useTranslation('profile');
    const data = useSelector(getProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);

    return (
        <div className={classNames(clss.ProfileCard, {}, [className])}>
            <div className={clss.header}>
                <Text title={t('Profile')} />
                <Button
                    className={clss.editBtn}
                    theme={ButtonTheme.OUTLINE}
                >
                    {t('Edit')}
                </Button>
            </div>
            <div className={clss.data}>
                <Input
                    value={data?.first}
                    placeholder={t('Your name')}
                    className={clss.input}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Your lastname')}
                    className={clss.input}
                />
            </div>
        </div>
    );
};
