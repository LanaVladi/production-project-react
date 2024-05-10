import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Card } from '../../../../shared/ui/Card/Card';
import { Input } from '../../../../shared/ui/Input/Input';
import { Select } from '../../../../shared/ui/Select/Select';
import { ArticleView, ArticleViewSelector } from '../../../../entities/Article';
import { getArticlesPageView } from '../../../../pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { articlesPageActions } from '../../../../pages/ArticlesPage/model/slices/articlesPageSlice';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import clss from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
   className?: string;
}

export const ArticlesPageFilters = (props: ArticlesPageFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const view = useSelector(getArticlesPageView);
    const dispatch = useAppDispatch();

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    return (
        <div className={classNames(clss.articlesPageFilters, {}, [className])}>

            <div className={clss.sortWrapper}>
                <Select label={t('Sort by')} />
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Card>
                <Input placeholder={t('Search')} />
            </Card>
        </div>
    );
};
