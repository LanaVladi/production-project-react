import { EntityState } from '@reduxjs/toolkit';
import { Article } from '../../../../entities/Article';
import { Comment } from '../../../../entities/Comment';

export interface ArticleDetailsCommentsSchema {
    isLoading?: boolean;
    error?: string;
    data?: Article;
}
