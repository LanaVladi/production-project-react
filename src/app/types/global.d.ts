// declare module '*.module.scss';
// // declare module '*.module.scss' {
// //     const clss: { [className: string]: string };
// //     export default clss;
// // }

// declare module '*.svg';

// declare module '*.png';
// declare module '*.jpg';
// declare module '*.jpeg';

// declare const GLOBAL_ISDEV: boolean;

// // declare module 'webpack-bundle-analyzer';

declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
    import React from 'react';

    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare const GLOBAL_ISDEV: boolean;
declare const __API__: string;

// declare module 'case-sensitive-paths-webpack-plugin';
