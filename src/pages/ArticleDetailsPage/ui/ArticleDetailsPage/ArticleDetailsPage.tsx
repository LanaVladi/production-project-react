import { memo } from 'react';
import { useParams } from 'react-router-dom';
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

interface ArticleDetailsPageProps {
   className?: string;
}

const reducers:ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{id: string}>();

    if (!id) {
        return null;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(clss.articleDetailsPage, {}, [className])}>
                <VStack gap="16" max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ArticleRating articleId={id} />
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>

    );
};

export default memo(ArticleDetailsPage);
