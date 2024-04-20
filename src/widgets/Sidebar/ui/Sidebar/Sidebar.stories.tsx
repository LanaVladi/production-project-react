import type { Meta, StoryObj } from '@storybook/react';
import ThemeDecorator from '../../../../shared/config/storybook/ThemeDecorator';
import { Theme } from '../../../../app/providers/themeProvider';
import { Sidebar } from './Sidebar';

const meta = {
    title: 'widget/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {},
} as Meta<typeof Sidebar>;

export const Dark: Story = {
    args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];
