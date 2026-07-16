// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default withNuxt({
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    // Matikan aturan ESLint yang bertentangan dengan Prettier
    'semi': 'off',
    'no-extra-semi': 'off',
    'quotes': 'off',
    // Aturan lainnya yang mungkin bertentangan (optional)
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
    'object-curly-spacing': 'off',

    // Aktifkan Prettier sebagai aturan ESLint (opsional, untuk error/warning)
    'prettier/prettier': 'warn',

    // Nonaktifkan semua aturan yang sudah ditangani Prettier
    ...eslintConfigPrettier.rules,

    // Aturan tambahan untuk kualitas kode
    'vue/multi-word-component-names': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
});
