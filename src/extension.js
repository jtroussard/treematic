const vscode = require('vscode');
const generateTreeFunctions = require('./generateTreeFunctions');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension Tree-Meh is now active!');

	// Generates tree with out passing any options to the tree command
	let generateTree = vscode.commands.registerCommand(
		'tree-meh.generateTree',
		generateTreeFunctions.generateTree
	);
	
	// Generates a tree that ignore dependency directories; node_modules and venv
	let generateTreeLessDependencyDirs = vscode.commands.registerCommand(
		'tree-meh.generateTreeLessDependencyDirs',
		generateTreeFunctions.generateTreeLessDependencyDirs
	);

	context.subscriptions.push(generateTree, generateTreeLessDependencyDirs);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
