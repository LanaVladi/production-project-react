import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        svgr({ exportAsDefault: true }),
        react(),
    ],
    // resolve: {
    //     alias: [
    //         { find: '@', replacement: '/src' },
    //     ],
    // },
    define: {
        GLOBAL_ISDEV: JSON.stringify(true),
        __API__: JSON.stringify('http://localhost:8000'),
        __PROJECT__: JSON.stringify('frontend'),
    },
});
