const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: './src/extension.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
    },
    mainFields: ['browser', 'module', 'main'],
  },
  externals: [
    nodeExternals({
      allowlist: ['tree-node-cli']
    }),
    {
      child_process: 'commonjs child_process',
      fs: 'commonjs fs',
      vscode: 'commonjs vscode',
    }
  ],
};
