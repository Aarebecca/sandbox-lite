import { Script } from 'vm';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { check } from '../check';
import { compile } from '../compiler';
import { createContext } from '../context';
import type { WorkerExecuteOptions } from '../types';
import { getOptions } from '../options';

export function executeInWorker<T = any>(
  code: string,
  options: WorkerExecuteOptions = {}
): Promise<T> {
  const opts = getOptions(options);
  const { interval = 100 } = opts;

  return new Promise((resolve, reject) => {
    try {
      const checkResult = check(code, opts);
      if (!checkResult.pass) throw new Error(checkResult.message);

      const compiledCode = options.compile === false ? code : compile(code);

      const worker = new Worker(__filename, {
        workerData: {
          code: compiledCode,
          options: opts,
        },
      });

      const loop = setInterval(() => {
        if (opts.cpuTime && getCPUTime() > opts.cpuTime) {
          worker.terminate();
          clearInterval(loop);
          reject(new Error('CPU time exceeded'));
        }
        if (opts.memory && getMemoryUsage() > opts.memory) {
          worker.terminate();
          clearInterval(loop);
          reject(new Error('Memory exceeded'));
        }
      }, interval);

      opts.signal?.addEventListener('abort', () => {
        worker.terminate();
        reject(new Error('Execution was aborted by the user'));
      });

      worker.on('message', (returns) => {
        clearInterval(loop);
        resolve(returns);
      });

      worker.on('error', reject);

      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    } catch (error) {
      console.error(error);
    }
  });
}

function getCPUTime() {
  const { user, system } = process.cpuUsage();
  return user + system;
}

function getMemoryUsage() {
  return process.memoryUsage().heapUsed;
}

if (!isMainThread) {
  const { code, options } = workerData;

  try {
    const script = new Script(code);
    const returns = script.runInNewContext(createContext(options.context), {
      timeout: options.timeout,
      displayErrors: true,
      breakOnSigint: true,
    });
    parentPort.postMessage(returns);
  } catch (error) {
    parentPort.postMessage(error);
  }
}
