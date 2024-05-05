import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import clss from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';

interface ArticleListProps {
    className?: string;
    articles: Article[]
    isLoading?: boolean;
    view?: ArticleView;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.SMALL,
        isLoading,
    } = props;
    const { t } = useTranslation();

    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
            view={view}
            className={clss.card}
            key={article.id}
        />
    );

    return (
        <div className={classNames(clss.ArticleList, {}, [className, clss[view]])}>
            {articles.length > 0
                ? articles.map(renderArticle)
                : null}
        </div>
    );
});
