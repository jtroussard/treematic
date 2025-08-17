const tree = require('tree-node-cli');
const { convertToRegex } = require('./utils/conversions');
const { getSafeSizesOption } = require('./utils/platformUtils');

function generateTreeString(normalizedPath, config) {
  const treeOptions = {
    allFiles: config.allFiles,
    dirsFirst: config.dirsFirst,
    dirsOnly: config.dirsOnly,
    sizes: getSafeSizesOption(config),
    exclude: convertToRegex(config.exclude),
    maxDepth: config.maxDepth === -1 ? Number.POSITIVE_INFINITY : config.maxDepth,
    reverse: config.reverse,
    trailingSlash: config.trailingSlash,
    ascii: config.ascii,
  };

  const treeOutput = tree(normalizedPath, treeOptions);
  return treeOutput;
}

module.exports = { generateTreeString };