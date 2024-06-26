import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { initArticlesPage } from '../../../../pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage';
import { fetchNextArticlesPage } from '../../../../pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { DynamicModuleLoader, ReducersList } from '../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../../../pages/ArticlesPage/model/slices/articlesPageSlice';
import { ArticleView } from '../../../../entities/Article';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './ArticlesPage.module.scss';
import { getArticlesPageView, useArticleItemById } from '../../../../pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '../../../../widgets/Page/ui/Page';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '../../../../shared/const/localstorage';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlePageGreeting } from '../../../../features/articlePageGreeting';

interface ArticlesPageProps {
   className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const [searchParams] = useSearchParams();
    // const data = useArticleItemById('7'); // buildSelector usage example
    // console.log('data:', data);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView;
            dispatch(initArticlesPage({ view, searchParams }));
        }
    }, [dispatch, searchParams, view]);

    const reducers: ReducersList = {
        articlesPage: articlesPageReducer,
    };

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                data-testid="ArticlesPage"
                onScrollEnd={onLoadNextPart}
                className={classNames(clss.articlesPage, {}, [className])}
            >
                <ArticlesPageFilters />
                <ArticleInfiniteList className={clss.list} />
                <ArticlePageGreeting />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
