import { useTranslation } from 'react-i18next';
import { ListBox } from '../../../shared/ui/ListBox/ListBox';
import { HStack } from '../../../shared/ui/Stack';
import { Page } from '../../../widgets/Page/Page';

function MainPage() {
    const { t } = useTranslation(); // === const { t } = useTranslation('translation');
    // 'translation' - namespace by default

    return (
        <Page>
            {t('Main page')}
        </Page>
    );
}

export default MainPage;
