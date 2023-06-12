module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:perfectionist/recommended-alphabetical'
  ],
  plugins: ['perfectionist'],
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'func-call-spacing': 'off',
    'no-console': 'off',
    'perfectionist/sort-imports': 'off',
    'space-before-function-paren': 'off'
  }
}
