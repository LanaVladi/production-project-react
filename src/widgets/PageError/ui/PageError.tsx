import { useTranslation } from 'react-i18next';
import { classNames } from '../../../shared/lib/classNames';
import * as clss from './PageError.module.scss';
import { Button } from '../../../shared/ui/appLink/Button/Button';

interface PageErrorProps {
    className?: string;
}

export function PageError({ className }: PageErrorProps) {
    const { t } = useTranslation();

    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload(); //  перезагрузка страницы
    };

    return (
        <div className={classNames(clss.pageerror, {}, [className])}>
            <p>{t('Произошла непредвиденная ошибка')}</p>
            <Button onClick={reloadPage}>
                {t('Обновить страницу')}
            </Button>
        </div>
    );
}
