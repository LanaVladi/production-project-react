import { useTranslation } from 'react-i18next';

function MainPage() {
    const { t } = useTranslation(); // === const { t } = useTranslation('translation');
    // 'translation' - namespace by default

    return (
        <div>{t('Main page')}</div>
    );
}

export default MainPage;
