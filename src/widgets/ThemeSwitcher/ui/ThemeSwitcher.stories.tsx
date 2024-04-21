// import React from 'react';
// import type { Meta, StoryObj } from '@storybook/react';
// import { ThemeSwitcher } from './ThemeSwitcher';
// import { Theme } from '../../../app/providers/themeProvider';
// import ThemeDecorator from '../../../shared/config/storybook/ThemeDecorator';

// const meta = {
//     title: 'shared/ThemeSwitcher',
//     component: ThemeSwitcher,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
//     args: { to: '/' },
// } as Meta<typeof ThemeSwitcher>;

// export default meta;

// type Story = StoryObj<typeof meta>;

// export const Normal: Story = {
//     args: {},
// } as Meta<typeof ThemeSwitcher>;

// export const Dark: Story = {
//     args: {},
// } as Meta<typeof ThemeSwitcher>;

// Dark.args = {};
// Dark.decorators = [ThemeDecorator(Theme.DARK)];

import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/themeProvider';
import { ThemeSwitcher } from './ThemeSwitcher';

export default {
    title: 'shared/ThemeSwitcher',
    component: ThemeSwitcher,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ThemeSwitcher>;

const Template: ComponentStory<typeof ThemeSwitcher> = (args) => <ThemeSwitcher {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
