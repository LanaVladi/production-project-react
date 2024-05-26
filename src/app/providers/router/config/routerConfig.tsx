import { AdminPanelPage } from '../../../../pages/AdminPanelPage';
import { ArticlesPage } from '../../../../pages/ArticlesPage';
import { ArticleDetailsPage } from '../../../../pages/ArticleDetailsPage';
import { ProfilePage } from '../../../../pages/ProfilePage';
import { AboutPage } from '../../../../pages/AboutPage';
import { MainPage } from '../../../../pages/MainPage';
import { NotFoundPage } from '../../../../pages/NotFoundPage';
import { ArticleEditPage } from '../../../../pages/ArticleEditPage';
import { UserRole } from '../../../../entities/User/model/consts/userConsts';
import { ForbiddenPage } from '../../../../pages/ForbiddenPage';
import {
    AppRoutes, getRouteMain, getRouteAbout, getRouteProfile, getRouteAdmin, getRouteArticleCreate,
    getRouteArticleDetails, getRouteArticleEdit, getRouteArticles, getRouteForbidden,
} from '../../../../shared/const/router';
import { AppRoutesProps } from '../../../../shared/types/router';

// export const getRouteMain = () => '/';
// export const getRouteAbout = () => '/about';
// export const getRouteProfile = (id: string) => `/profile/${id}`;
// export const getRouteArticles = () => '/articles';
// export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
// export const getRouteArticleCreate = () => '/articles/new';
// export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
// export const getRouteAdmin = () => '/admin';
// export const getRouteForbidden = () => '/forbidden';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },

    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },

    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },

    [AppRoutes.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true, // запросить статьи может только авторизованный пользователь
    },

    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPage />,
        authOnly: true,
    },

    [AppRoutes.ARTICLE_CREATE]: {
        path: getRouteArticleCreate(),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: getRouteAdmin(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },

    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },

};
