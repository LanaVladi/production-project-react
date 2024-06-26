import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppImage } from '../../../../shared/ui/AppImage';
import { HStack, VStack } from '../../../../shared/ui/Stack';
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
import { ArticleBlock } from '../../../../entities/Article/model/types/article';
import { ArticleBlockType } from '../../../../entities/Article/model/consts/articleConsts';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import ListIcon from '../../../../shared/assets/icons/list-24-24.svg';

interface ArticleDetailsProps {
   className?: string;
   id?: string;
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

    const errorFallback = <Icon width={100} height={100} Svg={ListIcon} />;

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
                <HStack justify="center" max className={clss.avatarWrapper}>
                    <AppImage size={200} errorFallback={errorFallback} src={article?.img} className={clss.articleImg} />
                </HStack>
                <VStack gap="4" max data-testid="ArticleDetails.Info">
                    <Text
                        data-testid="ArticleDetails.Info.ArticleTitle"
                        title={article?.title}
                        text={article?.subtitle}
                        className={clss.title}
                        size={TextSize.L}
                    />
                    <HStack gap="8" className={clss.articleInfo}>
                        <Icon className={clss.icon} Svg={EyeIcon} />
                        <Text
                            data-testid="ArticleDetails.Info.ArticleViews"
                            title={String(article?.views)}
                        />
                    </HStack>
                    <HStack gap="8" className={clss.articleInfo}>
                        <Icon className={clss.icon} Svg={CalendarIcon} />
                        <Text
                            data-testid="ArticleDetails.Info.ArticleCreatedAt"
                            title={String(article?.createdAt)}
                        />
                    </HStack>
                </VStack>
                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack gap="16" max className={classNames(clss.ArticleDetails, {}, [className])}>
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
