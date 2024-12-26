import { transformSync } from 'esbuild';

export function compiler(sourceCode: string): string {
  const result = transformSync(sourceCode, {
    loader: 'ts',
    format: 'cjs',
    target: 'es2020',
    sourcefile: 'index.ts',
    sourcemap: false,
    minify: false,
  });

  return result.code;
}
