// import React from 'react';
// import type { Meta, StoryObj } from '@storybook/react';
// import { Theme } from '../../../app/providers/themeProvider';
// import ThemeDecorator from '../../../shared/config/storybook/ThemeDecorator';
// import { PageError } from './PageError';

// const meta = {
//     title: 'widget/PageError',
//     component: PageError,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
// } as Meta<typeof PageError>;

// export default meta;

// type Story = StoryObj<typeof meta>;

// export const Light: Story = {
//     args: {},
// } as Meta<typeof PageError>;

// export const Dark: Story = {
//     args: {},
// } as Meta<typeof PageError>;

// Dark.decorators = [ThemeDecorator(Theme.DARK)];

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '../../../app/providers/themeProvider';
import { ThemeDecorator } from '../../../shared/config/storybook/ThemeDecorator';
import { ErrorPage } from './ErrorPage';

export default {
    title: 'widgets/ErrorPage',
    component: ErrorPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ErrorPage>;

const Template: ComponentStory<typeof ErrorPage> = (args) => <ErrorPage {...args} />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
