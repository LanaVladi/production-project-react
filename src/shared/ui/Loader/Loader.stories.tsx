import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';
import ThemeDecorator from '../../config/storybook/ThemeDecorator';
import { Theme } from '../../../app/providers/themeProvider';

const meta = {
    title: 'shared/Loader',
    component: Loader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: { to: '/' },
} as Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
} as Meta<typeof Loader>;

export const Dark: Story = {
    args: {},
} as Meta<typeof Loader>;

Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
