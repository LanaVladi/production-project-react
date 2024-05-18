import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { VStack } from '../../../../shared/ui/Stack';
import { Text, TextSize } from '../../../../shared/ui/Text/Text';
import { ArticleList } from '../../../../entities/Article';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { data: articles, isLoading, error } = useArticleRecommendationsList(3);

    if (isLoading || error) {
        return null;
    } // TO DO: обязательно необходимо обрабатывать ошибки и при isLoading использовать Loader

    return (
        <VStack gap="8" className={classNames('', {}, [className])}>
            <Text
                size={TextSize.L}
                title={t('Recommendations')}
            />
            <ArticleList
                articles={articles}
                target="_blank"
            />
        </VStack>
    );
});