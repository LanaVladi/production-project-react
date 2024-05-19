// import React from 'react';
// import type { Meta, StoryObj } from '@storybook/react';
// import MainPage from './MainPage';
// import { Theme } from '../../../app/providers/themeProvider';
// import ThemeDecorator from '../../../shared/config/storybook/ThemeDecorator';

// const meta = {
//     title: 'pages/MainPage',
//     component: MainPage,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
// } as Meta<typeof MainPage>;

// export default meta;

// type Story = StoryObj<typeof meta>;

// export const Normal: Story = {
//     args: {},
// } as Meta<typeof MainPage>;

// export const Dark: Story = {
//     args: {},
// } as Meta<typeof MainPage>;

// Dark.args = {};
// Dark.decorators = [ThemeDecorator(Theme.DARK)];

/// ///////////////////////////////////////////////////  here stories for new dependencies versions

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '../../../shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '../../../shared/config/storybook/StoreDecorator';
import { Theme } from '../../../app/providers/themeProvider';
import MainPage from './MainPage';

export default {
    title: 'pages/MainPage',
    component: MainPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = () => <MainPage />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
