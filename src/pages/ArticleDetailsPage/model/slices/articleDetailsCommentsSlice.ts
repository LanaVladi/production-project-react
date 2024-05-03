import {
    createEntityAdapter,
    createSlice,
    configureStore,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Comment } from '../../../../entities/Comment';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

  type Book = { bookId: string; title: string }

const commentsAdapter = createEntityAdapter<Comment>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (comment: Comment) => comment.id, // ф-я получения id, поле по которму идет нормализация
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsCommentsSlice',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
        isLoading: false,
        error: undefined,
        ids: ['1', '2'],
        entities: {
            1: {
                id: '1',
                text: 'comment1',
                user: { id: '1', username: 'Yan' },
            },

            2: {
                id: '2',
                text: 'comment2',
                user: { id: '2', username: 'Mel' },
            },
        },
    }),
    reducers: {
        // Can pass adapter functions directly as case reducers.  Because we're passing this
        // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
        // bookAdded: commentsAdapter.addOne,
        // booksReceived(state, action) {
        // // Or, call them as "mutating" helpers in a case reducer
        //     commentsAdapter.setAll(state, action.payload.books);
        // },
    },
});

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;

// And then use the selectors to retrieve values
// const allBooks = booksSelectors.selectAll(store.getState());

// import {
//     createEntityAdapter,
//     createSlice, PayloadAction,
// } from '@reduxjs/toolkit';

// import { fetchArticleById } from '../../../../entities/Article/model/services/fetchArticleById/fetchArticleById';
// import { Article } from '../../../../entities/Article';
// import {
//     fetchCommentsByArticleId,
// } from '../../../../pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
// import { StateSchema } from '../../../../app/providers/StoreProvider';
// import { Comment } from '../../../../entities/Comment';
// import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

// const commentsAdapter = createEntityAdapter<Comment>({
//     selectId: (comment) => comment.id,
// });

// export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
//     (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
// );

// const articleDetailsCommentsSlice = createSlice({
//     name: 'articleDetailsCommentsSlice',
//     initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
//         isLoading: false,
//         error: undefined,
//         ids: [],
//         entities: {},
//     }),
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchCommentsByArticleId.pending, (state) => {
//                 state.error = undefined;
//                 state.isLoading = true;
//             })
//             .addCase(fetchCommentsByArticleId.fulfilled, (
//                 state,
//                 action: PayloadAction<Comment[]>,
//             ) => {
//                 state.isLoading = false;
//                 commentsAdapter.setAll(state, action.payload);
//             })
//             .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
