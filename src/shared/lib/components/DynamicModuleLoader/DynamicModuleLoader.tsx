import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
}

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const {
        children,
        reducers,
        removeAfterUnmount,
    } = props;

    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithManager; // получаем наш стор

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.reducerManager.add(name as StateSchemaKey, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
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
