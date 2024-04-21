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
import { Theme } from '../../src/app/providers/themeProvider';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
