## Node-Sandbox

This is a simple sandbox for running JavaScript in the Node.js environment, supporting the following features:

- [x] Static security checks
- [x] Dependency control (allow or disable dependencies)
- [x] Global variable access control
- [x] Syntax checking
- [x] Support TypeScript
- [x] Support execution in the main thread or WebWorker
  
## Usage

1. Install the package:

```bash
npm install node-sandbox
```

2. execute the code:

Run in the main thread:

```javascript
import { execute } from 'node-sandbox';

const code = `
  const a = 1;
  const b = 2;
  
  a + b;
`;

const result = await execute(code);
```

Run in the WebWorker:

```javascript
import { executeInWorker } from 'node-sandbox';

const code = `
  const a = 1;
  const b = 2;
  
  a + b;
`;

const result = await executeInWorker(code);
```

## Configuration

Run in the main thread:

**timeout** _number_

The maximum time in milliseconds that the code can run. Default is Infinity.

**context** _object_

The context object that will be available in the code. Default is an empty object.

**allows** 

* **dependencies** _string[]_

  The dependencies that the code can use. Default is an empty array.

