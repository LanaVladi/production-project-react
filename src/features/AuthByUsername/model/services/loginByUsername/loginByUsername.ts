import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '../../../../../shared/const/localstorage';
import { User, userActions } from '../../../../../entities/User';
import { ThunkConfig, ThunkExtraArg } from '../../../../../app/providers/StoreProvider/config/StateSchema';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const { username, password } = authData;
        const { dispatch, extra, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.post<User>('/login', authData);

            if (!response.data) {
                throw new Error();
            } // проверяем, что данные с серверы точно пришли

            // localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data)); // данные с сервера сохраняем в локалсторидж

            dispatch(userActions.setAuthData(response.data)); // передаем данные, которые получили с сервера в стор
            return response.data;
        } catch (error) {
            console.log('error', error);
            return rejectWithValue('error');
        }
    },
);

// export declare function createAsyncThunk<Returned, ThunkArg = void>
// (typePrefix: string,
// payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, {}>,
// options?: AsyncThunkOptions<ThunkArg, {}>): AsyncThunk<Returned, ThunkArg, {}>;

// <Returned = User (возвращаем тип User, т.к. после авторизации сервер вернет данные о пользователе),
//  ThunkArg = LoginByUsernameProps и передаем аргументами логин и пароль>
