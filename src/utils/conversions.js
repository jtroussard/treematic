/**
 * Converts string patterns into RegExp that works for both Unix and Windows paths.
 *
 * @param {string[]} patterns - Array of string patterns for exclusion.
 * @returns {RegExp[]} - Array of RegExp objects.
 */
function convertToRegex(patterns) {
  console.debug(`Converting patterns to regex: ${patterns}`);
  const result = patterns.map((pattern) => {
    // Replace slashes with a regex group that matches both '/' and '\\'
    const crossPlatformPattern = pattern.replace(/\//g, '(\\\\|\/)');
    return new RegExp(crossPlatformPattern);
  });
  console.debug(`Converted patterns to regex: ${result}`);
  return result;
}


module.exports = { convertToRegex };
