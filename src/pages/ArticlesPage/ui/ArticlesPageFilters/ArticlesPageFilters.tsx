import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { TabItem, Tabs } from '../../../../shared/ui/Tabs/Tabs';
import { useDebounce } from '../../../../shared/lib/hooks/useDebounce/useDebounce';
import { fetchArticlesList } from '../../../../pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { ArticleSortSelector } from '../../../../entities/Article/ui/ArticleSortSelector/ArticleSortSelector';
import { SortOrder } from '../../../../shared/types';
import { Card } from '../../../../shared/ui/Card/Card';
import { Input } from '../../../../shared/ui/Input/Input';
import { Select } from '../../../../shared/ui/Select/Select';
import {
    ArticleSortField, ArticleType, ArticleView, ArticleViewSelector,
} from '../../../../entities/Article';
import {
    getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort, getArticlesPageType, getArticlesPageView,
} from '../../../../pages/ArticlesPage/model/selectors/articlesPageSelectors';
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
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);

    const typeTabs = useMemo<TabItem[]>(() => [
        {
            value: ArticleType.ALL,
            content: t('All'),

        },
        {
            value: ArticleType.IT,
            content: t('IT'),
        },
        {
            value: ArticleType.ECONOMICS,
            content: t('Economics'),
        },
        {
            value: ArticleType.SCIENCE,
            content: t('Science'),
        },
    ], [t]);

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

    const onChangeType = useCallback((tab: TabItem) => {
        dispatch(articlesPageActions.setType(tab.value as ArticleType));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    return (
        <div className={classNames(clss.articlesPageFilters, {}, [className])}>

            <div className={clss.sortWrapper}>
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Card>
                <Input value={search} onChange={onChangeSearch} placeholder={t('Search')} />
            </Card>
            <Tabs tabs={typeTabs} value={type} onTabClick={onChangeType} className={clss.tabs} />
        </div>
    );
};
