import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign } from '../../../../shared/ui/Text/Text';
import { ArticleImageBlock } from '../../../../entities/Article/model/types/article';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
   className?: string;
   block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(clss.ArticleImageBlockComponent, {}, [className])}>
            <img src={block.src} alt={block.title} className={clss.img} />
            {block.title && (
                <Text text={block.title} align={TextAlign.CENTER} />
            )}
        </div>
    );
});
