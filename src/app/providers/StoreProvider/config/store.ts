import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { loginReducer } from '../../../../features/AuthByUsername/ui';
import { counterReducer } from '../../../../entities/Counter';
import { userReducer } from '../../../../entities/User';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
        LoginForm: loginReducer,
    };

    return configureStore<StateSchema>({
        reducer: rootReducer,
        devTools: GLOBAL_ISDEV, // devTools only dev development
        preloadedState: initialState, // Для тестирования, storybook
    });
}

// function createReduxStore is created for reuse in testing and storybook
