import { ExecuteOptions, WorkerExecuteOptions } from '../types';

export type Checker = (
  code: string,
  options?: ExecuteOptions | WorkerExecuteOptions
) => Promise<{ pass: boolean; message: string; [keys: string]: any }>;
