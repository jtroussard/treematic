// generateTreeFunction-snapShots.test.js
const path = require('path');
const fs = require('fs');
const assert = require('assert');
const { generateTreeString } = require('../../src/coreTreeLogic'); 

suite('generateTree snapshot test (live)', function () {
  test('should match expected output from tree-node-cli', async function () {
    const samplePath = path.resolve(__dirname, '../../fixtures/sample-001_small-project');
    const expectedPath = path.resolve(__dirname, '../../fixtures/expected/sample-001_small-project.txt');
    const expectedOutput = fs.readFileSync(expectedPath, 'utf-8');

    // Define a dummy config object that your test can control
    const testConfig = {
      allFiles: true,
      dirsFirst: false,
      dirsOnly: false,
      sizes: false,
      exclude: ['/node_modules\//', '/venv\//', '/.git\//'],
      maxDepth: -1,
      reverse: false,
      trailingSlash: false,
      ascii: false,
    };

    // Call the pure function and capture its return value
    const actualOutput = generateTreeString(samplePath, testConfig);

    console.log('\n--- ACTUAL OUTPUT ---\n' + actualOutput + '\n--- END ACTUAL OUTPUT ---\n');

    assert.strictEqual(actualOutput.trim(), expectedOutput.trim());
  });
});