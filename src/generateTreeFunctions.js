const tree = require('tree-node-cli');
const fs = require('fs');
const vscode = require('vscode');
const path = require('path');

const { validateResource } = require('./utils/validations');
const { convertToRegex } = require('./utils/conversions');

/**
 * Generates a tree representation of the directory structure for a given resource and copies it to the clipboard.
 *
 * @param {vscode.Uri} resource - The resource representing the directory in the Explorer.
 *
 * Validates the provided resource and, if valid, generates the directory tree using `tree-node-cli`.
 * The generated tree is then copied to the system clipboard, and a confirmation message is shown.
 * If an error occurs during the process, an error message is displayed.
 */
function generateTreeEverything(resource) {
    try {
        // Validate resource
        const normalizedPath = validateResource(resource);
        if (!normalizedPath) {
            throw new Error('Invalid resource');
        }

        // Now that we know the resource is safe we can grab the path and generate the tree
        let treeOutput = tree(
            normalizedPath,
            {
                allFiles: true,
                dirsFirst: false,
                dirsOnly: false,
                sizes: false,
                exclude: [/.git/, /venv/], // perf issues, ignoring git/
                maxDepth: Number.POSITIVE_INFINITY,
                reverse: false,
                trailingSlash: false,
                ascii: false,
            }
        );
        vscode.env.clipboard.writeText(treeOutput);
        vscode.window.showInformationMessage('Entire project tree copied to clipboard!');
    } catch (e) {
        console.error('Error generating tree:', e);
        vscode.window.showErrorMessage(`Something went wrong: ${e.message}`);
    }
}

/**
 * Generates a tree representation of the directory structure for a given resource, using the options configured in the "treematic" extension settings, and copies it to the clipboard.
 *
 * @param {vscode.Uri} resource - The resource representing the directory in the Explorer.
 *
 * Validates the provided resource and, if valid, generates the directory tree using `tree-node-cli` with the configured options.
 * The generated tree is then copied to the system clipboard, and a confirmation message is shown.
 * If an error occurs during the process, an error message is displayed.
 */
function generateTree(resource) {
    vscode.window.showInformationMessage(`generateTreeWithConfigs - resource: ${typeof resource}, ${resource}`);
    console.log(`generateTreeWithConfigs - resource: ${typeof resource}, ${resource}`);

    // Validate resource
    const normalizedPath = validateResource(resource);
    if (!normalizedPath) return;

    // Now that we know the resource is safe we can grab the path and generate the tree
    try {
        const config = vscode.workspace.getConfiguration("treematic");

        // Process options to match tree-node-cli options contract.
        const treeOptions = {
            allFiles: config.get("allFiles", true),
            dirsFirst: config.get("dirsFirst", false),
            dirsOnly: config.get("dirsOnly", false),
            sizes: config.get("sizes", false),
            exclude: convertToRegex(config.get("exclude", [/node_modules/, /venv/, /.git/])),
            maxDepth: config.get("maxDepth", -1) === -1 ? Number.POSITIVE_INFINITY : config.get("maxDepth"),
            reverse: config.get("reverse", false),
            trailingSlash: config.get("trailingSlash", false),
            ascii: config.get("ascii", true),
        };

        console.log(`Over here ${JSON.stringify(treeOptions)}`);
        console.log(`Generating tree for ${resource.fsPath} with options:`, treeOptions);

        let treeOutput = tree(normalizedPath, treeOptions);
        vscode.env.clipboard.writeText(treeOutput);
        vscode.window.showInformationMessage('Project tree copied to clipboard!');
        console.log(`Generating tree with less dependency directories for ${resource.fsPath}:`, treeOptions);
        return;
    } catch (e) {
        console.log(e);
        vscode.window.showErrorMessage(`Something went wrong: ${e}`);
        return;
    }
}

module.exports = {
    generateTreeEverything,
    generateTree,
};
