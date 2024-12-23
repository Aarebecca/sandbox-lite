import { version } from '@antv/g6';
import { Graph } from '@antv/g6-ssr';
import assert from 'assert';
import { readFileSync } from 'fs';
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

execute<Promise<Graph>>(g6SSR, options).then(async (buffer) => {
  // writeFileSync(__dirname + '/graph.png', graph.toBuffer());

  assert.deepEqual(readFileSync(__dirname + '/graph.png'), buffer);
  process.exit(0);
});
