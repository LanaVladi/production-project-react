import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EditableProfileCard } from '../../../features/editableProfileCard';
import { VStack } from '../../../shared/ui/Stack';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Page } from '../../../widgets/Page/ui/Page';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();

    return (
        <Page className={classNames('', {}, [className])}>
            <VStack gap="16" max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
};

export default ProfilePage;
