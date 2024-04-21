import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] {
    return [new HtmlWebpackPlugin({
        template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css', // когда будем файлы разбивать на асинхронные

    }),

    new webpack.DefinePlugin({
        GLOBAL_ISDEV: JSON.stringify(isDev),
    }),

    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement (HMR) - isDev
    // new ReactRefreshWebpackPlugin(), An EXPERIMENTAL Webpack plugin to enable "Fast Refresh"
    // (also previously known as Hot Reloading) for React components. -  isDev

    new BundleAnalyzerPlugin({
        openAnalyzer: false,
    }),
    ];
}
