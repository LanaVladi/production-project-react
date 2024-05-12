import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Page } from '../../../../widgets/Page/Page';
import { addCommentForArticle } from '../../../../pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle';
import { AddCommentForm } from '../../../../features/addCommentForm';
import { fetchCommentsByArticleId } from '../../../../pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { DynamicModuleLoader, ReducersList } from '../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsCommentsReducer, getArticleComments } from '../../../../pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice';
import { Text, TextSize } from '../../../../shared/ui/Text/Text';
import { CommentList } from '../../../../entities/Comment';
import { ArticleDetails, ArticleList } from '../../../../entities/Article';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './ArticleDetailsPage.module.scss';
import { getArticleCommentsIsLoading } from '../../../../pages/ArticleDetailsPage/model/selectors/comments';
import { useInitialEffect } from '../../../../shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from '../../../../shared/ui/Button/Button';
import { RoutePath } from '../../../../shared/config/routerConfig/routerConfig';
import {
    articleDetailsPageRecommendationsReducer,
    getArticleRecommendations,
} from '../../../../pages/ArticleDetailsPage/model/slices/articleDetailsPageRecommendationsSlice';
import { getArticleRecommendationsIsLoading } from '../../../../pages/ArticleDetailsPage/model/selectors/recommendations';
import {
    fetchArticleRecommendations,
} from '../../../../pages/ArticleDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations';

interface ArticleDetailsPageProps {
   className?: string;
}

const reducers:ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
    articleDetailsRecommendations: articleDetailsPageRecommendationsReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
    });

    if (!id) {
        return (
            <Page className={classNames(clss.ArticleDetailsPage, {}, [className])}>
                {t('Article not found')}
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(clss.articleDetailsPage, {}, [className])}>
                <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                    {t('Back to list')}
                </Button>
                <ArticleDetails id={id} />
                <Text
                    size={TextSize.L}
                    className={clss.commentTitle}
                    title={t('Recommendations')}
                />
                <ArticleList
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    className={clss.recommendations}
                />
                <Text className={clss.commentTitle} title={t('Comments')} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </Page>
        </DynamicModuleLoader>

    );
};

export default memo(ArticleDetailsPage);
