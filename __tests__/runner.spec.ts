import { version } from '@antv/g6';
import assert from 'assert';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { execute } from '../src';

const javascriptCode = `
const a = 1;
const b = 2;

a + b;
`;

assert.strictEqual(execute(javascriptCode), 3);

const typescriptCode = `
const a: number = 1;
const b: number = 2;

a + b;
`;

assert.strictEqual(execute(typescriptCode), 3);

assert.throws(() => {
  execute(typescriptCode, { compile: false });
});

const options = {
  allows: {
    dependencies: ['@antv/*', '@ant-design'],
  },
};

const g6Version = `
import { version } from '@antv/g6';

version;
`;

assert.strictEqual(execute(g6Version, options), version);

const g6SSR = `
import { createGraph } from '@antv/g6-ssr';

createGraph({
  width: 100,
  height: 100,
  imageType: 'png',
  data: {
    nodes: [{ id: 'node-1', style: { x: 50, y: 50 } }],
  }
}).then(graph => graph.toBuffer());
`;

execute<Promise<Buffer>>(g6SSR, options).then(async (buffer) => {
  const file = __dirname + '/assets/graph.png';
  if (!existsSync(file)) writeFileSync(file, buffer);
  else assert.deepEqual(readFileSync(file), buffer);

  process.exit(0);
});
