import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserRole } from '../../../../entities/User';
import { StoreDecorator } from '../../../../shared/config/storybook/StoreDecorator';
import { AvatarDropdown } from './AvatarDropdown';

export default {
    title: 'features/AvatarDropdown',
    component: AvatarDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => <AvatarDropdown {...args} />;

export const Admin = Template.bind({});
Admin.args = {};

Admin.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
                username: 'admin',
                roles: [UserRole.ADMIN],
                avatar: 'https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1',
            },

        },
    }),
];

export const User = Template.bind({});

Admin.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=7`,
            method: 'GET',
            status: 200,
            response: [
                { rate: 4 },
            ],
        },
    ],
};

User.args = {};
User.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '2',
                username: 'user',
                roles: [UserRole.USER],
                avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
            },

        },
    }),
];
