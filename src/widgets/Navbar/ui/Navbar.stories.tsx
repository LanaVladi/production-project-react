// import type { Meta, StoryObj } from '@storybook/react';
// import { Theme } from '../../../app/providers/themeProvider';
// import ThemeDecorator from '../../../shared/config/storybook/ThemeDecorator';
// import { Navbar } from './Navbar';

// const meta = {
//     title: 'widget/Navbar',
//     component: Navbar,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
// } as Meta<typeof Navbar>;

// export default meta;

// type Story = StoryObj<typeof meta>;

// export const Light: Story = {
//     args: {},
// } as Meta<typeof Navbar>;

// export const Dark: Story = {
//     args: {},
// } as Meta<typeof Navbar>;

// Dark.decorators = [ThemeDecorator(Theme.DARK)];

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/themeProvider';
import { Navbar } from './Navbar';

export default {
    title: 'widget/Navbar',
    component: Navbar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
