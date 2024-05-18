import {
    CombinedState, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { rtkApi } from '../../../../shared/api/rtkApi';
import { $api } from '../../../../shared/api/api';
import { counterReducer } from '../../../../entities/Counter';
import { userReducer } from '../../../../entities/User';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './ReducerManager';
import { scrollRestorationReducer } from '../../../../features/ScrollRestoration';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
        scrollRestoration: scrollRestorationReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
        // // Асинхронные редюсеры
        // LoginForm: loginReducer, // для проверки размера бандла при прод
    };

    const reducerManager = createReducerManager(rootReducer);

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: GLOBAL_ISDEV, // devTools only dev development
        preloadedState: initialState, // Для тестирования, storybook
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    api: $api,

                },
            },
        }).concat(rtkApi.middleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;
    return store;
}

// export type AppDispatch = typeof store.dispatch преобразовали в =>
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

// function createReduxStore is created for reuse in testing and storybook
