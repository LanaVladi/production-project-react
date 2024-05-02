import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { ArticleDetailsSchema } from '../../../../entities/Article';
import { ProfileSchema } from '../../../../entities/Profile';
import { LoginSchema } from '../../../../features/AuthByUsername/ui';
import { CounterSchema } from '../../../../entities/Counter';
import { UserSchema } from '../../../../entities/User';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;

     // Асинхронные редюсеры
    LoginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>,
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>,
    add: (key: StateSchemaKey, reducer:Reducer) => void,
    remove: (key: StateSchemaKey) => void,
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
} // расширяем стандартный тип стора редакса
// EnhancedStore<StateSchema, AnyAction, [ThunkMiddleware<StateSchema, AnyAction, undefined>]>

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void,
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
