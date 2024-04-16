import { useTranslation } from 'react-i18next';

function AboutPage() {
    const { t } = useTranslation('about'); // 'about' - namespace

    return (
        <div>{t('About page')}</div>
    );
}

export default AboutPage;
