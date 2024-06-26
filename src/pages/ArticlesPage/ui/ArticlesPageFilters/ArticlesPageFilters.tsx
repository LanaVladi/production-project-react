import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ArticleTypeTabs } from '../../../../features/ArticleTypeTabs';
import { useDebounce } from '../../../../shared/lib/hooks/useDebounce/useDebounce';
import { fetchArticlesList } from '../../../../pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { SortOrder } from '../../../../shared/types/sort';
import { Card } from '../../../../shared/ui/Card/Card';
import { Input } from '../../../../shared/ui/Input/Input';
import { ArticleSortField, ArticleType, ArticleView } from '../../../../entities/Article';
import {
    getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort, getArticlesPageType, getArticlesPageView,
} from '../../../../pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { articlesPageActions } from '../../../../pages/ArticlesPage/model/slices/articlesPageSlice';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import clss from './ArticlesPageFilters.module.scss';
import { ArticleSortSelector } from '../../../../features/ArticleSortSelector';
import { ArticleViewSelector } from '../../../../features/ArticleViewSelector';

interface ArticlesPageFiltersProps {
   className?: string;
}

export const ArticlesPageFilters = (props: ArticlesPageFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const view = useSelector(getArticlesPageView);
    const dispatch = useAppDispatch();
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlesPageActions.setSearch(search));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    const onChangeType = useCallback((value: ArticleType) => {
        dispatch(articlesPageActions.setType(value));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    return (
        <div
            className={classNames(clss.articlesPageFilters, {}, [className])}
            data-testid="ArticlesPageFilters"
        >
            {/* <div className={clss.sortWrapper} data-testid="ArticlesPageFilters.ArticleSortViewSelector"> */}
            <div className={clss.sortWrapper}>
                <div data-testid="ArticlesPageFilters.ArticleSortSelector">
                    <ArticleSortSelector
                        sort={sort}
                        order={order}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                </div>
                <div data-testid="ArticlesPageFilters.ArticleViewSelector">
                    <ArticleViewSelector view={view} onViewClick={onChangeView} />
                </div>
            </div>
            <Card>
                <Input
                    data-testid="ArticlesPageFilters.SearchInput"
                    value={search}
                    onChange={onChangeSearch}
                    placeholder={t('Search')}
                />
            </Card>
            <ArticleTypeTabs
                value={type}
                onChangeType={onChangeType}
                className={clss.tabs}
            />
        </div>
    );
};
