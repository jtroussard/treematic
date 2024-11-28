const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

/**
 * Validates the resource and returns the normalized path if valid.
 *
 * @param {vscode.Uri} resource - The resource representing the selected directory in the Explorer.
 * @returns {string|null} - The normalized path if valid, otherwise null.
 */
function validateResource(resource) {
    if (!resource) {
        vscode.window.showErrorMessage('Missing resource for generating trees.');
        return null;
    }

    const normalizedPath = path.normalize(resource.fsPath);

    if (typeof normalizedPath !== 'string') {
        vscode.window.showErrorMessage(`Invalid path data type for generating trees: ${typeof normalizedPath}`);
        return null;
    }

    if (normalizedPath.length === 0) {
        vscode.window.showErrorMessage(`Invalid path length for generating trees: ${normalizedPath.length}`);
        return null;
    }

    if (!fs.existsSync(normalizedPath)) {
        vscode.window.showErrorMessage(`Invalid path. Path does not exist: ${normalizedPath}`);
        return null;
    }

    return normalizedPath;
}

module.exports = { validateResource };
