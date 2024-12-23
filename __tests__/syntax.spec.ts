import { syntax } from '../src/check/syntax';
import assert from 'assert';

const javascriptCode = `
  import { Graph } from '@antv/g6';

  const graph = new Graph({});
`;

syntax(javascriptCode).then((result) => {
  assert.strictEqual(result.pass, true);
});

const typescriptCode = `
  import { Graph } from '@antv/g6';
  import type { GraphData } from '@antv/g6';

  const graph: Graph = new Graph({});

  const data: GraphData = graph.getData();
`;

syntax(typescriptCode).then((result) => {
  assert.strictEqual(result.pass, true);
});

const pythonCode = `
  import os

  print(os.getcwd())
`;

syntax(pythonCode).then((result) => {
  assert.strictEqual(result.pass, false);
});
