import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MainPage from './MainPage';
import { Theme } from '../../../app/providers/themeProvider';
import ThemeDecorator from '../../../shared/config/storybook/ThemeDecorator';

const meta = {
    title: 'pages/MainPage',
    component: MainPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof MainPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
} as Meta<typeof MainPage>;

export const Dark: Story = {
    args: {},
} as Meta<typeof MainPage>;

Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
