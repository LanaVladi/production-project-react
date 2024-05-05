import { memo } from 'react';
import EyeIcon from '../../../../shared/assets/icons/eye-20-20.svg';
import { Icon } from '../../../../shared/ui/Icon/Icon';
import { Text } from '../../../../shared/ui/Text/Text';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import cls from './ArticleListItem.module.scss';
import {
    Article, ArticleView,
} from '../../model/types/article';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { className, article, view } = props;

    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <div className={cls.card}>
                <div className={cls.imageWrapper}>
                    <img alt={article.title} src={article.img} className={cls.img} />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    <Text text={article.type.join(', ')} className={cls.types} />
                    <Text text={String(article.views)} className={cls.views} />
                </div>
                <Text text={article.title} className={cls.title} />
                <Icon Svg={EyeIcon} />
            </div>
        </div>
    );
});
