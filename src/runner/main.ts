import { Script } from 'vm';
import { check } from '../check';
import { compile } from '../compiler';
import { createContext } from '../context';
import type { ExecuteOptions } from '../types';
import { getOptions } from '../options';

export function execute<T = any>(
  code: string,
  options: ExecuteOptions = {}
): T {
  const opts = getOptions(options);
  const checkResult = check(code, opts);
  if (!checkResult.pass) throw new Error(checkResult.message);

  const compiledCode = options.compile === false ? code : compile(code);

  const script = new Script(compiledCode);
  const returns = script.runInNewContext(createContext(opts), {
    timeout: opts.timeout,
    displayErrors: true,
    breakOnSigint: true,
  });

  return returns;
}
