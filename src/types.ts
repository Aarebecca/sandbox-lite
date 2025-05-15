export interface ExecuteOptions {
  compile?: boolean;
  timeout?: number;
  context?: Record<string, any>;
  allows?: {
    /**
     * Allowed dependencies.
     * @example ['@antv/*', '@ant-design']
     */
    dependencies?: string[];
  };
  denies?: {
    /**
     * Denied dependencies.
     * @example ['zlib']
     * @default all node built-in modules are denied.
     */
    dependencies?: string[];
    /**
     * Denied identifiers.
     * @example ['process', 'eval', 'Function']
     * @default ['__dirname', '__filename', 'Buffer', 'eval', 'Function', 'global', 'globalThis', 'module', 'process']
     */
    identifiers?: string[];
  };
}

export interface WorkerExecuteOptions extends ExecuteOptions {
  /**
   * The loop interval (ms).
   */
  interval?: number;
  /**
   * The CPU time limit (ms).
   */
  cpuTime?: number;
  /**
   * The memory limit (MB).
   */
  memory?: number;
  /**
   * The AbortSignal instance.
   */
  signal?: AbortSignal;
}
