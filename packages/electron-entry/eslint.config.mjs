import baseConfig from '@internal/eslint-config/base';

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  ...baseConfig,
];
