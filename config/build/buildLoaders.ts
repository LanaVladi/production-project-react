
import webpack from "webpack";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from "./types/config";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {

    const cssLoader = {
        test: /\.scss$/i, // test: /\.s[ac]ss$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // MiniCssExtractPlugin.loader вместо "style-loader", // Creates `style` nodes from JS strings
            {
                loader: "css-loader",
                options: {
                    modules: {
                        auto: ((resourcePath: string) => resourcePath.includes('.module')), // auto: /\.module\.\w+$/, // /\.module\.\w+$/
                        localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
                    },
                }
            }, // Translates CSS into CommonJS

            "sass-loader",  // Compiles Sass to CSS
        ],
    }

    // если не используем typescript, то нужен babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    }

    return [
        typescriptLoader,
        cssLoader
    ]
}