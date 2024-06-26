import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;
    // const fileLoader = {
    //     test: /\.(png|jpe?g|gif)$/i,
    //     use: [
    //         {
    //             loader: 'file-loader',
    //         }],
    // };

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    const cssLoader = buildCssLoader(isDev);

    // если не используем typescript, то нужен babel-loader
    // const typescriptLoader = {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // };

    return [
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        // babelLoader,
        // typescriptLoader, // важен порядок лоадеров, чтение снизу вверх,
        //  т.к. мы используем ts, то его ставим первым, потом babelLoader, чтобы не было конфликта
        cssLoader,
    ];
}
