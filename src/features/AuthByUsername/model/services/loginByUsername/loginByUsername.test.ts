import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import axios from 'axios';
import { userActions } from 'entities/User';
import { loginByUsername } from './loginByUsername';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true); // deep mock of jest
let dispatch: Dispatch;
let getState: () => StateSchema;

beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
});

describe('loginByUsername.test', () => {
    test('should return success login', async () => {
        const userValue = { username: '123', id: '1' };
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue })); // value mock
        const action = loginByUsername({ username: '123', password: '123' });

        // action Expected 3 arguments, but got 0.ts(2554)
        // createAsyncThunk.d.ts(101, 102): An argument for 'dispatch' was not provided.
        // const action: (dispatch: ThunkDispatch<unknown, unknown, AnyAction>, getState: () => unknown, extra: unknown) => Promise<PayloadAction<User, string, {
        //     arg: LoginByUsernameProps;
        //     requestId: string;
        //     requestStatus: "fulfilled";
        // }, never> | PayloadAction<...>> & {
        //     ...;
        // }

        const result = await action(dispatch, getState, undefined);
        // console.log('result', result);
        // loginByUsername is createAsyncThunk function which creates async action, then we call its action and put it in result
        // result {
        //     type: 'login/loginByUsername/fulfilled',
        //     payload: { username: '123', id: '1' },
        //     meta: {
        //       arg: { username: '123', password: '123' },
        //       requestId: '-9JW5tukCm0Z2DeOevyLz',
        //       requestStatus: 'fulfilled'
        //     }
        //   }

        expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue)); // проверяем был ли вызван dispatch с конкретным аргументом
        expect(dispatch).toHaveBeenCalledTimes(3); // проверяем был ли вызван dispatch 3 раза
        // dispatch у нас отрабатыает 3 раза: когда вызвали action loginByUsername,
        // когда вызываем с action  setAuthData
        // thunkAPI.dispatch(userActions.setAuthData(response.data)); // передаем данные, которые получили с сервера в стор
        // когда получаем статус fulfilled, когда action успешно отрабатывает    return response.data;

        expect(mockedAxios.post).toHaveBeenCalled(); // проверяем был ли вызван метод post
        expect(result.meta.requestStatus).toBe('fulfilled'); // и ожидаем поля fulfilled
        expect(result.payload).toEqual(userValue);
    });

    test('should return error login', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const action = loginByUsername({ username: '123', password: '123' });

        const result = await action(dispatch, getState, undefined);
        // console.log('result', result);
        // result {
        //     type: 'login/loginByUsername/rejected',
        //     payload: 'error',
        //     meta: {
        //       arg: { username: '123', password: '123' },
        //       requestId: 'I_p-46mZQaaI-oYyuHcYy',
        //       rejectedWithValue: true,
        //       requestStatus: 'rejected',
        //       aborted: false,
        //       condition: false
        //     },
        //     error: { message: 'Rejected' }
        //   }

        expect(mockedAxios.post).toHaveBeenCalled(); // проверяем был ли вызван метод post
        expect(dispatch).toHaveBeenCalledTimes(2); // проверяем был ли вызван dispatch 3 раза
        expect(result.meta.requestStatus).toBe('rejected'); // и ожидаем поля fulfilled
        // dispatch у нас отрабатыает 2 раза при ошибке: когда вызвали action loginByUsername,
        // когда получаем статус rejected,
        expect(result.payload).toBe('error');
    });
});
