const os = require('os').platform();
const vscode = require('vscode');

/**
 * Safely retrieves the 'sizes' configuration for tree generation.
 * Disables the option on Windows and notifies the user.
 *
 * @param {vscode.WorkspaceConfiguration} config - The VSCode configuration object
 * @returns {boolean} - Whether the sizes option should be enabled
 */
function getSafeSizesOption(config) {
  const sizesEnabled = config.get('sizes', false);

  if (os === 'win32' && sizesEnabled) {
    vscode.window.showWarningMessage('File sizes are not supported on Windows and have been disabled.');
    console.info('File size option not included in treeOptions!');
    return false;
  }

  return sizesEnabled;
}

module.exports = {
  getSafeSizesOption,
};
