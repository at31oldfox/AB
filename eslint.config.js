import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintConfigPrettierFlat from 'eslint-config-prettier/flat'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintReact from 'eslint-plugin-react'
import eslintReactHooks from 'eslint-plugin-react-hooks'
import eslintReactRefresh from 'eslint-plugin-react-refresh'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tsEslint.config(
  {
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      react: eslintReact,
      'react-hooks': eslintReactHooks,
      'react-refresh': eslintReactRefresh,
      'unused-imports': unusedImports,
      prettier: eslintPluginPrettier
    }
  },
  {
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js']
  },
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintConfigPrettierFlat,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.node.json']
      }
    }
  },
  {
    files: ['**/*.{js,ts,tsx,mjs,cjs}'],
    rules: {
      ...eslintPluginPrettier.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      'prettier/prettier': 'error',
      'no-console': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
      'react/self-closing-comp': ['error', { component: true, html: true }]
      //'max-lines': ['warn', { max: 124 }],
      //'max-params': ['error', 3]
    }
  }
)
