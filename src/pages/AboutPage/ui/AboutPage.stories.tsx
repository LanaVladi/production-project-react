// import React from 'react';
// import type { Meta, StoryObj } from '@storybook/react';
// import AboutPage from './AboutPage';
// import { Theme } from '../../../app/providers/themeProvider';
// import ThemeDecorator from '../../../shared/config/storybook/ThemeDecorator';

// const meta = {
//     title: 'pages/AboutPage',
//     component: AboutPage,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
// } as Meta<typeof AboutPage>;

// export default meta;

// type Story = StoryObj<typeof meta>;

// export const Normal: Story = {
//     args: {},
// } as Meta<typeof AboutPage>;

// export const Dark: Story = {
//     args: {},
// } as Meta<typeof AboutPage>;

// Dark.args = {};
// Dark.decorators = [ThemeDecorator(Theme.DARK)];

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '../../../shared/config/storybook/ThemeDecorator';
import { Theme } from '../../../shared/const/theme';
import AboutPage from './AboutPage';
import { StoreDecorator } from '../../../shared/config/storybook/StoreDecorator';

export default {
    title: 'pages/AboutPage',
    component: AboutPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = () => <AboutPage />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
