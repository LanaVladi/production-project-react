import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleDetails } from '../../../../entities/Article';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './ArticlesPage.module.scss';

interface ArticlesPageProps {
   className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(clss.articlesPage, {}, [className])}>
            {t('Article Page')}
        </div>
    );
};

export default memo(ArticlesPage);
