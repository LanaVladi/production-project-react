import {
    createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState,
} from 'react';

type SpringType = typeof import('@react-spring/web'); // выводим типы из либ, для корректной типизации
type GestureType = typeof import('@use-gesture/react'); // выводим типы из либ, для корректной типизации

// const obj:SpringType = {
// // так можно посмотреть, что есть в типах
// };

interface AnimationContextPayload {
    Gesture?: GestureType;
    Spring?: SpringType;
    isLoaded?: boolean;
} // обе либы и флаг isLoaded = true если либы подгружены, и false, если нет

const AnimationContext = createContext<AnimationContextPayload>({});

// Обе либы зависят друг от друга, поэтому Promise.all, чтобы загрузка была одновременная параллельная
const getAsyncAnimationModules = async () => {
    return Promise.all([
        import('@react-spring/web'), // async import lib
        import('@use-gesture/react'),
    ]);
};

export const useAnimationLibs = () => {
    return useContext(AnimationContext) as Required<AnimationContextPayload>; // хук, который возвращает контекст и типизируем,
    // что он обязательно возвращает все поля
};

export const AnimationProvider = ({ children }: {children: ReactNode}) => {
    const SpringRef = useRef<SpringType>(); // чтобы от рендера к рендеру был доступ к значениям, но при этом не было лишних перерисовок
    const GestureRef = useRef<GestureType>();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Gesture]) => {
            SpringRef.current = Spring; // в рефы сохраняем либу, которую вернул асинхр.импорт
            GestureRef.current = Gesture;
            setIsLoaded(true); // сохранили всё в рефы и говорим, что всё загружено
        });
    }, []);

    const value = useMemo(() => ({
        Gesture: GestureRef.current,
        Spring: SpringRef.current,
        isLoaded,
    }), [isLoaded]); // мемоизированные значения из библиотек и флаг загрузки, чтобы передавать всегда один и тот же объект

    return (
        <AnimationContext.Provider
            value={value} // передаем мемоизированные значения из библиотек и флаг загрузки в провайдер

            // value={{
            //     Gesture: GestureRef.current,
            //     Spring: SpringRef.current,
            //     isLoaded, // The object passed as the value prop to the Context provider (at line 55) changes every render.
            //     // To fix this consider wrapping it in a useMemo hook.eslintreact/jsx-no-constructed-context-values
            // }}
        >
            {children}
        </AnimationContext.Provider>
    );
};

// AnimationProvider - провайдер с помощью которого получаем доступ к библиотекам
