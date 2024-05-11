import { createAsyncThunk } from '@reduxjs/toolkit';
import { addQueryParams } from '../../../../../shared/lib/url/addQueryParams/addQueryParams';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { Article } from '../../../../../entities/Article';
import {
    getArticlesPageLimit, getArticlesPageNum, getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort,
} from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
    replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
    >(
        'articlesPage/fetchArticlesList',
        async (args, thunkApi) => {
            const { extra, rejectWithValue, getState } = thunkApi;

            const page = getArticlesPageNum(getState());
            const limit = getArticlesPageLimit(getState());
            const sort = getArticlesPageSort(getState());
            const order = getArticlesPageOrder(getState());
            const search = getArticlesPageSearch(getState());

            // GET /posts?_sort=views&_order=asc // query example

            try {
                addQueryParams({ sort, order, search });
                const response = await extra.api.get<Article[]>('/articles', {
                    params: {
                        _expand: 'user',
                        _limit: limit,
                        _page: page,
                        _sort: sort,
                        _order: order,
                        q: search,
                    },

                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );
