import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '../../../../shared/const/localstorage';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action:PayloadAction<User>) => {
            state.authData = action.payload; // устанавливаем авторизационные данные
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
            }
        }, // если юзер вышел из вкладки и опять зашел, нужно понять, что он авторизован (смотрим данные из локалсторидж)
        logOut: (state) => {
            state.authData = undefined; // очищаем стейт
            localStorage.removeItem(USER_LOCALSTORAGE_KEY); // удаляем токен по ключу
        }, // при разлогировании данные из локалсторидж удаляем, имитация авторизации как будто мы храним какой-то токен
    },
});
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
