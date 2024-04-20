import type { Preview } from '@storybook/react';
import '../../src/app/styles/index.scss';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';
import ThemeDecorator from '../../src/shared/config/storybook/ThemeDecorator';
import { Theme } from '../../src/app/providers/themeProvider';
import RouterDecorator from '../../src/shared/config/storybook/RouterDecorator';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },

    },
    decorators: [
        StyleDecorator,
        ThemeDecorator(Theme.LIGHT),
        RouterDecorator,
    ],

};

export default preview;
