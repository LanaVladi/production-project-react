// module.exports = {
//     env: {
//         browser: true,
//         es2021: true,
//         jest: true,
//     },
//     extends: ['plugin:react/recommended', 'airbnb', 'plugin:i18next/recommended', 'plugin:storybook/recommended'],
//     parser: '@typescript-eslint/parser',
//     parserOptions: {
//         ecmaFeatures: {
//             jsx: true,
//         },
//         ecmaVersion: 'latest',
//         sourceType: 'module',
//     },
//     plugins: [
//         'react',
//         // 'import',
//         '@typescript-eslint',
//         'i18next',
//         '@stylistic/js',
//     ],
//     rules: {
//         indent: ['error', 4],
//         'react/jsx-indent': ['error', 4], // отступы в jsx коде
//         '@stylistic/js/indent': ['error', 4],
//         'react/jsx-indent-props': ['error', 4],
//         'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }], // расширения, в которых разрешен jsx
//         'import/no-unresolved': 'off', // сообщает о неразрешенных импортах в вызовах CommonJS и AMD
//         'import/prefer-default-export': 'off', // экпорт дефолтный отключили
//         'no-unused-vars': 'warn', // показывает неиспользуемые переменные
//         'react/require-default-props': 'off', // дефолтное значение пропса
//         'react/react-in-jsx-scope': 'off', // с React 17 нет необходимости объявлять реакт как import React from "react";
//         'react/jsx-props-no-spreading': 'warn', //  использование spread оператора в пропсах, кроме ui компонентов нежелательно
//         'react/function-component-definition': 'off', // function declaration preferable
//         'no-shadow': 'off', // Затенение — это процесс, при котором локальная переменная имеет то же имя,
//         //  что и переменная в содержащейся в ней области.
//         'import/extensions': 'off', // расширения импортов убираем
//         'import/no-extraneous-dependencies': 'off', // Запрещает импорт внешних модулей, которые не объявлены в package.json
//         'max-len': ['error', { code: 150, ignoreComments: true }],
//         '@stylistic/js/no-multiple-empty-lines': ['error',
//             { max: 2, maxEOF: 0, maxBOF: 1 }],
//         '@stylistic/js/max-len': ['error',
//             { code: 150, ignoreComments: true, ignoreUrls: true }],
//         // '@stylistic/js/linebreak-style': ['error', 'windows'],
//         '@stylistic/js/linebreak-style': ['off'],

//         // 'no-debugger': 'off',
//         // 'no-console': '0',F

//         // 'i18next/no-literal-string': [
//         //     'error',
//         //     {
//         //         ignoreAttribute: ['data-testid', 'to'],  // для атрибута "data-testid" отключаем перевод
//         //     },
//         // ],
//         // overrides: [
//         //     {
//         //         files: ['**/src/**/*.test.{ts,tsx}'],
//         //         rules: {
//         //             'i18next/no-literal-string': 0,
//         //         },
//         //     },
//         // ], // для файлов с расширениями переопределяет следующие правила. Для тестовых файлов отключаем перевод

//         // "no-multiple-empty-lines":
//         // 'i18next/no-literal-string': 2,
//         // 'no-underscore-dangle': 'off',
//         // 'i18next/no-literal-string': ['error', { markupOnly: true }],
//         // mode?: 'jsx-text-only' | 'jsx-only' | 'all',
//         // Если markupOnly опция включена, будут проверяться только текст и строки JSX, используемые в качестве атрибутов JSX.
//     },

//     globals: {
//         GLOBAL_ISDEV: true,
//         // Запрещ. исп-ние необъявленных переменных, если они не упомянуты в /*global */комментариях
//     },
// };

module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
        'react-hooks',
    ],
    rules: {
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        indent: [2, 4],
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'off', // warn
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true,
                ignoreAttribute: ['data-testid', 'to'],
            },
        ],
        'max-len': ['error', { ignoreComments: true, code: 150 }],

        // чтобы можно было установить разные события (onClick) на не интерактивные элементы на div.
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',

        // для контроля использвания хуков
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    },

    globals: {
        __IS_DEV__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
};
