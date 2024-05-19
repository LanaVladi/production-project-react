// import type { StorybookConfig } from '@storybook/react-webpack5';

// const config: StorybookConfig = {
//     framework: {
//         name: '@storybook/react-webpack5',
//         options: {},
//     },
//     stories: [
//     // '../../src/**/*.mdx',
//         '../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
//     addons: [
//         '@storybook/addon-webpack5-compiler-swc',
//         '@storybook/addon-onboarding',
//         '@storybook/addon-links',
//         '@storybook/addon-essentials',
//         '@chromatic-com/storybook',
//         '@storybook/addon-interactions',
//     // '@storybook/addon-styling',
//     ],

//     docs: {
//         autodocs: 'tag',
//     },
// };
// export default config;

module.exports = {
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-addon-mock/register',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
};
