import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Page } from '../../../../widgets/Page/ui/Page';
import { DynamicModuleLoader, ReducersList } from '../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleDetails } from '../../../../entities/Article';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './ArticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../../../pages/ArticleDetailsPage/model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { VStack } from '../../../../shared/ui/Stack';
import { ArticleRecommendationsList } from '../../../../features/articleRecommendationsList';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '../../../../features/articleRating';
import { getFeatureFlag, ToggleFeatures, toggleFeatures } from '../../../../shared/lib/features';
import { Counter } from '../../../../entities/Counter';
import { Card } from '../../../../shared/ui/Card/Card';

interface ArticleDetailsPageProps {
   className?: string;
}

const reducers:ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{id: string}>();
    const { t } = useTranslation();
    // const isArticleRatingEnabled = false; 1)

    // const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled');
    // const isCounterEnabled = getFeatureFlag('isCounterEnabled'); 2)

    if (!id) {
        return null;
    }

    // const articleRatingCard = toggleFeatures({
    //     name: 'isArticleRatingEnabled',
    //     on: () => <ArticleRating articleId={id} />,
    //     off: () => <Card>{t('Оценка статей скоро появится!')}</Card>,
    // });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(clss.articleDetailsPage, {}, [className])}>
                <VStack gap="16" max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />

                    {/* ** Обнаружили баг **
                    // {isArticleRatingEnabled && <ArticleRating articleId={id} />}   1) */}

                    {/* {isCounterEnabled && <Counter />}
                     {isArticleRatingEnabled && <ArticleRating articleId={id} />} 2) */}

                    {/* {articleRatingCard} */}

                    <ToggleFeatures
                        feature="isArticleRatingEnabled"
                        on={<ArticleRating articleId={id} />}
                        off={<Card>{t('Оценка статей скоро появится!')}</Card>}
                    />
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>

    );
};

export default memo(ArticleDetailsPage);
function t(arg0: string): import('react').ReactNode {
    throw new Error('Function not implemented.');
}
