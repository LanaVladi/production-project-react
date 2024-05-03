import { EntityState } from '@reduxjs/toolkit';
import { Article } from '../../../../entities/Article';
import { Comment } from '../../../../entities/Comment';

export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
    isLoading?: boolean;
    error?: string;
    // data?: Article;

    // ids: string[];
    // entities: Record<any, any>; can remove because extends from EntityState
}

// export interface EntityState<T> {
//     ids: EntityId[];
//     entities: Dictionary<T>;
// }
