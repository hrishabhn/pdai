/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    bracketSpacing: false,
    printWidth: 180,
    arrowParens: 'avoid',
    plugins: [
        //
        '@trivago/prettier-plugin-sort-imports',
        'prettier-plugin-tailwindcss',
    ],

    tailwindFunctions: ['tw'],

    importOrder: [
        //
        '^server-only$',
        '^[./]',
        '<THIRD_PARTY_MODULES>',
        '^@/model/(.*)$',
        '^@/lib/(.*)$',
        '^@/components/(.*)$',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
}

module.exports = config
