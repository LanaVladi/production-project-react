import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { data } from '../../../../entities/Article/mocks/data';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { articleDetailsReducer } from './articleDetailsSlice';

describe('articleDetailsSlice.test', () => {
    test('test fetchArticleById service pending', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: false,
            error: undefined,
        };

        expect(articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.pending)).toEqual({
            isLoading: true,
            error: undefined,
        });
    });

    test('test fetchArticleById service fulfilled', () => {
        const requestId = '1';
        const requestStatus = 'fulfilled';
        const state: DeepPartial<ArticleDetailsSchema> = { isLoading: true };

        expect(articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.fulfilled(data, requestId, requestStatus))).toEqual({
            isLoading: false,
            data,
        });
    });

    test('test fetchArticleById service rejected', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: true,
        };

        expect(articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.rejected)).toEqual({
            isLoading: false,
        });
    });
});
