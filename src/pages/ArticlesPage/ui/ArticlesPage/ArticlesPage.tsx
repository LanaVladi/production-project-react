import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { initArticlesPage } from '../../../../pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage';
import { useInitialEffect } from '../../../../shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchNextArticlesPage } from '../../../../pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { DynamicModuleLoader, ReducersList } from '../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageActions, articlesPageReducer, getArticles } from '../../../../pages/ArticlesPage/model/slices/articlesPageSlice';
import {
    ArticleList, ArticleView, ArticleViewSelector,
} from '../../../../entities/Article';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './ArticlesPage.module.scss';
import {
    getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView,
} from '../../../../pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '../../../../shared/ui/Page/Page';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '../../../../shared/const/localstorage';

interface ArticlesPageProps {
   className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView;
            dispatch(initArticlesPage(view));
        }
    }, [dispatch, view]);

    const reducers: ReducersList = {
        articlesPage: articlesPageReducer,
    };

    if (error) {
        return (
            <DynamicModuleLoader reducers={reducers}>
                <Page className={classNames(clss.articlesPage, {}, [className])}>
                    <ArticleViewSelector view={view} onViewClick={onChangeView} />
                    <div>{t('Data not found')}</div>

                </Page>
            </DynamicModuleLoader>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page onScrollEnd={onLoadNextPart} className={classNames(clss.articlesPage, {}, [className])}>
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <ArticleList
                    view={view}
                    articles={articles}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
