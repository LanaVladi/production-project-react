import { Currency } from '../../../../../entities/Currency';
import { TestAsyncThunk } from '../../../../../shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from '../../../../../entities/Country';
import { fetchProfileData } from './fetchProfileData';

const data = {
    username: 'admin',
    age: 22,
    country: Country.Armenia,
    lastname: 'ulbi tv',
    first: 'asd',
    city: 'asf',
    currency: Currency.USD,
};

const profileId = '1';

describe('fetchProfileData.test', () => {
    test('should return success', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data })); // data mock
        const result = await thunk.callThunk(profileId);

        expect(thunk.api.get).toHaveBeenCalled(); // проверяем был ли вызван метод get
        expect(result.meta.requestStatus).toBe('fulfilled'); // ожидаем поля fulfilled
        expect(result.payload).toEqual(data); // ожидаем, что нам придут данные с сервера data
    });

    test('should return error', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk(profileId);

        expect(thunk.api.get).toHaveBeenCalled(); // проверяем был ли вызван метод get
        expect(result.meta.requestStatus).toBe('rejected'); // и ожидаем поля rejected
        expect(result.payload).toBe('error'); // ожидаем, что нам придет ошибка с сервера error
    });
});
