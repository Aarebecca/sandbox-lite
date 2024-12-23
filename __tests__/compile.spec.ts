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
  `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const g6_1 = require("@antv/g6");
const graph = new g6_1.Graph({});
const data = graph.getData();
`
);
