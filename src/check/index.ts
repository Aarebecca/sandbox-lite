import { lint } from './secure';
import { ExecuteOptions, WorkerExecuteOptions } from '../types';

const pipeline = [lint];

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
