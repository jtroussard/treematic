const vscode = require('vscode');

/**
 * Handles the output cycle by copying to the clipboard first,
 * then checking configurations to optionally spin up a new editor tab.
 * @param {string} treeOutput - The raw text layout of the file structure.
 * @returns {Promise<void>}
 */
async function handleTreeOutput(treeOutput) {
  try {
    const config = vscode.workspace.getConfiguration('treematic');
    const openInNewTab = config.get('openInNewTab', false);
    const showNotifications = config.get('showInformationMessages', true);

    await vscode.env.clipboard.writeText(treeOutput);

    if (openInNewTab) {
      const document = await vscode.workspace.openTextDocument({
        content: treeOutput,
        language: 'text',
      });

      await vscode.window.showTextDocument(document, {
        preview: false,
        viewColumn: vscode.ViewColumn.Active,
      });

      if (showNotifications) {
        await vscode.window.showInformationMessage(
          'Tree copied to clipboard and opened in a new tab!'
        );
      }
    } else {
      if (showNotifications) {
        await vscode.window.showInformationMessage('Tree copied to clipboard!');
      }
    }
  } catch (error) {
    console.error('Error executing output handler pipeline:', error);
    throw error;
  }
}

module.exports = { handleTreeOutput };
