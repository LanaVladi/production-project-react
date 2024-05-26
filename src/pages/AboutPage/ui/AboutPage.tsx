import { useTranslation } from 'react-i18next';
import { Page } from '../../../widgets/Page';
import { Counter } from '../../../entities/Counter';

function AboutPage() {
    const { t } = useTranslation('about'); // 'about' - namespace

    return (
        <Page data-testid="AboutPage">
            <div>{t('About page')}</div>
        </Page>
    );
}

export default AboutPage;
