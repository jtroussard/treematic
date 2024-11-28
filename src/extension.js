const vscode = require('vscode');
const generateTreeFunctions = require('./generateTreeFunctions');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Extension Treematic is now active!');

	// Generates tree using the configured options.
	let generateTree = vscode.commands.registerCommand(
		'treematic.generateTree',
		generateTreeFunctions.generateTree
	);
	console.log('Generate tree command is registered')
	
	// Generates a tree that includes all directories and all files.
	let generateTreeEverything = vscode.commands.registerCommand(
		'treematic.generateTreeEverything',
		generateTreeFunctions.generateTreeEverything
	);
	console.log('Generate tree everything command is registered')

	context.subscriptions.push(generateTree, generateTreeEverything);
	console.log(`Subscriptions ${context.subscriptions.toString()}`)
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
