import { useTranslation } from 'react-i18next';
import { classNames } from '../../../shared/lib/classNames/classNames';
import clss from './ErrorPage.module.scss';
import { Button } from '../../../shared/ui/Button/Button';

interface ErrorPageProps {
    className?: string;
}

export function ErrorPage({ className }: ErrorPageProps) {
    const { t } = useTranslation();

    const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
        location.reload(); //  перезагрузка страницы
    };

    return (
        <div className={classNames(clss.ErrorPage, {}, [className])}>
            <p>{t('An unexpected error occurred')}</p>
            <Button onClick={reloadPage}>
                {t('Refresh the page')}
            </Button>
        </div>
    );
}
