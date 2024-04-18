import { useTranslation } from 'react-i18next';
import React from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import clss from './LangSwitcher.module.scss';
import { Button, ButtonTheme } from '../../../shared/ui/appLink/Button/Button';

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
            className={classNames(clss.langswitcher, {}, [])}
            theme={ButtonTheme.CLEAR}
            onClick={toggleLang}
        >
            {t('Language')}
        </Button>
    );
}
