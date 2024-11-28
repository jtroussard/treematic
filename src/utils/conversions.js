/**
 * Converts an array of string patterns into an array of RegExp objects.
 *
 * @param {string[]} patterns - Array of string patterns.
 * @returns {RegExp[]} - Array of RegExp objects.
 */
function convertToRegex(patterns) {
    console.log(`converting into RegExp: ${patterns}`);
    const result = patterns.map((pattern) => new RegExp(pattern));
    console.log(`converted into RegExp: ${result}`);
    return result;
}

module.exports = { convertToRegex };
