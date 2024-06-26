import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchema, StateSchemaKey } from 'app/providers/StoreProvider';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
    // типизировали более строго, чтобы редьюсер можно было автоматически и динамически брать из StateSchema
}

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
    children: ReactNode;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const {
        children,
        reducers,
        removeAfterUnmount = true,
    } = props;

    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithManager; // получаем наш стор

    useEffect(() => {
        const mountedReducers = store.reducerManager.getReducerMap();

        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name as StateSchemaKey];

            // Добавляем новый редюсер только если его нет
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };

    // eslint-disable-next-line
}, []); // =>  DynamicModuleLoader
    // В момент, когда мы монтируем компонент мы добавляем редюсер, когда компонент размонтируется реактом и
    //  он уже не нужен мы редюсер снова удаляем. // Eslint ругается на пустой массив зависимостей, но нам они там не нужны,
    // т.к. этот useEffect должен отрабатывать один раз при монтировании компонента и можем эту строчку отключить
    // eslint-disable-next-line

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {children}
        </>
    );
};
