import { useTranslation } from 'react-i18next';
import { classNames } from '../../../shared/lib/classNames';
import * as clss from './LangSwitcher.module.scss';
import { Button, ButtonTheme } from '../../../shared/ui/appLink/Button/Button';

interface LangSwitcherProps {
    className?: string;
}

export function LangSwitcher({ className }: LangSwitcherProps) {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
    };

    return (
        <Button
            className={classNames(clss.langswitcher, {}, [className])}
            theme={ButtonTheme.CLEAR}
            onClick={toggleLang}
        >
            {t('Language')}
        </Button>
    );
}
