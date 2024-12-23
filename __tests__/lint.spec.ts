import { lint } from '../src/check/secure';
import { getOptions } from '../src/options';
import assert from 'assert';

const importDeniedDeps = `
  import { Graph } from '@antv/g6';
  import { Charts } from '@ant-design/charts';
  import { writeFileSync } from 'fs';
  import { execSync } from 'child_process';
  import { arch } from 'os';
`;

lint(importDeniedDeps, getOptions({})).then((result) => {
  assert.strictEqual(result.pass, false);
  assert.strictEqual(result.errors.length, 3);
});

const requireDeniedDeps = `
  const { Graph } = require('@antv/g6');
  const { Charts } = require('@ant-design/charts');
  const { writeFileSync } = require('fs');
  const { execSync } = require('child_process');
  const { arch } = require('os');
`;

lint(requireDeniedDeps, getOptions({})).then((result) => {
  assert.strictEqual(result.pass, false);
  assert.strictEqual(result.errors.length, 3);
});

const accessDeniedIdentifiers = `
eval('console.log(1)');
const fn = new Function('return 1');
console.log(global.process, globalThis.process);
console.log(__dirname, __filename);
console.log(process);
const buffer = Buffer.from('hello');
module.exports = 1;
`;

lint(accessDeniedIdentifiers, getOptions({})).then((result) => {
  assert.strictEqual(result.pass, false);
  assert.strictEqual(result.errors.length, 10);
});
