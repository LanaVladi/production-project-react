import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../shared/ui/Button/Button';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './BugButton.module.scss';
// import * as clss from './BugButton.module.scss';

// Компонент для тестирования ErrorBoundary
export const BugButton = () => {
    const [error, setError] = useState(false);
    const { t } = useTranslation();

    const onThrow = () => setError(true);

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    return (
        <Button
            className={classNames(clss.bugbutton)}
            onClick={onThrow}
        >
            {t('throw error')}
        </Button>
    );
};
