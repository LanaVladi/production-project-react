import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { VStack } from '../../../../shared/ui/Stack';
import { Text, TextSize } from '../../../../shared/ui/Text/Text';
import { ArticleList } from '../../../../entities/Article';
import { rtkApi } from '../../../../shared/api/rtkApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,

                },

            }),
        }),
    }),
});

const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { data: articles, isLoading, error } = useArticleRecommendationsList(3);
    // const recommendations = useSelector(getArticleRecommendations.selectAll);
    // const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);

    // useInitialEffect(() => {
    //     // dispatch(fetchArticleRecommendations());
    // });
    if (isLoading || error) {
        return null;
    }

    return (
        <VStack gap="8" className={classNames('', {}, [className])}>
            <Text
                size={TextSize.L}
                // className={clss.commentTitle}
                title={t('Recommendations')}
            />
            <ArticleList
                articles={articles}
                // isLoading={recommendationsIsLoading}
                // className={clss.recommendations}
                target="_blank"
            />
        </VStack>
    );
});
