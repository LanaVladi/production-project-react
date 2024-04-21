// import type { Meta, StoryObj } from '@storybook/react';
// import '../../../app/styles/index.scss';
// import ThemeDecorator from '../../../shared/config/storybook/ThemeDecorator';
// import { Theme } from '../../../app/providers/themeProvider';
// import { Button, ButtonTheme } from './Button';

// const meta = {
//     title: 'shared/Button',
//     component: Button,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
//     // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
//     // args: { onClick: fn() },
// } as Meta<typeof Button>;

// export default meta;

// type Story = StoryObj<typeof meta>;

// export const Primary: Story = {
//     args: {
//         children: 'Text',
//     },
// } as Meta<typeof Button>;

// export const Secondary: Story = {
//     args: {
//         children: 'Text',
//         theme: ButtonTheme.CLEAR,
//     },
// };

// export const Outline: Story = {
//     args: {
//         children: 'Text',
//         theme: ButtonTheme.OUTLINE,
//     },
//     decorators: [ThemeDecorator(Theme.LIGHT)],
// };

// export const OutlineDark: Story = {
//     args: {
//         children: 'Text',
//         theme: ButtonTheme.OUTLINE,
//     },

//     decorators: [ThemeDecorator(Theme.DARK)],
// };

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/themeProvider';
import { Button, ThemeButton } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ThemeButton.CLEAR,
};

export const Outline = Template.bind({});
Outline.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];
