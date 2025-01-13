# Treematic

**Version:** 2.0.1

## Summary

Treematic leverages the `tree-node-cli` library to quickly produce and copy string representations of project structures/directories. This enhances documentation, analysis, and presentations by providing a simple yet infomative visual aid.

### Example Output

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

## Usage

1. Install the "Treematic" extension from the Visual Studio Code Marketplace.

2. Navigate to the Explorer view and right-click on a directory within your project.

3. Select "Generate Tree" or "Generate Tree Everything" from the context menu.

4. The extension will generate a tree representation of the directory structure based on the selected option and copy it to your clipboard.

5. Paste the copied tree wherever you need.

<img src="https://jtroussard.github.io/static-site/002.gif" alt="gif demo" width="90%">

## Features

1. **Generate Tree**: Right-click on any directory in the Explorer and choose "Generate Tree" from the context menu. This action generates a visual representation of the directory structure and copies it to your clipboard. The structure is generated based on configurations in `settings.json`, with sensible defaults that exclude directories and files not commonly useful for describing a project's structure, design, or pattern.

2. **Generate Tree Everything**: Right-click on any directory in the Explorer and choose "Generate Tree Everything" from the context menu. This action generates a comprehensive tree representation, including all directories and files, and copies it to your clipboard.

**NOTE** The 'everything' command excludes the contents of `.git/` directory for performance reasons.

## Example Use Cases

- **AI-Assisted Analysis**: Engage with AI assistants like ChatGPT to pitch your refactor or design ideas. By sharing a tree representation of your project, you provide a clear visual of its structure, making it easier for AI to understand your context. Use this to identify potential bottlenecks, streamline folder hierarchies, or brainstorm solutions for architectural improvements. This process enables faster and more precise feedback for optimizing your project's design.

- **Documentation After Refactoring**: Whether your project coding convention calls for a project directory representation in the docs or you're maintaining a legacy project, it can be a real pain to update these diagrams by hand. Even if leveraging the terminal command, the process of getting that output from a terminal into a README file can drive anyone bonkers. Now in two clicks and a paste you can update the documentation seamlessly!

## Extension Settings

Treematic provides several configuration options to customize its behavior. These settings can be accessed and modified in your VS Code `settings.json` file.

**Treematic Configuration Options:**

- **`treematic.allFiles`**

  - **Type**: `boolean`
  - **Default**: `true`
  - **Description**: Determines whether hidden files (those beginning with a dot, e.g., `.env`) are included in the generated tree. Set to `false` to exclude hidden files.

- **`treematic.dirsFirst`**

  - **Type**: `boolean`
  - **Default**: `false`
  - **Description**: Lists directories before files in the tree output. Useful for prioritizing directory structure visibility.

- **`treematic.dirsOnly`**

  - **Type**: `boolean`
  - **Default**: `false`
  - **Description**: Displays only directories in the generated tree, excluding files.

- **`treematic.sizes`**

  - **Type**: `boolean`
  - **Default**: `false`
  - **Description**: Adds file sizes to the tree output. Useful for understanding the size distribution of files in your project.

- **`treematic.exclude`**

  - **Type**: `array` of `string`
  - **Default**:
    ```json
    [
      "node_modules/",
      ".git/",
      ".vscode/",
      "dist/",
      "target/",
      "build/",
      "logs/",
      "coverage/",
      ".idea/",
      ".DS_Store",
      "Thumbs.db",
      "__pycache__/",
      "temp/",
      "cache/"
    ]
    ```
  - **Description**: A list of regular expressions defining files and directories to exclude from the tree output. To exclude files inside a directory while keeping the directory itself, include a trailing slash in the regex.

- **`treematic.maxDepth`**

  - **Type**: `number`
  - **Default**: `-1` (infinity)
  - **Description**: Specifies the maximum depth of the tree. Use `-1` for unlimited depth.

- **`treematic.reverse`**

  - **Type**: `boolean`
  - **Default**: `false`
  - **Description**: Sorts the output in reverse alphabetic order.

- **`treematic.trailingSlash`**

  - **Type**: `boolean`
  - **Default**: `false`
  - **Description**: Adds a trailing slash (`/`) to directory names in the tree output.

- **`treematic.ascii`**
  - **Type**: `boolean`
  - **Default**: `false`
  - **Description**: Enables ASCII line graphics for the tree representation, replacing the default Unicode-based tree lines.

<!-- ## Known Issues -->

## Release Notes

### 2.0.0

- **Major Update**: Complete overhaul of configuration management with expanded settings for customization.
- **New Features**:
  - Default tree generator command now supports configuration options.
  - Reworked/named (`Generate Tree Everything`) with hard-coded configurations to not exclude any files or directories ( _NOTE_ For now the .git/ dir contents are ignored for performance reasons).
  - Enhanced control through new settings such as `maxDepth`, `dirsOnly`, and `reverse`.
- **Improvements**:
  - Updated default command to respect user-defined configurations in `settings.json`.
  - Clearer documentation and expanded use case examples.
  - Optimized the extension for better performance and usability.
  - Full test coverage (unit tests)
- **Bug Fixes**: 
  - Resolved issues with hidden file handling and Windows path compatibility in earlier versions.
  - Resolved Regex pattern matching for Windows path by normalizing all path strings into UNIX format.

_See_ [`CHANGELOG.md`](CHANGELOG.md) _for historical release details._

## Development Setup

To work on the Treematic extension on your local machine, follow these steps:

1. **Clone the Repository**:
   Open a terminal and navigate to the directory where you want to clone the extension's repository. Then, run the following command:

`git clone git@github.com:jtroussard/treematic.git`

2. **Navigate to the Extension's Directory**:
   Change your working directory to the newly cloned repository:

`cd treematic`

3. **Install Dependencies**:
   Use npm to install the required dependencies for the extension. Run the following command:

`npm install`

This command will download and install the dependencies mentioned in the `package.json` file.

4. **Start Development**:
   Now that the dependencies are installed, you can start developing the extension. Open the cloned repository in Visual Studio Code:

`code .`

### Testing

During development, you might need to test your extension. Use the following command to build the extension:

`npm test`

You can then test your extension within Visual Studio Code by pressing `F5`, make sure your focus is set on the `extensions.js` file.

## What's Next?

- **Monitor `tree-node-cli` Updates**: A potential release of `tree-node-cli` is expected to modify the Node.js configuration API. While the dependency is currently pinned to version `1.6.0`, updates will be evaluated and integrated once stable.

- **Enhanced Tree Customization**: Add a custom configuration to control output: Text, Markdown, ... possibly some format that allows for color coding of the output.

- **VS Code Integration Improvements**: Explore integration with VS Code's inline settings menu, allowing users to configure tree generation options directly from the UI.

- **Performance Optimization**: Investigate methods to further optimize large project tree generation, especially for directories with thousands of files.

## References

Treematic leverages the `tree-node-cli` library to generate directory tree representations. For more information, you can explore the library's documentation:

- **tree-node-cli GitHub Repository**: [https://github.com/shime/tree-cli](https://github.com/shime/tree-cli)
- **tree-node-cli npm Package**: [https://www.npmjs.com/package/tree-node-cli](https://www.npmjs.com/package/tree-node-cli)

This library serves as the core for generating the directory structure, ensuring reliable and consistent output for your projects.

## Feedback/Support

We value your feedback! If you encounter any issues or have suggestions for improvement, please feel free to [raise an issue on GitHub](https://github.com/jtroussard/treematic).

## LICENSE

This extension is released under the [MIT License](https://github.com/jtroussard/treematic/blob/main/LICENSE).
