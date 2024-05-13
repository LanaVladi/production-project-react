import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins({
    paths, isDev, apiUrl, project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css', // когда будем файлы разбивать на асинхронные
        }),

        new webpack.DefinePlugin({
            GLOBAL_ISDEV: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
            // This makes it possible for us to safely use env vars on our code
            // 'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
        }),
        new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },
            ],
        }),
    ];

    // plugins.push(new BundleAnalyzerPlugin({
    //     openAnalyzer: false,
    // })); // при pre commit убираем из прод

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin()); // An EXPERIMENTAL Webpack plugin to enable "Fast Refresh"
        // (also previously known as Hot Reloading) for React components. -  isDev
        plugins.push(new webpack.HotModuleReplacementPlugin()); // Hot Module Replacement (HMR) - isDev
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false,
        }));
    }

    return plugins;
}
