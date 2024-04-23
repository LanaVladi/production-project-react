import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from '../../../../entities/Counter';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {
            counter: counterReducer,
        },
        devTools: GLOBAL_ISDEV, // devTools only dev development
        preloadedState: initialState, // Для тестирования, storybook
    });
}

// function createReduxStore is created for reuse in testing and storybook
