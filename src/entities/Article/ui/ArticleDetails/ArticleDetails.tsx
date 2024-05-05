import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '../../../../shared/ui/Icon/Icon';
import { Avatar } from '../../../../shared/ui/Avatar/Avatar';
import { Skeleton } from '../../../../shared/ui/Skeleton/Skeleton';
import { Text, TextAlign, TextSize } from '../../../../shared/ui/Text/Text';
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
import EyeIcon from '../../../../shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '../../../../shared/assets/icons/calendar-20-20.svg';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleBlock, ArticleBlockType } from '../../../../entities/Article/model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';

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

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
        case ArticleBlockType.CODE:
            return (
                <ArticleCodeBlockComponent
                    key={block.id}
                    block={block}
                    className={clss.block}
                />
            );
        case ArticleBlockType.IMAGE:
            return (
                <ArticleImageBlockComponent
                    key={block.id}
                    block={block}
                    className={clss.block}
                />
            );
        case ArticleBlockType.TEXT:
            return (
                <ArticleTextBlockComponent
                    key={block.id}
                    className={clss.block}
                    block={block}
                />
            );
        default:
            return null;
        }
    }, []);

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
                title={t('There was an error loading the article')}
            />
        );
    } else {
        content = (
            <>
                <div className={clss.avatarWrapper}>
                    <Avatar size={200} src={article?.img} className={clss.avatar} />
                </div>

                <Text
                    title={article?.title}
                    text={article?.subtitle}
                    className={clss.title}
                    size={TextSize.L}
                />
                <div className={clss.articleInfo}>
                    <Icon className={clss.icon} Svg={EyeIcon} />
                    <Text
                        title={String(article?.views)}
                    />
                </div>
                <div className={clss.articleInfo}>
                    <Icon className={clss.icon} Svg={CalendarIcon} />
                    <Text
                        title={String(article?.createdAt)}
                    />
                </div>
                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(clss.articleDetails, {}, [className])}>
                {content}
            </div>
        </DynamicModuleLoader>
    );
});
