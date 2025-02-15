const config = {
    useTbas: true,
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    plugins: ['prettier-plugin-tailwindcss'],
    tailwindStylesheet: './src/app/globals.css',
    tailwindFunctions: ['cn'],
};

export default config;
