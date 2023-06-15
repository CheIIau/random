module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:perfectionist/recommended-alphabetical',
    'plugin:storybook/recommended'
  ],
  plugins: ['perfectionist'],
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'func-call-spacing': 'off',
    'no-console': 'off',
    'perfectionist/sort-imports': 'off',
    'perfectionist/sort-objects': 'off',
    'space-before-function-paren': 'off'
  }
}
