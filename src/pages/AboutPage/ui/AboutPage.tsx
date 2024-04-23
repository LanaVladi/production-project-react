import { useTranslation } from 'react-i18next';
import { Counter } from '../../../entities/Counter';

function AboutPage() {
    const { t } = useTranslation('about'); // 'about' - namespace

    return (
        <div>{t('About page')}</div>
    );
}

export default AboutPage;
