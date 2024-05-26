import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortOrder } from '../../../../shared/types/sort';
import { StateSchema } from '../../../../app/providers/StoreProvider';
import {
    Article, ArticleView, ArticleLimit, ArticleSortField, ArticleType,
} from '../../../../entities/Article';
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
        limit: 9,
        sort: ArticleSortField.CREATED,
        order: 'asc',
        search: '',
        type: ArticleType.ALL,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        initState: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            state.limit = (state.view === ArticleView.GRID ? ArticleLimit.GRID_LIMIT : ArticleLimit.LIST_LIMIT);
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticlesList.fulfilled, (
                state,
                action,
            ) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    articlesAdapter.setAll(state, action.payload);
                    // когда у нас есть фильтры нужно, чтобы данные обновлялись, поэтому мы проверяем флаг replace
                    // и если он есть, заменяем все данные новыми setAll
                } else {
                    articlesAdapter.addMany(state, action.payload);
                    // addMany новые данные подгружаются в конец (при бесконечной ленте),
                }
                // setAll: принимает массив сущностей или объект в форме Record<EntityId, T>
                //  и заменяет все существующие сущности значениями в массиве.
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
