import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleListItem } from './ArticleListItem';
import { ArticleView } from '../../model/consts/articleConsts';
import { data as article } from '../../../../entities/Article/mocks/data';

export default {
    title: 'entities/Article/ArticleListItem',
    component: ArticleListItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleListItem>;

const Template: ComponentStory<typeof ArticleListItem> = (args) => <ArticleListItem {...args} />;

export const Big = Template.bind({});
Big.args = {
    view: ArticleView.LIST,
    article,
};

export const Small = Template.bind({});
Small.args = {
    view: ArticleView.GRID,
    article,
};
