// import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ThemeDecorator } from '../../../../shared/config/storybook/ThemeDecorator';
// import { Theme } from '../../../../app/providers/themeProvider';
// import ArticleEditPage from './ArticleEditPage';
// import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

// export default {
//     title: 'pages/ArticleEditPage',
//     component: ArticleEditPage,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
// } as ComponentMeta<typeof ArticleEditPage>;

// const Template: ComponentStory<typeof ArticleEditPage> = (args) => <ArticleEditPage {...args} />;

// export const Normal = Template.bind({});
// Normal.args = {};
// Normal.decorators = [StoreDecorator({
//     // articleDetailsPage: {

//     // }
//     // articleDetails: {
//     //     data: article,
//     // },
// })];

// export const Dark = Template.bind({});
// Dark.args = {};
// Dark.decorators = [ThemeDecorator(Theme.DARK)];

// export const Loading = Template.bind({});
// Loading.args = {};
// Loading.decorators = [StoreDecorator({
//     articleDetails: {
//         isLoading: true,
//     },
// })];

// export const Error = Template.bind({});
// Error.args = {};
// Error.decorators = [StoreDecorator({
//     articleDetails: {
//         error: 'error',
//     },
// })];

// TO DO: FIX STORIES
