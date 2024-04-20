import { useTranslation } from 'react-i18next';
import React from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import * as clss from './LangSwitcher.module.scss';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';

interface LangSwitcherProps {
    className?: string;
}

export function LangSwitcher({ className }: LangSwitcherProps) {
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
            {t('Language')}
        </Button>
    );
}
