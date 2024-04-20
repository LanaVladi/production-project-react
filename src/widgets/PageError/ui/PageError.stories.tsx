import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '../../../app/providers/themeProvider';
import ThemeDecorator from '../../../shared/config/storybook/ThemeDecorator';
import { PageError } from './PageError';

const meta = {
    title: 'widget/PageError',
    component: PageError,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof PageError>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {},
} as Meta<typeof PageError>;

export const Dark: Story = {
    args: {},
} as Meta<typeof PageError>;

Dark.decorators = [ThemeDecorator(Theme.DARK)];
