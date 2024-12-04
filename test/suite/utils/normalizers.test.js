const assert = require('assert');

const { normalizeToUnixStyle } = require('../../../src/utils/normalizers.js');

suite('normalizeToUnixStyle', () => {
  test('should convert Windows-style paths to UNIX-style paths', () => {
    const result = normalizeToUnixStyle('C:\\Users\\Test\\Documents');
    assert.strictEqual(result, 'C:/Users/Test/Documents');
  });

  test('should leave UNIX-style paths unchanged', () => {
    const result = normalizeToUnixStyle('/usr/local/bin');
    assert.strictEqual(result, '/usr/local/bin');
  });

  test('should handle mixed-style paths', () => {
    const result = normalizeToUnixStyle('C:\\Users\\Test/Documents');
    assert.strictEqual(result, 'C:/Users/Test/Documents');
  });

  test('should handle empty paths', () => {
    const result = normalizeToUnixStyle('');
    assert.strictEqual(result, '');
  });
});
