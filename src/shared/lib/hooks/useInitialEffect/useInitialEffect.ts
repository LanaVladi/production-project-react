import { useEffect } from 'react';

export const useInitialEffect = (callback: ()=> void) => {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook') { // если у нас среда storybook, то запросы не отправляются в других 'jest', 'frontend' иначе
            callback();
        }
        // eslint-disable-next-line
    }, []);
};
