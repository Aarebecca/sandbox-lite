import { lint } from './secure';
import { syntax } from './syntax';
import { ExecuteOptions, WorkerExecuteOptions } from '../types';

const pipeline = [syntax, lint];

export function check(
  code: string,
  options: ExecuteOptions | WorkerExecuteOptions = {}
) {
  for (const checker of pipeline) {
    checker(code, options).then((result) => {
      if (!result.pass) {
        return result;
      }
    });
  }
  return { pass: true, message: '' };
}
