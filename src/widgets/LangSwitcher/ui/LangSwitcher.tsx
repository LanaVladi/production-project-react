import { useTranslation } from 'react-i18next';
import { classNames } from '../../../shared/lib/classNames/classNames';
import clss from './LangSwitcher.module.scss';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export function LangSwitcher({ className, short }: LangSwitcherProps) {
    const { t, i18n } = useTranslation();

    const toggleLang = async () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
    };

    return (
        <Button
            className={classNames(clss.langswitcher, {}, [className])}
            theme={ButtonTheme.CLEAR}
            onClick={toggleLang}
        >
            {t(short ? 'En' : 'English')}
        </Button>
    );
}
