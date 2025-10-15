import { transformSync } from "@babel/core";

export function compile(sourceCode: string): string {
  const result = transformSync(sourceCode, {
    presets: [
      "@babel/preset-typescript", // 处理TypeScript
    ],
    plugins: [
      ["@babel/plugin-transform-modules-commonjs", { strictMode: false }], // 转换为CommonJS格式，禁用严格模式输出
    ],
    // 其他配置
    sourceMaps: false, // 对应 sourcemap: false
    minified: false, // 对应 minify: false
    filename: "index.ts", // 对应 sourcefile: 'index.ts'
  });

  return result?.code ?? "";
}
