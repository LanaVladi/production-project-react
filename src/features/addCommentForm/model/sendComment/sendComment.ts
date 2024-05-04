import { createAsyncThunk } from '@reduxjs/toolkit';
import { getArticleDetailsData } from '../../../../entities/Article/model/selectors/articleDetails';
import { Comment } from '../../../../entities/Comment';
import { getUserAuthData } from '../../../../entities/User';
import { ThunkConfig } from '../../../../app/providers/StoreProvider';
import { getAddCommentFormText } from '../selectors/addCommentFormSelectors';
import { addCommentFormActions } from '../slices/addCommentFormSlice';

export const sendComment = createAsyncThunk<
    Comment,
    void,
    ThunkConfig<string>
    >(
        'AddCommentForm/sendComment',
        async (authdata, thunkApi) => {
            const {
                extra, dispatch, rejectWithValue, getState,
            } = thunkApi;

            const userData = getUserAuthData(getState());
            const text = getAddCommentFormText(getState());
            const article = getArticleDetailsData(getState());

            if (!userData || !text || !article) {
                return rejectWithValue('no data');
            }

            try {
                const response = await extra.api.post<Comment>('/comments', {
                    articleId: article.id,
                    userId: userData.id,
                    text,
                });

                if (!response.data) {
                    throw new Error();
                }

                dispatch(addCommentFormActions.setText('')); // автоматич.очищение инпута

                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue('error');
            }
        },
    );
