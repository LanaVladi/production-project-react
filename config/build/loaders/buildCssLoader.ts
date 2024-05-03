import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildCssLoader(isDev: boolean) {
    return {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // MiniCssExtractPlugin.loader вместо "style-loader",
            // Creates `style` nodes from JS strings
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: ((resourcePath: string) => Boolean(resourcePath.includes('.module'))),
                        // auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:5]'
                            : '[hash:base64:8]',
                        exportLocalsConvention: 'camelCase', // для написания стилей в camelCase
                    },
                },
            }, // Translates CSS into CommonJS

            'sass-loader', // Compiles Sass to CSS
        ],
    };
}
