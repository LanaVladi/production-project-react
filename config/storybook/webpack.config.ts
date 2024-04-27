// import webpack, { RuleSetRule } from 'webpack';
// import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
// import path from 'path';
// import { BuildEnv, BuildOptions, BuildPaths } from '../build/types/config';
// import { buildCssLoader } from '../build/loaders/buildCssLoader';

// export default ({ config }: { config: webpack.Configuration }) => {
//     console.log('config', config);
//     // console.log('env', env);
//     // const { isDev } = options;
//     // const mode = env.mode || 'development';
//     // console.log('mode', mode);
//     // const isDev = mode === 'development';
//     // console.log('isDev', isDev);

//     const paths: BuildPaths = {
//         build: '',
//         html: '',
//         entry: '',
//         src: path.resolve(__dirname, '..', '..', 'src'),
//     };

//     config.resolve?.modules?.push(paths.src);
//     config.resolve?.extensions?.push('.ts', '.tsx');

//     if ((config.module?.rules) !== undefined) {
//         const rules: RuleSetRule[] = config.module.rules as RuleSetRule[];

//         // eslint-disable-next-line no-param-reassign
//         config.module.rules = rules.map((rule: RuleSetRule) => {
//             if (/svg/.test(rule.test as string)) {
//                 return { ...rule, exclude: /\.svg$/ };
//             }

//             return rule;
//         });

//         config.module.rules.push({
//             test: /\.(js|jsx|ts|tsx)$/,
//             exclude: /node_modules/,
//             use: {
//                 loader: 'babel-loader',
//                 options: {
//                     presets: [
//                         '@babel/preset-env',
//                         ['@babel/preset-react', { runtime: 'automatic' }],
//                         '@babel/preset-typescript',
//                     ],
//                     plugins: [
//                         '@babel/plugin-proposal-class-properties',
//                         '@babel/plugin-proposal-nullish-coalescing-operator',
//                         '@babel/plugin-proposal-optional-chaining',
//                     ],
//                     inputSourceMap: true, // Ensure inputSourceMap is set correctly
//                 },
//             },
//         });
//     }

//     config.module?.rules?.push({
//         test: /\.svg$/i,
//         use: ['@svgr/webpack'],
//     });

//     config.module?.rules?.push(buildCssLoader(true));

//     config.plugins?.push(new CaseSensitivePathsPlugin());

//     return config;
// };

import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };

    config.resolve?.modules?.push(paths.src);
    config.resolve?.extensions?.push('.ts', '.tsx');

    if ((config.module?.rules) !== undefined) {
        const rules: RuleSetRule[] = config.module.rules as RuleSetRule[];

        // eslint-disable-next-line no-param-reassign
        config.module.rules = rules.map((rule: RuleSetRule) => {
            if (/svg/.test(rule.test as string)) {
                return { ...rule, exclude: /\.svg$/ };
            }

            return rule;
        });

        config.module?.rules?.push({
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        ['@babel/preset-react', { runtime: 'automatic' }],
                        '@babel/preset-typescript',
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-proposal-nullish-coalescing-operator',
                        '@babel/plugin-proposal-optional-chaining',
                    ],
                    // inputSourceMap: true, // Ensure inputSourceMap is set correctly
                },
            },
        });
    }

    config.module?.rules?.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });

    config.module?.rules?.push(buildCssLoader(true));
    config.plugins?.push(new DefinePlugin({
        GLOBAL_ISDEV: true,
        __API__: JSON.stringify(''),
    }));

    // config.plugins?.push(new CaseSensitivePathsPlugin() as any);

    return config;
};
