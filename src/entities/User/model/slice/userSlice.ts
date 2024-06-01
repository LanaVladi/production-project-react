import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setFeatureFlags } from '../../../../shared/lib/features';
import { USER_LOCALSTORAGE_KEY } from '../../../../shared/const/localstorage';
import { User, UserSchema } from '../types/user';
import { JsonSettings } from '../types/jsonSettings';
import { saveJsonSettings } from '../services/saveJsonSettings';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action:PayloadAction<User>) => {
            state.authData = action.payload; // устанавливаем авторизационные данные
            setFeatureFlags(action.payload.features);
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                const userJson = JSON.parse(user) as User;
                state.authData = userJson;
                setFeatureFlags(userJson.features);
            }

            state._inited = true;
        }, // если юзер вышел из вкладки и опять зашел, нужно понять, что он авторизован (смотрим данные из локалсторидж)
        logOut: (state) => {
            state.authData = undefined; // очищаем стейт
            localStorage.removeItem(USER_LOCALSTORAGE_KEY); // удаляем токен по ключу
        }, // при разлогировании данные из локалсторидж удаляем, имитация авторизации как будто мы храним какой-то токен
    },
    extraReducers: (builder) => {
        builder.addCase(
            saveJsonSettings.fulfilled,
            (state, { payload }: PayloadAction<JsonSettings>) => {
                if (state.authData) {
                    state.authData.jsonSettings = payload;
                }
            },
        );
    },
});
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
