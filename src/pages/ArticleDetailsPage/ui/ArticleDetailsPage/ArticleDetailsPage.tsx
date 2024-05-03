import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchCommentsByArticleId } from '../../../../pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { DynamicModuleLoader, ReducersList } from '../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsCommentsReducer, getArticleComments } from '../../../../pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice';
import { Text } from '../../../../shared/ui/Text/Text';
import { CommentList } from '../../../../entities/Comment';
import { ArticleDetails } from '../../../../entities/Article';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './ArticleDetailsPage.module.scss';
import { getArticleCommentsIsLoading } from '../../../../pages/ArticleDetailsPage/model/selectors/comments';
import { useInitialEffect } from '../../../../shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';

interface ArticleDetailsPageProps {
   className?: string;
}

const reducers:ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    if (!id) {
        return (
            <div className={classNames(clss.ArticleDetailsPage, {}, [className])}>
                {t('Article not found')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(clss.articleDetailsPage, {}, [className])}>
                <ArticleDetails id={id} />
                <Text className={clss.commentTitle} title={t('Comments')} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </div>
        </DynamicModuleLoader>

    );
};

export default memo(ArticleDetailsPage);
