module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    '@typescript-eslint/tslint'
  ],
  ignorePatterns: ['node_modules/', 'types/'],
  rules: {
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
    'no-console': 'error',
    'lines-between-class-members': 'off',
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-prototype-builtins': 'off',
    'prefer-destructuring': ['error', {
      'AssignmentExpression': {
        'array': false,
      }
    }],
    '@typescript-eslint/no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
  }
};