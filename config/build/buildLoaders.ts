import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
            }],
    };

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const babelLoader = {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    ['i18next-extract',
                        {
                            locales: ['en', 'ru'], // Locales your project supports
                            keyAsDefaultValue: true,
                            // If true, use the extracted key as defaultValue (ignoring defaultValue option)
                            //  This is sometimes refered to as "natural keys".
                        },
                    ],
                ],
                inputSourceMap: isDev ? true : undefined, // Ensure inputSourceMap is set correctly
            },
        },
    };

    const cssLoader = buildCssLoader(isDev);

    // если не используем typescript, то нужен babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    return [
        fileLoader,
        svgLoader,
        babelLoader,
        typescriptLoader, // важен порядок лоадеров, чтение снизу вверх,
        //  т.к. мы используем ts, то его ставим первым, потом babelLoader, чтобы не было конфликта
        cssLoader,
    ];
}
