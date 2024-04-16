import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/config";
import webpack from "webpack";


export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { mode, paths, isDev } = options;

    return {
        mode: mode,
        entry: paths.entry,
        
        // {
        //     app: paths.entry,
        //     // hot: 'webpack/hot/dev-server.js',
        //     // client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true'
        // },
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
        // cache: isDev ? false : true
        
        // {
        //     // isDev? buildDevServer(options): undefined,
        //     //  buildDevServer(options),
        //     hot: true, // Enable HMR on the server
        //     // client: {
        //     //     overlay: true, // Show an overlay in the browser when there are errors or warnings
        //     // },

        // }
    };

}