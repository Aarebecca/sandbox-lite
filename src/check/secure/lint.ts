import { ESLint } from 'eslint';
import type { Checker } from '../types';
import { getESLintConfig } from './config';

export const lint: Checker = async (code, options) => {
  const eslint = new ESLint({
    baseConfig: [],
    overrideConfig: getESLintConfig(options),
    overrideConfigFile: true,
  });

  try {
    const results = await eslint.lintText(code, {});

    const formatter = await eslint.loadFormatter('stylish');
    const resultText = await formatter.format(results);
    if (resultText) {
      return { pass: false, message: resultText, errors: results[0].messages };
    }
  } catch (error) {
    return { pass: false, message: error.message };
  }

  return { pass: true, message: '' };
};
