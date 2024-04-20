import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NotFoundPage } from './NotFoundPage';
import { Theme } from '../../../app/providers/themeProvider';
import ThemeDecorator from '../../../shared/config/storybook/ThemeDecorator';

const meta = {
    title: 'pages/NotFoundPage',
    component: NotFoundPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof NotFoundPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
} as Meta<typeof NotFoundPage>;

export const Dark: Story = {
    args: {},
} as Meta<typeof NotFoundPage>;

Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
