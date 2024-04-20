import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions): WebpackDevServerConfiguration {
    return {
        port: options.port,
        open: true,
        historyApiFallback: true, // Cannot GET /about
        hot: true, // for Hot Module Replacement (HMR)
    };
}
