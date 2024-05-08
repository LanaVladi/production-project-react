import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleLimit } from '../../../../entities/Article/model/types/article';
import { StateSchema } from '../../../../app/providers/StoreProvider';
import { Article, ArticleView } from '../../../../entities/Article';
import { ArticlesPageSchema } from '../../../../pages/ArticlesPage';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '../../../../shared/const/localstorage';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.GRID,
        page: 1,
        hasMore: true,
        _inited: false,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        initState: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            state.limit = (state.view === ArticleView.GRID ? ArticleLimit.GRID_LIMIT : ArticleLimit.LIST_LIMIT);
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticlesList.fulfilled, (
                state,
                action: PayloadAction<Article[]>,
            ) => {
                state.isLoading = false;
                articlesAdapter.addMany(state, action.payload);
                // setAll: принимает массив сущностей или объект в форме Record<EntityId, T>
                //  и заменяет все существующие сущности значениями в массиве.
                state.hasMore = action.payload.length > 0;
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: articlesPageReducer,
    actions: articlesPageActions,
} = articlesPageSlice;
