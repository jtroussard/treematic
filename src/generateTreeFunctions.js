const tree = require('tree-node-cli');
const fs = require('fs');
const vscode = require('vscode');
const path = require('path');
const os = require('os').platform();

const { validateResource } = require('./utils/validations');
const { convertToRegex } = require('./utils/conversions');
const { getSafeSizesOption } = require('./utils/platformUtils');
const { handleTreeOutput } = require('./outputHandler');

async function generateTreeEverything(resource) {
  console.debug('generateTreeEverything method invoked...');
  try {
    const normalizedPath = validateResource(resource);
    if (!normalizedPath) {
      const error = new Error('Invalid resource');
      console.error(`Validation failed: ${resource}`);
      throw error;
    }

    const treeOutput = tree(normalizedPath, {
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

    await handleTreeOutput(treeOutput);
    
    console.debug('Tree generatred successfully!');
    return;
  } catch (e) {
    if (e?.message === 'Canceled' || e?.name === 'Canceled') {
      console.debug(
        'Operation was intentionally canceled by the user or system.'
      );
      return;
    }
    vscode.window.showErrorMessage(`Something went wrong: ${e.message}`);
    console.error('Error generating tree:', e);
  }
}

async function generateTree(resource) {
  console.debug('generateTree method invoked...');
  try {
    const normalizedPath = validateResource(resource);
    if (!normalizedPath) {
      const error = new Error('Invalid resource');
      console.error(`Validation failed: ${resource}`);
      throw error;
    }

    // Process options to match tree-node-cli options contract.
    const config = vscode.workspace.getConfiguration('treematic');
    const treeOptions = {
      allFiles: config.get('allFiles', true),
      dirsFirst: config.get('dirsFirst', false),
      dirsOnly: config.get('dirsOnly', false),
      sizes: getSafeSizesOption(config),
      exclude: convertToRegex(
        config.get('exclude', ['/node_modules\//', '/venv\//', '/.git\//'])
      ),
      maxDepth:
        config.get('maxDepth', -1) === -1
          ? Number.POSITIVE_INFINITY
          : config.get('maxDepth', -1),
      reverse: config.get('reverse', false),
      trailingSlash: config.get('trailingSlash', false),
      ascii: config.get('ascii', true),
    };

    const treeOutput = tree(normalizedPath, treeOptions);
    await handleTreeOutput(treeOutput);
    console.debug('Tree generated successfully!');
    return;
  } catch (e) {
    if (e?.message === 'Canceled' || e?.name === 'Canceled') {
      console.debug(
        'Operation was intentionally canceled by the user or system.'
      );
      return;
    }
    vscode.window.showErrorMessage(`Something went wrong: ${e.message}`);
    console.error('Error generating tree:', e);
    return;
  }
}

module.exports = {
  generateTreeEverything,
  generateTree,
};
