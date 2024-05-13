import { ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { ReducersList } from '../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { StateSchema, StoreProvider } from '../../../app/providers/StoreProvider';
import { profileReducer } from '../../../entities/Profile';
import { loginReducer } from '../../../features/AuthByUsername/model/slice/LoginSlice';
import { articleDetailsReducer } from '../../../entities/Article/model/slice/articleDetailsSlice';
import { addCommentFormReducer } from '../../../features/addCommentForm/model/slices/addCommentFormSlice';
import { articleDetailsPageReducer } from '../../../pages/ArticleDetailsPage/model/slices';
import { articlesPageReducer } from '../../../pages/ArticlesPage/model/slices/articlesPageSlice';

const defaultAsyncReducers: ReducersList = {
    LoginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
    articlesPage: articlesPageReducer,
};

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) => (StoryComponent: Story) => (
    <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
    </StoreProvider>
);
