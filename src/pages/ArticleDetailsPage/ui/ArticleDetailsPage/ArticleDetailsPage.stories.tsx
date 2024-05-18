import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '../../../../shared/config/storybook/StoreDecorator';
import ArticleDetailsPage from './ArticleDetailsPage';
import { data as article } from '../../../../entities/Article/mocks/data';

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsPage',
    component: ArticleDetailsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsPage>;

const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => <ArticleDetailsPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
    articleDetails: {
        data: article,
    },
})];
