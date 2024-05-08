import { TestAsyncThunk } from '../../../../../shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(4); // pending (1), fulfilled (2), dispatch (2 dispatch in action)
        expect(fetchArticlesList).toHaveBeenCalledWith({ page: 3 }); // проверяем, что ф-я fetchArticlesList была вызвана с нужным аргументом
    });

    test('fetchAritcleList not called', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: false,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2); // pending (1), fulfilled (2), because  "hasMore: false" in args
        expect(fetchArticlesList).not.toHaveBeenCalled(); // проверяем, что ф-я fetchArticlesList не была вызвана
    });
});
