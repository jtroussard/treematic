## Summary

The Tree-Meh leverages the tree-node-cli command to swiftly produce and copy string representations of project structures/directories. This enhances collaborative discussions on project architecture and design by providing a convenient way to share and analyze project layouts.

## Getting Started

1. Install the "Tree-Meh" extension from the Visual Studio Code Marketplace.

2. Navigate to the Explorer view and right-click on a directory within your project.

3. Select "Generate Project Tree" from the context menu.

4. The extension will generate a tree representation of the directory structure and copy it to your clipboard.

5. Paste the copied tree wherever you need.

**Example Output**
```bash
my-project
├── README.md
├── src
│   ├── api
│   │   └── routes.js
│   ├── app.js
│   ├── assets
│   │   └── profile.jpg
│   └── config.json
└── tests
    ├── runTest.js
    └── suite
        ├── app.test.js
        └── index.js
```

## Extension Settings

Configuration settings coming soon.

<!-- ## Known Issues -->

## Release Notes

### 1.0.0

Initial release of tree-meh

## Development

To clone and work on the Tree-Meh extension on your local machine, follow these steps:

1. **Clone the Repository**:
   Open a terminal and navigate to the directory where you want to clone the extension's repository. Then, run the following command:

  ```bash
  git clone git@github.com:jtroussard/tree-meh.git
  ```

  OR

   ```bash
   git clone https://github.com/jtroussard/tree-meh.git
   ```

2. **Navigate to the Extension's Directory**:
   Change your working directory to the newly cloned repository:

   ```bash
   cd tree-meh
   ```

3. **Install Dependencies**:
   Use npm to install the required dependencies for the extension. Run the following command:

   ```bash
   npm install
   ```

   This command will download and install the dependencies mentioned in the `package.json` file.

4. **Start Development**:
   Now that the dependencies are installed, you can start developing the extension. Open the cloned repository in Visual Studio Code:

   ```bash
   code .
   ```

5. **Test**:
   During development, you might need to test your extension. Use the following command to build the extension:

   ```bash
   npm test
   ```

   You can then test your extension within Visual Studio Code by pressing `F5`, make sure your focus is set on the `extensions.js` file.

## LICENSE

This extension is released under the [MIT License](https://github.com/jtroussard/tree-meh/blob/main/LICENSE).