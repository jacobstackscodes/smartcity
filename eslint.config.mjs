import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        files: ['./src/**/*.tsx', './src/**/*.ts'],
        rules: {
            indent: ['warn', 'tab'],
            'max-len': ['error', { code: 100 }],
            'nonblock-statement-body-position': ['error', 'besides'],
        },
    },
    {
        overrides: [
            {
                files: ['./src/types/*.ts'],
                rules: {
                    '@typescript-eslint/no-namespace': 'off',
                },
            },
        ],
    },
];

export default eslintConfig;
