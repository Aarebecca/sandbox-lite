import { executeInWorker } from '../lib';
import assert from 'assert';

const code = `
  const array = new Float32Array([1,2,3,4,5]);
  array;
`;

executeInWorker(code).then((result) => {
  assert.deepStrictEqual(result, new Float32Array([1, 2, 3, 4, 5]));
  assert.equal(result.length, 5);
  process.exit(0);
});

const terminateCode = `
  setTimeout(() => {
    console.log('Hello, World!');
  }, 100);
`;

const controller = new AbortController();
const signal = controller.signal;

executeInWorker(terminateCode, { signal }).catch((error) => {
  assert.equal(error.message, 'Execution was aborted by the user');
  process.exit(0);
});

controller.abort();
