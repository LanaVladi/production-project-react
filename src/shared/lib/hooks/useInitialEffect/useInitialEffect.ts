import { useEffect } from 'react';

export const useInitialEffect = (callback: ()=> void) => {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
            // если у нас среда storybook и тестовая jest
            // (либо надо замокать запрос, тогда реальное поведение компонента тестировали бы),
            // то запросы не отправляются в других 'jest', 'frontend' иначе
            callback();
        }
        // eslint-disable-next-line
    }, []);
};
