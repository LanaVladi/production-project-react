import { createAsyncThunk } from '@reduxjs/toolkit';
import { ArticleSortField, ArticleView } from '../../../../../entities/Article';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { SortOrder } from '../../../../../shared/types';

interface initArticlesPageProps {
    view: ArticleView;
    searchParams: URLSearchParams
}

export const initArticlesPage = createAsyncThunk<
    void,
    initArticlesPageProps,
    ThunkConfig<string>
    >(
        'articlesPage/initArticlesPage',
        async ({ view, searchParams }, thunkApi) => {
            const { getState, dispatch } = thunkApi;
            const inited = getArticlesPageInited(getState());

            const orderFromUrl = searchParams.get('order') as SortOrder;
            const sortFromUrl = searchParams.get('sort') as ArticleSortField;
            const searchFromUrl = searchParams.get('search');

            if (orderFromUrl) {
                dispatch(articlesPageActions.setOrder(orderFromUrl));
            }
            if (sortFromUrl) {
                dispatch(articlesPageActions.setSort(sortFromUrl));
            }
            if (searchFromUrl) {
                dispatch(articlesPageActions.setSearch(searchFromUrl));
            }

            if (!inited) {
                dispatch(articlesPageActions.initState(view)); // сначала инициализируем значения лимита, и только потом подгружаем
                dispatch(fetchArticlesList({}));
            }
        },
    );
