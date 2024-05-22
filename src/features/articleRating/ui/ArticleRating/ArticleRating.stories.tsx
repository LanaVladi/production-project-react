import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '../../../../shared/config/storybook/StoreDecorator';
import ArticleRating from './ArticleRating';

export default {
    title: 'shared/ArticleRating',
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

Normal.decorators = [StoreDecorator({
    articleDetails: {
        data: {
            id: '7',
        },
    },
})];
