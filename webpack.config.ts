// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";


const config: webpack.Configuration = {
    mode: 'development',     // mode: 'production',
    entry: path.resolve(__dirname, 'src', 'index.ts'),  // entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',  // для динамичного изменения имени filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new webpack.ProgressPlugin()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

};
export default config;