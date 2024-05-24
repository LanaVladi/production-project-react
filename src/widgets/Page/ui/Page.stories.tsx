import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '../../../shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '../../../shared/config/storybook/ThemeDecorator';
import { Theme } from '../../../shared/const/theme';
import { Page } from './Page';

export default {
    title: 'widgets/Page',
    component: Page,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    children: <p>Admin Panel</p>,
};

export const Dark = Template.bind({});
Dark.args = {
    children: <p>Admin Panel</p>,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
