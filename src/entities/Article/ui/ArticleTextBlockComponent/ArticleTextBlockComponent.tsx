import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleTextBlock } from '../../../../entities/Article/model/types/article';
import { Text } from '../../../../shared/ui/Text/Text';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
   className?: string;
   block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(clss.articleTextBlockComponent, {}, [className])}>
            {block.title && (
                <Text title={block.title} className={clss.title} />
            )}
            {block.paragraphs.map((paragraph, index) => (
                <Text key={paragraph} text={paragraph} className={clss.paragraph} />
            ))}
        </div>
    );
});
