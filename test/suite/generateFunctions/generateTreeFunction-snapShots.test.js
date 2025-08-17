const path = require('path');
const fs = require('fs');
const assert = require('assert');

// Set clipboard stub BEFORE importing `generateTree`
let actualOutput = '';
const vscode = require('vscode');
const originalClipboard = vscode.env.clipboard.writeText;
vscode.env.clipboard.writeText = (text) => {
  actualOutput = text;
};


const { generateTree } = require('../../../src/generateTreeFunctions');

suite('generateTree snapshot test (live)', function () {
  test('should match expected output from tree-node-cli', async function () {

    const samplePath = path.resolve(__dirname, '../../fixtures/sample-001_small-project');
    const expectedPath = path.resolve(__dirname, '../../fixtures/expected/sample-001_small-project.txt');

    const expectedOutput = fs.readFileSync(expectedPath, 'utf-8').trim();

    console.log('TUNA samplePath:', samplePath);
    console.log('PIZZA exists?', fs.existsSync(samplePath));

    let actualOutput = '';
    const originalClipboardWrite = vscode.env.clipboard.writeText;

    // Capture clipboard output from real generateTree
    vscode.env.clipboard.writeText = (text) => {
      actualOutput = text.trim();
    };

    await generateTree({ fsPath: samplePath });

    console.log('\n--- EXPECTED OUTPUT ---\n' + expectedOutput + '\n--- END EXPECTED OUTPUT ---');
    console.log('\n--- ACTUAL OUTPUT ---\n' + actualOutput + '\n--- END ACTUAL OUTPUT ---');

    assert.strictEqual(actualOutput, expectedOutput);

    vscode.env.clipboard.writeText = originalClipboardWrite;
  });
});
