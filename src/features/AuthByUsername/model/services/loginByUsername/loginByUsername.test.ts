import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import axios from 'axios';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true); // deep mock of jest

// let dispatch: Dispatch;
// let getState: () => StateSchema;

// beforeEach(() => {
//     dispatch = jest.fn();
//     getState = jest.fn();
// });
// вынесли в отдельный клас TestAsyncThunk

describe('loginByUsername.test', () => {
    // test('should return success login', async () => {
    //     const userValue = { username: '123', id: '1' };
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue })); // value mock

    //     const action = loginByUsername({ username: '123', password: '123' });
    //     const result = await action(dispatch, getState, undefined);
    //      вынесли в отдельный клас TestAsyncThunk

    //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue)); // проверяем был ли вызван dispatch с конкретным аргументом
    //     expect(dispatch).toHaveBeenCalledTimes(3); // проверяем был ли вызван dispatch 3 раза
    //     expect(mockedAxios.post).toHaveBeenCalled(); // проверяем был ли вызван метод post
    //     expect(result.meta.requestStatus).toBe('fulfilled'); // и ожидаем поля fulfilled
    //     expect(result.payload).toEqual(userValue);
    // });

    // test('should return error login', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
    //     const action = loginByUsername({ username: '123', password: '123' });
    //     const result = await action(dispatch, getState, undefined);

    //     expect(mockedAxios.post).toHaveBeenCalled(); // проверяем был ли вызван метод post
    //     expect(dispatch).toHaveBeenCalledTimes(2); // проверяем был ли вызван dispatch 3 раза
    //     expect(result.meta.requestStatus).toBe('rejected'); // и ожидаем поля rejected
    //     expect(result.payload).toBe('error');
    // });

    /// ////////////////////////////////////////////////////// // вынесли в отдельный клас TestAsyncThunk

    test('should return success login', async () => {
        const userValue = { username: '123', id: '123' };
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue })); // value mock

        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.CallThunk({ username: '123', password: '123' });

        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue)); // проверяем был ли вызван dispatch с конкретным аргументом
        expect(thunk.dispatch).toHaveBeenCalledTimes(3); // проверяем был ли вызван dispatch 3 раза
        expect(mockedAxios.post).toHaveBeenCalled(); // проверяем был ли вызван метод post
        expect(result.meta.requestStatus).toBe('fulfilled'); // и ожидаем поля fulfilled
        expect(result.payload).toEqual(userValue);
    });

    test('should return error login', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));

        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.CallThunk({ username: '123', password: '123' });

        expect(mockedAxios.post).toHaveBeenCalled(); // проверяем был ли вызван метод post
        expect(thunk.dispatch).toHaveBeenCalledTimes(2); // проверяем был ли вызван dispatch 2 раза
        expect(result.meta.requestStatus).toBe('rejected'); // и ожидаем поля rejected
        expect(result.payload).toBe('error');
    });
});
