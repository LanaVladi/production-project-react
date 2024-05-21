import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        // preferAbsolute: true,
        // modules: [options.paths.src, 'node-modules'],
        // mainFiles: ['index'],
        // alias: {
        //     // '@': options.paths.src, // алиасы для абсолютных путей
        // },
        // fallback: {
        //     events: require.resolve('events/'),
        //     // events: false,
        // },
    };
}
