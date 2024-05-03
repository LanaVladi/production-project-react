import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { Comment } from '../../../../../entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
    >(
        'articleDetails/fetchCommentsByArticleId',
        async (articleId, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            if (!articleId) {
                return rejectWithValue('error');
            }

            try {
                const response = await extra.api.get<Comment[]>('/comments', {
                    params: {
                        articleId, // id статьи, по которой хотим получить комменты
                        _expand: 'user', // хотим по id пользователя user, получить полную инфу о нем
                        // получаем сущности по внешним ключам,
                        // использую query параметры для получения родительских ресурсов,
                        // article является родительской по отношению к комментарию
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
