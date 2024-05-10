import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;

      // filters
      view: ArticleView;
      order: SortOrder;
      sort: ArticleSortField;
      search: string;

    _inited: boolean; // _ означает, что меняется единожды при инициализации, вручную менять нельзя
}
