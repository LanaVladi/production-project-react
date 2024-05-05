import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleBlockType, ArticleType } from '../../../../entities/Article/model/types/article';
import {
    Article, ArticleDetails, ArticleList, ArticleView,
} from '../../../../entities/Article';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { data as article } from '../../../../entities/Article/mocks/data';
import clss from './ArticlesPage.module.scss';

interface ArticlesPageProps {
   className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(clss.articlesPage, {}, [className])}>
            <ArticleList
                view={ArticleView.BIG}
                articles={
                    new Array(16)
                        .fill(0)
                        .map((item, index) => ({
                            ...article,
                            id: String(index),
                        }))
                }
            />
        </div>
    );
};

export default memo(ArticlesPage);
