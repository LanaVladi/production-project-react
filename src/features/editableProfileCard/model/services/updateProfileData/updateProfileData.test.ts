import { Country } from '../../../../../entities/Country';
import { Currency } from '../../../../../entities/Currency';
import { TestAsyncThunk } from '../../../../../shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';
import { updateProfileData } from './updateProfileData';

const data = {
    username: 'admin',
    age: 22,
    country: Country.Armenia,
    lastname: 'ulbi tv',
    first: 'asd',
    city: 'asf',
    currency: Currency.USD,
};

describe('updateProfileData.test', () => {
    test('should return success', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },

        });
        thunk.api.put.mockReturnValue(Promise.resolve({ data })); // data mock
        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled(); // проверяем был ли вызван метод get
        expect(result.meta.requestStatus).toBe('fulfilled'); // ожидаем поля fulfilled
        expect(result.payload).toEqual(data); // ожидаем, что нам придут данные с сервера data
    });

    test('should return error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },

        });
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled(); // проверяем был ли вызван метод get
        expect(result.meta.requestStatus).toBe('rejected'); // и ожидаем поля rejected
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]); // ожидаем, что нам придет ошибка с сервера error
    });

    test('validate error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: { ...data, lastname: '' },
            },
        });
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
        ]);
    });
});
