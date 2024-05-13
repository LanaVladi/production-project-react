import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '../../../../shared/config/storybook/ThemeDecorator';
import { Theme } from '../../../../app/providers/themeProvider';
import ArticlesPage from './ArticlesPage';
import { StoreDecorator } from '../../../../shared/config/storybook/StoreDecorator';
import { ArticleSortField, ArticleType, ArticleView } from '../../../../entities/Article';
import { data as article } from '../../../../entities/Article/mocks/data';

export default {
    title: 'pages/ArticlesPage',
    component: ArticlesPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => <ArticlesPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

Normal.decorators = [StoreDecorator({
    articlesPage: {
        isLoading: false,
        error: undefined,
        ids: [article.id],
        entities: {
            1: article,
        },
        view: ArticleView.GRID,
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 4,
        sort: ArticleSortField.CREATED,
        order: 'asc',
        search: '',
        type: ArticleType.ALL,
    },
})];

// TO DO: FIX STORIES

// export const Loading = Template.bind({});
// Loading.args = {};
// Loading.decorators = [StoreDecorator({
//     articlesPage: {
//         isLoading: true,
//     },
// })];

// export const Error = Template.bind({});
// Error.args = {};
// Error.decorators = [StoreDecorator({
//     articlesPage: {
//         error: 'error',
//     },
// })];

// export const Dark = Template.bind({});
// Dark.args = {};
// Dark.decorators = [ThemeDecorator(Theme.DARK)];
