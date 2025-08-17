const tree = require('tree-node-cli');
const fs = require('fs');
const vscode = require('vscode');
const path = require('path');
const os = require('os').platform();

const { validateResource } = require('./utils/validations');
const { convertToRegex } = require('./utils/conversions');
const { getSafeSizesOption } = require('./utils/platformUtils');
const { generateTreeString } = require('./coreTreeLogic');

function generateTreeEverything(resource) {
  console.debug('generateTreeEverything method invoked...');
  try {
    const normalizedPath = validateResource(resource);
    if (!normalizedPath) {
      const error = new Error('Invalid resource');
      console.error(`Validation failed: ${resource}`);
      throw error;
    }

    let treeOutput = tree(normalizedPath, {
      allFiles: true,
      dirsFirst: false,
      dirsOnly: false,
      sizes: false,
      exclude: convertToRegex(['/.git\//']),
      maxDepth: Number.POSITIVE_INFINITY,
      reverse: false,
      trailingSlash: false,
      ascii: false,
    });

    vscode.env.clipboard.writeText(treeOutput);
    vscode.window.showInformationMessage('Generated tree copied to clipboard!');
    console.debug('Tree generatred successfully!');
    return;
  } catch (e) {
    vscode.window.showErrorMessage(`Something went wrong: ${e.message}`);
    console.error('Error generating tree:', e);
  }
}

function generateTree(resource) {
  try {
    const normalizedPath = validateResource(resource);
    if (!normalizedPath) {
      const error = new Error('Invalid resource');
      throw error;
    }

    const config = vscode.workspace.getConfiguration('treematic');
    const treeOutput = generateTreeString(normalizedPath, config);

    vscode.env.clipboard.writeText(treeOutput);
    vscode.window.showInformationMessage('Generated tree copied to clipboard!');
    return;
  } catch (e) {
    vscode.window.showErrorMessage(`Something went wrong: ${e.message}`);
    console.error('Error generating tree:', e);
  }
}

module.exports = {
  generateTreeEverything,
  generateTree,
};
