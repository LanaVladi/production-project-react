/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { RatingCard } from '../../../entities/Rating';
import { StarRating } from '../../../shared/ui/StarRating/StarRating';
import { Page } from '../../../widgets/Page/ui/Page';

function MainPage() {
    const { t } = useTranslation(); // === const { t } = useTranslation('translation');
    // 'translation' - namespace by default

    return (
        <Page>
            {t('Main page')}
            <RatingCard feedbackTitle="Your feedback" hasFeedback />
        </Page>
    );
}

export default MainPage;
