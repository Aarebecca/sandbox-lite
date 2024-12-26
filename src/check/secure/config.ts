import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginSecurity from 'eslint-plugin-security';
import { flatConfigs } from 'eslint-plugin-import';
import type { ExecuteOptions, WorkerExecuteOptions } from '../../types';

export const getESLintConfig = (
  options: ExecuteOptions | WorkerExecuteOptions = {}
) => {
  const { denies, allows } = options;
  return [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    {
      languageOptions: { globals: globals.node },
    },
    pluginJs.configs.recommended,
    pluginSecurity.configs.recommended,
    flatConfigs.recommended,
    // 限制库引用
    {
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: [
                  ...denies.dependencies,
                  ...allows.dependencies.map((lib) => `!${lib}`),
                ],
              },
            ],
          },
        ],
        'no-restricted-modules': [
          'error',
          {
            patterns: denies.dependencies,
          },
        ],
      },
    },
    // 限制全局变量
    {
      rules: {
        'no-restricted-globals': [
          'error',
          ...denies.identifiers.map((name) => ({
            name,
            message: `${name} is denied`,
          })),
        ],
      },
    },
    {
      rules: {
        'import/no-unresolved': 'off',
        'no-unused-vars': 'off',
      },
    },
  ];
};
