import { data } from '../../../../../entities/Article/mocks/data';
import { TestAsyncThunk } from '../../../../../shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticleById } from './fetchArticleById';

describe('fetchArticleById.test', () => {
    test('should return success', async () => {
        const articleId = '1';
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({ data })); // data mock
        const result = await thunk.callThunk(`/articles/${articleId}`);

        expect(thunk.api.get).toHaveBeenCalled(); // проверяем был ли вызван метод get
        expect(result.meta.requestStatus).toBe('fulfilled'); // ожидаем поля fulfilled
        expect(result.payload).toEqual(data); // ожидаем, что нам придут данные с сервера data
    });

    test('should return error', async () => {
        const articleId = '2';
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk(`/articles/${articleId}`);

        expect(thunk.api.get).toHaveBeenCalled(); // проверяем был ли вызван метод get
        expect(result.meta.requestStatus).toBe('rejected'); // и ожидаем поля rejected
        expect(result.payload).toBe('error'); // ожидаем, что нам придет ошибка с сервера error
    });
});
