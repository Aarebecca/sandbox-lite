import { transform } from "sucrase";

export function compile(sourceCode: string): string {
  return transform(sourceCode, {
    transforms: ["typescript", "imports"],
    disableESTransforms: true,
  }).code.replace(/^"use\sstrict";?\n?/, "");
}
