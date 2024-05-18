import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AddCommentFormSchema } from '../../../../features/addCommentForm';
import { ArticleDetailsSchema } from '../../../../entities/Article';
import { ProfileSchema } from '../../../../entities/Profile';
import { LoginSchema } from '../../../../features/AuthByUsername/ui';
import { CounterSchema } from '../../../../entities/Counter';
import { UserSchema } from '../../../../entities/User';
import { ArticlesPageSchema } from '../../../../pages/ArticlesPage';
import { ScrollRestorationSchema } from '../../../../features/ScrollRestoration';
import { ArticleDetailsPageSchema } from '../../../../pages/ArticleDetailsPage';
import { rtkApi } from '../../../../shared/api/rtkApi';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    scrollRestoration: ScrollRestorationSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

     // Асинхронные редюсеры
    LoginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlesPageSchema;
    articleDetailsPage?: ArticleDetailsPageSchema;
     // articleDetailsComments?: ArticleDetailsCommentsSchema;
    // articleDetailsRecommendations?: ArticleDetailsRecommendationsSchema;
    // 2 редьюсера объединили в одной схеме  articleDetailsPage?: ArticleDetailsPageSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>,
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>,
    add: (key: StateSchemaKey, reducer: Reducer) => void,
    remove: (key: StateSchemaKey) => void,
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
} // расширяем стандартный тип стора редакса
// EnhancedStore<StateSchema, AnyAction, [ThunkMiddleware<StateSchema, AnyAction, undefined>]>

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
