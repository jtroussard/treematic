// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const tree = require('tree-node-cli');
const fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension Tree-Meh is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let generateTree = vscode.commands.registerCommand('tree-meh.generateTree', function (resource) {

		// Make sure the resource argument is valid
		if (!(resource instanceof vscode.Uri)) {
			vscode.window.showErrorMessage('Invalid resource for generating trees.');
			return;
		}

		// Validate the path string
		let path = resource.path;
		if (typeof path !== 'string') {
			vscode.window.showErrorMessage('Invalid path data type for generating trees.');
			return;
		}
		if (path.length === 0) {
			vscode.window.showErrorMessage('Invalid path length for generating trees.');
			return;
		}
		if (!fs.existsSync(path)) {
			vscode.window.showErrorMessage('Invalid path. Path does not exist.');
			return;
		};

		// Now that we know the resource is safe we can grab the path and genereate the tree
		try {
			let treeOutput = tree(path);
			vscode.env.clipboard.writeText(treeOutput);
			vscode.window.showInformationMessage('Tree copied to clipboard!');
			return;
		}
		catch (e) {
			vscode.window.showErrorMessage(`Something went wrong: ${e}`);
			return;
		}
	});

	let generateTreeWithIgnore = vscode.commands.registerCommand('tree-meh.generateTreeWithIgnore', function () {
		vscode.window.showInformationMessage('Generating Tree! BUT WITH IGNORE!');
	});

	context.subscriptions.push(generateTree, generateTreeWithIgnore);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
