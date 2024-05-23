import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Notification } from '../../../../entities/Notification/model/types/notification';
import { NotificationItem } from './NotificationItem';

const notificationItem: Notification = {
    id: '2',
    title: 'Уведомление 2',
    description: 'Произошло какое-то событие',
    userId: '1',
    href: 'http://localhost:3000/admin',
};

export default {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    item: notificationItem,
};
