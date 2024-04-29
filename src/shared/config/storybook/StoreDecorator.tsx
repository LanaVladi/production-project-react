import { ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { ReducersList } from '../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { StateSchema, StoreProvider } from '../../../app/providers/StoreProvider';
import { profileReducer } from '../../../entities/Profile';
import { loginReducer } from '../../../features/AuthByUsername/model/slice/LoginSlice';

const defaultAsyncReducers: ReducersList = {
    LoginForm: loginReducer,
    profile: profileReducer,
};

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) => (StoryComponent: Story) => (
    <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
    </StoreProvider>
);
