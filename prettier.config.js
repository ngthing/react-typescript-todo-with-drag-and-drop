module.exports = {
    printWidth: 80,
    tabWidth: 4,
    trailingComma: 'all',
    singleQuote: true,
    semi: true,
    importOrder: [
        // https://andreipfeiffer.dev/blog/2021/react-components-anatomy
        // external dependencies are placed first, by default

        // then, include internal dependencies
        '^../(.*)',

        // then, include local dependencies, except styles
        '^./((?!scss).)*$',

        // lastly, include everything else
        '^./(.*)',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};
