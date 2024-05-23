import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '../../../../app/providers/themeProvider';
import { StoreDecorator } from '../../../../shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '../../../../shared/config/storybook/ThemeDecorator';
import { Sidebar } from './Sidebar';

export default {
    title: 'widgets/Sidebar/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({
    user: { authData: {} },
}),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK),
    StoreDecorator({
        user: { authData: {} },
    }),
];

export const NoAuth = Template.bind({});
NoAuth.args = {};
NoAuth.decorators = [
    StoreDecorator({
        user: {},
    }),
];
