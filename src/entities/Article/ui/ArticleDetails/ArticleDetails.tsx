import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') { // если у нас среда storybook, то запросы не отправляются в других 'jest', 'frontend' иначе
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (<div>Loading...</div>);
    } else if (error) {
        content = (<div>error</div>);
    } else {
        content = (<div>'Article Details'</div>);
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
