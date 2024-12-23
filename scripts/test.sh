#!/bin/sh

tsx ./__tests__/syntax.spec.ts
tsx ./__tests__/lint.spec.ts
tsx ./__tests__/compile.spec.ts
tsx ./__tests__/runner.spec.ts
tsx ./__tests__/runner-worker.spec.ts

