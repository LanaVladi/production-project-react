import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AboutPage from './AboutPage';
import { Theme } from '../../../app/providers/themeProvider';
import ThemeDecorator from '../../../shared/config/storybook/ThemeDecorator';

const meta = {
    title: 'pages/AboutPage',
    component: AboutPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof AboutPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
} as Meta<typeof AboutPage>;

export const Dark: Story = {
    args: {},
} as Meta<typeof AboutPage>;

Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
