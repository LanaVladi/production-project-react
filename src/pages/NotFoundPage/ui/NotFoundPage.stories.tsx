// import React from 'react';
// import type { Meta, StoryObj } from '@storybook/react';
// import { NotFoundPage } from './NotFoundPage';
// import { Theme } from '../../../app/providers/themeProvider';
// import ThemeDecorator from '../../../shared/config/storybook/ThemeDecorator';

// const meta = {
//     title: 'pages/NotFoundPage',
//     component: NotFoundPage,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
// } as Meta<typeof NotFoundPage>;

// export default meta;

// type Story = StoryObj<typeof meta>;

// export const Normal: Story = {
//     args: {},
// } as Meta<typeof NotFoundPage>;

// export const Dark: Story = {
//     args: {},
// } as Meta<typeof NotFoundPage>;

// Dark.args = {};
// Dark.decorators = [ThemeDecorator(Theme.DARK)];

import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/themeProvider';
import { NotFoundPage } from './NotFoundPage';

export default {
    title: 'pages/NotFoundPage',
    component: NotFoundPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotFoundPage>;

const Template: ComponentStory<typeof NotFoundPage> = (args) => <NotFoundPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
