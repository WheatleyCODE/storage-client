module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'react', 'react-hooks', 'jsx-a11y', 'import'],
  extends: [
    'google',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'new-cap': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'default-param-last': 'off',
    'max-len': ['error', 100],
    'react-hooks/exhaustive-deps': ['warn'],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-return-assign': 'off',
    quotes: [2, 'single'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 100,
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    'jsx-a11y': {
      components: {
        MyButton: 'button',
        RoundButton: 'button',
      },
    },
  },
};
