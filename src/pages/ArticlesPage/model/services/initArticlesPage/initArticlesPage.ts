import { createAsyncThunk } from '@reduxjs/toolkit';
import { ArticleView } from '../../../../../entities/Article';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    ArticleView,
    ThunkConfig<string>
    >(
        'articlesPage/initArticlesPage',
        async (view, thunkApi) => {
            const { getState, dispatch } = thunkApi;
            const inited = getArticlesPageInited(getState());

            if (!inited) {
                dispatch(articlesPageActions.initState(view)); // сначала инициализируем значения лимита, и только потом подгружаем
                dispatch(fetchArticlesList({}));
            }
        },
    );
