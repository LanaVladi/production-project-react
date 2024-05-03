import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Text } from '../../../../shared/ui/Text/Text';
import { CommentList } from '../../../../entities/Comment';
import { ArticleDetails } from '../../../../entities/Article';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
   className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();

    if (!id) {
        return (
            <div className={classNames(clss.ArticleDetailsPage, {}, [className])}>
                {t('Article not found')}
            </div>
        );
    }

    return (
        <div className={classNames(clss.articleDetailsPage, {}, [className])}>
            <ArticleDetails id={id} />
            <Text className={clss.commentTitle} title={t('Comments')} />
            <CommentList
                isLoading
                comments={[]}
            />
        </div>
    );
};

export default memo(ArticleDetailsPage);
