import defineConfig from '@pixpilot/eslint-config';
import turboPlugin from 'eslint-plugin-turbo';
import commonConfig from './common.mjs';

const turboRecommendedConfig = turboPlugin.configs?.recommended;
const turboRecommendedRules =
  turboRecommendedConfig && !Array.isArray(turboRecommendedConfig)
    ? turboRecommendedConfig.rules
    : {};

// eslint-disable-next-line antfu/no-top-level-await
const baseConfig = await defineConfig(
  {
    type: 'app',
    turbo: true,
    test: true,
    typescript: {
      parserOptions: {
        allowDefaultProject: true,
      },
    },
  },
  // { ignores: ['**/*.config.*', '**/*.md'] },
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      ...turboRecommendedRules,
      'no-restricted-imports': [
        'error',
        {
          name: 'zod',
          message: "Use `import { z } from 'zod/v4'` instead to ensure v4.",
        },
      ],
    },
  },
  ...commonConfig,
);

/**
 * All packages that leverage t3-env should use this rule
 */
/** @type {Awaited<import('eslint').Linter.Config[]>} */
export default baseConfig;
