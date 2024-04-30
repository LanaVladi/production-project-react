import { useTranslation } from 'react-i18next';
import { Loader } from '../../../../shared/ui/Loader/Loader';
import { classNames, Mods } from '../../../../shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from '../../../../shared/ui/Text/Text';
import { Input } from '../../../../shared/ui/Input/Input';
import clss from './ProfileCard.module.scss';
import { Profile } from '../../../../entities/Profile/model/types/profile';
import { Avatar } from '../../../../shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from '../../../../entities/Currency';
import { Country, CountrySelect } from '../../../../entities/Country';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeFirstName?: (value?: string) => void;
    onChangeLastName?:(value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = (props : ProfileCardProps) => {
    const {
        className, data, isLoading, error, readonly, onChangeFirstName, onChangeLastName,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    } = props;

    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <div className={classNames(clss.ProfileCard, { [clss.loading]: true }, [className])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(clss.ProfileCard, {}, [className, clss.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Error text')}
                    text={t('Try refreshing the page')}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    const mods: Mods = {
        [clss.editing]: !readonly,
    };

    return (
        <div className={classNames(clss.ProfileCard, {}, [className])}>
            <div className={clss.data}>
                {data?.avatar && (
                    <div className={clss.avatarWrapper}>
                        <Avatar src={data?.avatar} />
                    </div>
                )}
                <Input
                    value={data?.first}
                    placeholder={t('Your name')}
                    className={clss.input}
                    onChange={onChangeFirstName}
                    readonly={readonly}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Your lastname')}
                    className={clss.input}
                    onChange={onChangeLastName}
                    readonly={readonly}
                />
                <Input
                    value={data?.age}
                    placeholder={t('Age')}
                    className={clss.input}
                    onChange={onChangeAge}
                    readonly={readonly}
                />
                <Input
                    value={data?.city}
                    placeholder={t('City')}
                    className={clss.input}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                <Input
                    value={data?.username}
                    placeholder={t('Enter username')}
                    className={clss.input}
                    onChange={onChangeUsername}
                    readonly={readonly}
                />
                <Input
                    value={data?.avatar}
                    placeholder={t('Enter a link to your avatar', { ns: 'profile' })}
                    className={clss.input}
                    onChange={onChangeAvatar}
                    readonly={readonly}
                />
                <CurrencySelect
                    className={clss.input}
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    className={clss.input}
                    value={data?.country}
                    onChange={onChangeCountry}
                    readonly={readonly}
                />
            </div>
        </div>
    );
};
