import { useTranslation } from 'react-i18next';
import { BugButton } from '../../../app/providers/ErrorBoundary';

function MainPage() {
    const { t } = useTranslation(); // === const { t } = useTranslation('translation');
    // 'translation' - namespace by default

    return (
        <>
            <div>{t('Main page')}</div>
            <BugButton />
        </>
    );
}

export default MainPage;
