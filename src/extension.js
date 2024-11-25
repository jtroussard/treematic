const vscode = require('vscode');
const generateTreeFunctions = require('./generateTreeFunctions');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension Treematic is now active!');

	// Generates tree with out passing any options to the tree command
	let generateTree = vscode.commands.registerCommand(
		'treematic.generateTree',
		generateTreeFunctions.generateTree
	);
	
	// Generates a tree that ignore dependency directories; node_modules and venv
	let generateTreeLessDependencyDirs = vscode.commands.registerCommand(
		'treematic.generateTreeLessDependencyDirs',
		generateTreeFunctions.generateTreeLessDependencyDirs
	);

	context.subscriptions.push(generateTree, generateTreeLessDependencyDirs);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
