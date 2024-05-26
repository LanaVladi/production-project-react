import { useTranslation } from 'react-i18next';
import { classNames } from '../../../shared/lib/classNames/classNames';
import clss from './NotFoundPage.module.scss';
// import * as clss from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string;
}

export function NotFoundPage({ className }: NotFoundPageProps) {
    const { t } = useTranslation();
    return (
        <div data-testid="NotFoundPage" className={classNames(clss.notfoundpage, {}, [className])}>
            {t('Page not found')}
        </div>
    );
}
