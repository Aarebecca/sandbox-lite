import assert from 'assert';
import { compiler } from '../src/compiler';

const javascriptCode = `
  import { Graph } from '@antv/g6';
  import type { GraphData } from '@antv/g6';

  const graph = new Graph({});

  const data: GraphData = graph.getData();
`;

assert.strictEqual(
  compiler(javascriptCode),
  `var import_g6 = require("@antv/g6");
const graph = new import_g6.Graph({});
const data = graph.getData();
`
);
