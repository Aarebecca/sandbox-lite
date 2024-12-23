import { createContext as CC } from 'vm';
import type { ExecuteOptions, WorkerExecuteOptions } from './types';
import { minimatch } from 'minimatch';

export const createContext = (
  options: ExecuteOptions | WorkerExecuteOptions
): Record<string, any> => {
  const { context, allows, denies } = options;
  return CC(
    Object.freeze({
      require: (name) => {
        if (
          !allows.dependencies.some((pattern) => minimatch(name, pattern)) ||
          denies.dependencies.some((pattern) => minimatch(name, pattern))
        ) {
          throw new Error(`The module "${name}" is not allowed.`);
        }
        return require(name);
      },
      exports: {},
      ...context,
    })
  );
};
