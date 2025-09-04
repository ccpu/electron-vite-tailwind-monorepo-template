require('../../config/patch');

module.exports = {
  extends: ['@internal/eslint-config'],
  parserOptions: { tsconfigRootDir: __dirname },
  ignorePatterns: ['node_modules', 'dist'],
};
