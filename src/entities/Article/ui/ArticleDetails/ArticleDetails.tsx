/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Skeleton } from '../../../../shared/ui/Skeleton/Skeleton';
import { Text, TextAlign } from '../../../../shared/ui/Text/Text';
import {
    getArticleDetailsData, getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../../../entities/Article/model/selectors/articleDetails';
import { fetchArticleById } from '../../../../entities/Article/model/services/fetchArticleById/fetchArticleById';
import { DynamicModuleLoader, ReducersList } from '../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './ArticleDetails.module.scss';
import { articleDetailsReducer } from '../../../../entities/Article/model/slice/articleDetailsSlice';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';

interface ArticleDetailsProps {
   className?: string;
   id: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};
export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = true;
    // const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') { // если у нас среда storybook, то запросы не отправляются в других 'jest', 'frontend' иначе
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton className={clss.avatar} width={200} height={200} border="50%" />
                <Skeleton className={clss.title} width={300} height={32} />
                <Skeleton className={clss.skeleton} width={600} height={24} />
                <Skeleton className={clss.skeleton} width="100%" height={200} />
                <Skeleton className={clss.skeleton} width="100%" height={200} />
            </>
        );
    } else if (error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                title={t('Произошла ошибка при загрузке статьи')}
            />
        );
    } else {
        content = (<div>Article Details</div>);
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(clss.articleDetails, {}, [className])}>
                {content}
                {/* {t('Article Details')} */}
            </div>
        </DynamicModuleLoader>
    );
});
