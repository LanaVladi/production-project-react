import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleCodeBlock } from '../../../../entities/Article/model/types/article';
import { Code } from '../../../../shared/ui/Code/Code';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
   className?: string;
   block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(clss.ArticleCodeBlockComponent, {}, [className])}>
            <Code text={block.code} />
        </div>
    );
});
