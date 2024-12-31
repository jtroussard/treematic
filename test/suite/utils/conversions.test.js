const assert = require('assert');
const { convertToRegex } = require('../../../src/utils/conversions.js');

suite('convertToRegex', () => {
  test('should convert an array of strings to an array of RegExp objects with cross-platform support', () => {
    const patterns = ['node_modules/', 'src/test/', 'dist/'];
    const result = convertToRegex(patterns);

    assert.strictEqual(
      result.length,
      patterns.length,
      'Expected the result array to have the same length as the input array'
    );
    assert.ok(
      result.every((regex) => regex instanceof RegExp),
      'Expected every element in the result to be an instance of RegExp'
    );
    assert.strictEqual(
      result[0].toString(),
      String.raw`/node_modules(\\|\/)/`,
      'Expected first regex to match /node_modules(\\|\/)/'
    );
    assert.strictEqual(
      result[1].toString(),
      String.raw`/src(\\|\/)test(\\|\/)/`,
      'Expected second regex to match /src(\\|\/)test(\\|\/)/'
    );
    assert.strictEqual(
      result[2].toString(),
      String.raw`/dist(\\|\/)/`,
      'Expected third regex to match /dist(\\|\/)/'
    );
  });

  test('should return an empty array when given an empty array', () => {
    const patterns = [];
    const result = convertToRegex(patterns);

    assert.strictEqual(result.length, 0, 'Expected result array to be empty');
  });

  test('should handle invalid inputs gracefully', () => {
    assert.throws(
      () => convertToRegex(null),
      'Expected function to throw on null input'
    );
    assert.throws(
      () => convertToRegex(undefined),
      'Expected function to throw on undefined input'
    );
    assert.throws(
      () => convertToRegex(123),
      'Expected function to throw on non-array input'
    );
  });

  test('should correctly replace slashes with cross-platform regex', () => {
    const patterns = ['a/b/c/', 'x/y', '/z/'];
    const result = convertToRegex(patterns);

    assert.strictEqual(
      result[0].toString(),
      String.raw`/a(\\|\/)b(\\|\/)c(\\|\/)/`,
      'Expected first regex to match /a(\\|\/)b(\\|\/)c(\\|\/)/'
    );
    assert.strictEqual(
      result[1].toString(),
      String.raw`/x(\\|\/)y/`,
      'Expected second regex to match /x(\\|\/)y/'
    );
    assert.strictEqual(
      result[2].toString(),
      String.raw`/(\\|\/)z(\\|\/)/`,
      'Expected third regex to match /(\\|\/)z(\\|\/)/'
    );
  });
});
