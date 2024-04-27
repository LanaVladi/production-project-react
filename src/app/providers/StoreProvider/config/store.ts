import { configureStore, DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from '../../../../entities/Counter';
import { userReducer } from '../../../../entities/User';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './ReducerManager';
// import { loginReducer } from '../../../../features/AuthByUsername/model/slice/LoginSlice';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,

        // // Асинхронные редюсеры
        // LoginForm: loginReducer, // для проверки размера бандла при прод
    };

    const reducerManager = createReducerManager(rootReducer);

    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        devTools: GLOBAL_ISDEV, // devTools only dev development
        preloadedState: initialState, // Для тестирования, storybook
    });

    // @ts-ignore
    store.reducerManager = reducerManager;
    return store;
}

// export type AppDispatch = typeof store.dispatch преобразовали в =>
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

// function createReduxStore is created for reuse in testing and storybook
