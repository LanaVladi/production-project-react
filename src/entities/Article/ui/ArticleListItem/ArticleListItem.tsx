import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Skeleton } from '../../../../shared/ui/Skeleton/Skeleton';
import { Avatar } from '../../../../shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from '../../../../shared/ui/Button/Button';
import { Card } from '../../../../shared/ui/Card/Card';
import EyeIcon from '../../../../shared/assets/icons/eye-20-20.svg';
import { Icon } from '../../../../shared/ui/Icon/Icon';
import { Text } from '../../../../shared/ui/Text/Text';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import cls from './ArticleListItem.module.scss';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleBlockType, ArticleView } from '../../model/consts/articleConsts';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { AppLink } from '../../../../shared/ui/appLink/AppLink';
import { getRouteArticleDetails } from '../../../../shared/const/router';
import { AppImage } from '../../../../shared/ui/AppImage';
import ListIcon from '../../../../shared/assets/icons/list-24-24.svg';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className, article, view, target,
    } = props;
    const { t } = useTranslation();

    const errorFallback = <Icon width={30} height={30} Svg={ListIcon} />;

    const types = <Text text={article.type.join(', ')} className={cls.types} />;
    const views = (
        <>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} />
        </>
    );

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <div
                data-testid="ArticleListItem"
                className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
            >
                <Card className={cls.card}>
                    <div className={cls.header}>
                        {/* <AppImage size={200} errorFallback={errorFallback} src={article?.img} className={cls.articleImg} /> */}

                        <Avatar size={30} src={article.user.avatar} className={cls.articleImg} />
                        <Text text={article.user.username} className={cls.username} />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <Text title={article.title} className={cls.title} />
                    {types}
                    {/* <AppImage
                        fallback={<Skeleton width="100%" height={250} />}
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                    /> */}
                    <img src={article.img} className={cls.img} alt={article.title} />
                    {textBlock && (
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
                    )}
                    <div className={cls.footer}>
                        <AppLink
                            target={target}
                            to={getRouteArticleDetails(article.id)}
                        >
                            <Button theme={ButtonTheme.OUTLINE}>
                                {t('Read more')}
                            </Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        >
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <img alt={article.title} src={article.img} className={cls.img} />
                    {/* <AppImage
                        fallback={<Skeleton width={200} height={200} />}
                        alt={article.title}
                        src={article.img}
                        className={cls.img}
                    /> */}
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    );
});
