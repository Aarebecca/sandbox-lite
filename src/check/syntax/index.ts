import type { Checker } from '../types';
import { parse } from '@babel/parser';

export const syntax: Checker = async (code) => {
  try {
    parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
    return { pass: true, message: '' };
  } catch (error) {
    return { pass: false, message: error.message };
  }
};
