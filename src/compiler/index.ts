import type { CompilerOptions } from 'typescript';
import { ModuleKind, ScriptTarget, transpileModule } from 'typescript';

export function compiler(
  sourceCode: string,
  options: CompilerOptions = {}
): string {
  const result = transpileModule(sourceCode, {
    compilerOptions: {
      target: ScriptTarget.ES2020,
      module: ModuleKind.CommonJS,
      ...options,
    },
  });

  return result.outputText;
}
