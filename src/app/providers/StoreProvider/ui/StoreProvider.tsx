import { ReducersMapObject } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>; // Для тестирования
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
}

export const StoreProvider = (props: StoreProviderProps) => {
    const {
        children,
        initialState,
        asyncReducers,
    } = props;

    // const navigate = useNavigate();

    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
        // navigate,
    );

    // console.log('render'); // каждый раз, когда переходили на другую страницу, создавался новый стор и в провайдер попадал новый стор. Так делать нельзя!!!
    // поэтому navigate удаляем

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
