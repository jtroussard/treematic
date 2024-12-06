/**
 * Normalize a path to UNIX style.
 *
 * @param {string} path - The original path to normalize.
 * @returns {string} - The normalized path in UNIX style.
 */
function normalizeToUnixStyle(path) {
  return path.replace(/\\/g, '/');
}

module.exports = { normalizeToUnixStyle };
