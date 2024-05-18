/* eslint-disable max-len */
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
                    aAFAFAF: 'ggggkfakgfkgfa;kkzgalgmjgljnjgsghlnhafkhhhhhhhhhhhhhhhhhhhhhhhhhhhhafhyufffffffffffhhhhhhhhhhhhhhhhhhhhhhhhhhhw555555555555555555555555555555555555555555555555555555555555555555555555555222222222222222222222222222222222222222ffffffffffffffffffffffffffffffffffffffffffffff',
                    aAFAFAF2: 'ggggkfakgfkgfa;kkzgalgmjgljnjgsghlnhafkhhhhhhhhhhhhhhhhhhhhhhhhhhhhafhyufffffffffffhhhhhhhhhhhhhhhhhhhhhhhhhhhw555555555555555555555555555555555555555555555555555555555555555555555555555222222222222222222222222222222222222222ffffffffffffffffffffffffffffffffffffffffffffff',
                    aAFAFAF3: 'ggggkfakgfkgfa;kkzgalgmjgljnjgsghlnhafkhhhhhhhhhhhhhhhhhhhhhhhhhhhhafhyufffffffffffhhhhhhhhhhhhhhhhhhhhhhhhhhhw555555555555555555555555555555555555555555555555555555555555555555555555555222222222222222222222222222222222222222ffffffffffffffffffffffffffffffffffffffffffffff',
                    aAFAFAF4: 'ggggkfakgfkgfa;kkzgalgmjgljnjgsghlnhafkhhhhhhhhhhhhhhhhhhhhhhhhhhhhafhyufffffffffffhhhhhhhhhhhhhhhhhhhhhhhhhhhw555555555555555555555555555555555555555555555555555555555555555555555555555222222222222222222222222222222222222222ffffffffffffffffffffffffffffffffffffffffffffff',
                    aAFAFAF5: 'ggggkfakgfkgfa;kkzgalgmjgljnjgsghlnhafkhhhhhhhhhhhhhhhhhhhhhhhhhhhhafhyufffffffffffhhhhhhhhhhhhhhhhhhhhhhhhhhhw555555555555555555555555555555555555555555555555555555555555555555555555555222222222222222222222222222222222222222ffffffffffffffffffffffffffffffffffffffffffffff',
                    aAFAFAF7: 'ggggkfakgfkgfa;kkzgalgmjgljnjgsghlnhafkhhhhhhhhhhhhhhhhhhhhhhhhhhhhafhyufffffffffffhhhhhhhhhhhhhhhhhhhhhhhhhhhw555555555555555555555555555555555555555555555555555555555555555555555555555222222222222222222222222222222222222222ffffffffffffffffffffffffffffffffffffffffffffff',
                    aAFAFAF8: 'ggggkfakgfkgfa;kkzgalgmjgljnjgsghlnhafkhhhhhhhhhhhhhhhhhhhhhhhhhhhhafhyufffffffffffhhhhhhhhhhhhhhhhhhhhhhhhhhhw555555555555555555555555555555555555555555555555555555555555555555555555555222222222222222222222222222222222222222ffffffffffffffffffffffffffffffffffffffffffffff',
                    aAFAFAF9: 'ggggkfakgfkgfa;kkzgalgmjgljnjgsghlnhafkhhhhhhhhhhhhhhhhhhhhhhhhhhhhafhyufffffffffffhhhhhhhhhhhhhhhhhhhhhhhhhhhw555555555555555555555555555555555555555555555555555555555555555555555555555222222222222222222222222222222222222222ffffffffffffffffffffffffffffffffffffffffffffff',
                    aAFAFAF10: 'ggggkfakgfkgfa;kkzgalgmjgljnjgsghlnhafkhhhhhhhhhhhhhhhhhhhhhhhhhhhhafhyufffffffffffhhhhhhhhhhhhhhhhhhhhhhhhhhhw555555555555555555555555555555555555555555555555555555555555555555555555555222222222222222222222222222222222222222ffffffffffffffffffffffffffffffffffffffffffffff',
                    aAFAFAF11: 'ggggkfakgfkgfa;kkzgalgmjgljnjgsghlnhafkhhhhhhhhhhhhhhhhhhhhhhhhhhhhafhyufffffffffffhhhhhhhhhhhhhhhhhhhhhhhhhhhw555555555555555555555555555555555555555555555555555555555555555555555555555222222222222222222222222222222222222222ffffffffffffffffffffffffffffffffffffffffffffff',
                    aAFAFAF12: 'ggggkfakgfkgfa;kkzgalgmjgljnjgsghlnhafkhhhhhhhhhhhhhhhhhhhhhhhhhhhhafhyufffffffffffhhhhhhhhhhhhhhhhhhhhhhhhhhhw555555555555555555555555555555555555555555555555555555555555555555555555555222222222222222222222222222222222222222ffffffffffffffffffffffffffffffffffffffffffffff',
                    aAFAFAF6: 'ggggkfakgfkgfa;kkzgalgmjgljnjgsghlnhafkhhhhhhhhhhhhhhhhhhhhhhhhhhhhafhyufffffffffffhhhhhhhhhhhhhhhhhhhhhhhhhhhw555555555555555555555555555555555555555555555555555555555555555555555555555222222222222222222222222222222222222222ffffffffffffffffffffffffffffffffffffffffffffff',
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
