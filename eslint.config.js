import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      semi: ['error', 'always', { omitLastInOneLineBlock: false }], // Чтобы в конце были обязательно ;
      'comma-dangle': ['error', 'never'], // не должно быть висящих запятых
      quotes: ['error', 'single'], // приводит к одинарным кавычкам
      'react/prop-types': [0], // выключили проверку props
      indent: ['error', 'tab'],
    },
  }
);
