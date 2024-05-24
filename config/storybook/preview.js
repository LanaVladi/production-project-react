// import type { Preview } from '@storybook/react';
// import '../../src/app/styles/index.scss';
// import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';
// import ThemeDecorator from '../../src/shared/config/storybook/ThemeDecorator';
// import { Theme } from '../../src/app/providers/themeProvider';
// import RouterDecorator from '../../src/shared/config/storybook/RouterDecorator';

// const preview: Preview = {
//     parameters: {
//         controls: {
//             matchers: {
//                 color: /(background|color)$/i,
//                 date: /Date$/,
//             },
//         },

//     },
//     decorators: [
//         StyleDecorator,
//         ThemeDecorator(Theme.LIGHT),
//         RouterDecorator,
//     ],
// };

// export default preview;

import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator';
import { Theme } from '../../src/shared/const/theme';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator';
import {
    SuspenseDecorator,
} from '../../src/shared/config/storybook/SuspenseDecorator';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' }, // настройка для работы экшенов (onClick, onChange,...)
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    layout: 'fullscreen',
    themes: {
        default: 'light',
        list: [
            { name: 'light', class: ['app', Theme.LIGHT], color: '#ffffff' },
            { name: 'dark', class: ['app', Theme.DARK], color: '#000000' },
            { name: 'orange', class: ['app', Theme.ORANGE], color: '#ffb005' },
        ],
    },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
