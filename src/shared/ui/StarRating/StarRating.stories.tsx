import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StarRating } from './StarRating';

export default {
    title: 'shared/StarRating',
    component: StarRating,
    argTypes: {
        size: {
            type: 'number',
            description: 'Star size',
        },
        backgroundColor: {
            type: 'string',
            description: 'Background color',
            control: 'color',
        },
    },
    decorators: [
        (Story) => <div style={{ padding: 20 }}><Story /></div>,
    ],
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => <StarRating {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    size: 30,
};
