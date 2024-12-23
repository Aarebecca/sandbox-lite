import type { ExecuteOptions, WorkerExecuteOptions } from './types';

const DEFAULT_DENIED_DEPS = [
  'assert',
  'buffer',
  'child_process',
  'cluster',
  'crypto',
  'dgram',
  'dns',
  'domain',
  'events',
  'freelist',
  'fs',
  'http',
  'https',
  'module',
  'net',
  'os',
  'path',
  'punycode',
  'querystring',
  'readline',
  'repl',
  'smalloc',
  'stream',
  'string_decoder',
  'sys',
  'timers',
  'tls',
  'tracing',
  'tty',
  'url',
  'util',
  'vm',
  'zlib',
];

const DEFAULT_ALLOWED_DEPS = [];

const DEFAULT_DENIED_IDENTIFIERS = [
  '__dirname',
  '__filename',
  'Buffer',
  'eval',
  'Function',
  'global',
  'globalThis',
  'module',
  'process',
];

export function getOptions<T extends ExecuteOptions | WorkerExecuteOptions>(
  opts: T
): T {
  const options = { ...opts };

  if (!options.denies) options.denies = {};
  if (!options.allows) options.allows = {};

  if (!options.denies?.dependencies)
    options.denies.dependencies = DEFAULT_DENIED_DEPS;
  if (!options.allows?.dependencies)
    options.allows.dependencies = DEFAULT_ALLOWED_DEPS;
  if (!options.denies?.identifiers)
    options.denies.identifiers = DEFAULT_DENIED_IDENTIFIERS;

  return options;
}
