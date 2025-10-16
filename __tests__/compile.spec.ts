import assert from "assert";
import { compile } from "../src/compiler";

const originCode = `
  import { Graph } from '@antv/g6';
  import type { GraphData } from '@antv/g6';

  const graph = new Graph({});

  const data: GraphData = graph.getData();
`;

const targetCode = `
var _g6 = require('@antv/g6');
  

  const graph = new (0, _g6.Graph)({});

  const data = graph.getData();
`;

assert.strictEqual(compile(originCode).trim(), targetCode.trim());
