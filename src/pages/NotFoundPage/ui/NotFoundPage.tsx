import { useTranslation } from "react-i18next";
import { classNames } from "../../../shared/lib/classNames";
import * as clss from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string;
}

export function NotFoundPage({className}: NotFoundPageProps) {
    const { t } = useTranslation(); 
    return (
        <div className={classNames(clss.notfoundpage, {}, [className])}>
             {t('Page not found')}
        </div>
    )
}