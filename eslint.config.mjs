// eslint.config.js
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import nextPlugin from '@next/eslint-plugin-next'
import parser from '@typescript-eslint/parser'

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended,{
    rules: {
			// Indent with 2 spaces
			"indent": ["error", 2],
			"react/jsx-indent": ["error", 2],
			"react/jsx-indent-props": ["error", 2],
    },
    files: ['**/*.{ts,tsx}'],
    plugins:{
        react,
        nextPlugin
    },
    languageOptions:{
        parser: parser
    },
})