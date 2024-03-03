const tree = require('tree-node-cli');
const fs = require('fs');
const vscode = require('vscode');
const path = require('path');

/**
 * Generates a tree representation of the directory structure and copies it to the clipboard.
 *
 * @param {vscode.Uri} resource - The resource representing the selected directory in the Explorer.
 */
function generateTree(resource) {
    // Make sure the resource argument is valid
    if (!resource) {
        vscode.window.showErrorMessage('Missing resource for generating trees.');
        return;
    }

    // Be compatible with windows style paths as well
    let normalizedPath = path.normalize(resource.fsPath);
    // Validate the path string
    if (typeof normalizedPath !== 'string') {
        vscode.window.showErrorMessage(`Invalid path data type for generating trees: ${typeof normalizedPath}`);
        return;
    }
    if (normalizedPath.length === 0) {
        vscode.window.showErrorMessage(`Invalid path length for generating trees: ${normalizedPath.length}`);
        return;
    }
    if (!fs.existsSync(normalizedPath)) {
        vscode.window.showErrorMessage(`Invalid path. Path does not exist: ${normalizedPath}`, normalizedPath);
        return;
    };

    // Now that we know the resource is safe we can grab the path and generate the tree
    try {
        let treeOutput = tree(normalizedPath);
        vscode.env.clipboard.writeText(treeOutput);
        vscode.window.showInformationMessage('Tree copied to clipboard!');
        return;
    }
    catch (e) {
        console.log(e);
        vscode.window.showErrorMessage(`Something went wrong: ${e}`);
        return;
    }
}

function generateTreeLessDependencyDirs(resource) {
    // Make sure the resource argument is valid
    if (!resource) {
        vscode.window.showErrorMessage('Missing resource for generating trees.');
        return;
    }

    // Be compatible with windows style paths as well
    let normalizedPath = path.normalize(resource.fsPath);
    // Validate the path string
    if (typeof normalizedPath !== 'string') {
        vscode.window.showErrorMessage(`Invalid path data type for generating trees: ${typeof normalizedPath}`);
        return;
    }

    if (normalizedPath.length === 0) {
        vscode.window.showErrorMessage(`Invalid path length for generating trees: ${normalizedPath.length}`);
        return;
    }
    if (!fs.existsSync(normalizedPath)) {
        vscode.window.showErrorMessage(`Invalid path. Path does not exist: ${normalizedPath}`, normalizedPath);
        return;
    };

    // Now that we know the resource is safe we can grab the path and generate the tree
    try {
        const options = {
            allFiles: true,
            exclude: [/node_modules/, /venv/],
        };
        let treeOutput = tree(normalizedPath, options);
        vscode.env.clipboard.writeText(treeOutput);
        vscode.window.showInformationMessage('Tree less dependency directories copied to clipboard!');
        return;
    }
    catch (e) {
        console.log(e);
        vscode.window.showErrorMessage(`Something went wrong: ${e}`);
        return;
    }
}


module.exports = {
    generateTree,
    generateTreeLessDependencyDirs
};
