module.exports = {
    env: {
        browser: true,
        es2021: true,
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
    ],
    rules: {
        'react/jsx-indent': [2, 4], // отступы в jsx коде
        'react/jsx-indent-props': [2, 4],
        indent: [2, 4],
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }], // расширения, в которых разрешен jsx
        'import/no-unresolved': 'off', // сообщает о неразрешенных импортах в вызовах CommonJS и AMD
        'import/prefer-default-export': 'off', // экпорт дефолтный отключили
        'no-unused-vars': 'warn', // показывает неиспользуемые переменные
        'react/require-default-props': 'off', // дефолтное значение пропса
        'react/react-in-jsx-scope': 'off', // с React 17 нет необходимости объявлять реакт как import React from "react";
        'react/jsx-props-no-spreading': 'warn', //  использование spread оператора в пропсах, кроме ui компонентов нежелательно
        'react/function-component-definition': 'off', // function declaration preferable
        'no-shadow': 'off', // Затенение — это процесс, при котором локальная переменная имеет то же имя,
        //  что и переменная в содержащейся в ней области.
        'import/extensions': 'off', // расширения импортов убираем
        'import/no-extraneous-dependencies': 'off', // Запрещает импорт внешних модулей, которые не объявлены в package.json
        'max-len': ['error', { ignoreComments: true }],
        
        // 'no-underscore-dangle': 'off',
        // 'i18next/no-literal-string': ['error', { markupOnly: true }],
        // mode?: 'jsx-text-only' | 'jsx-only' | 'all',
        // Если markupOnly опция включена, будут проверяться только текст и строки JSX, используемые в качестве атрибутов JSX.
    },

    mode: 'jsx-text-only',
    'jsx-components': {
        include: [],
        exclude: ['Trans'],
    },
    'jsx-attributes': {
        include: [],
        exclude: [
            'className',
            'styleName',
            'style',
            'type',
            'key',
            'id',
            'width',
            'height',
        ],
    },
    words: {
        exclude: [
            '[0-9!-/:-@[-`{-~]+',
            '[A-Z_-]+',
            require('./htmlEntities'),
            /^\p{Emoji}+$/u,
        ],
    },
    callees: {
        exclude: [
            'i18n(ext)?',
            't',
            'require',
            'addEventListener',
            'removeEventListener',
            'postMessage',
            'getElementById',
            'dispatch',
            'commit',
            'includes',
            'indexOf',
            'endsWith',
            'startsWith',
        ],
    },
    'object-properties': {
        include: [],
        exclude: ['[A-Z_-]+'],
    },
    'class-properties': {
        include: [],
        exclude: ['displayName'],
    },
    message: 'disallow literal string',
    'should-validate-template': false,
    globals: {
        GLOBAL_ISDEV: true,
        // Запрещ. исп-ние необъявленных переменных, если они не упомянуты в /*global */комментариях
    },
};
