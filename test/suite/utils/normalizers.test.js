const { normalizeToUnixStyle } = require('../../../src/utils/normalizers.js');

suite('normalizeToUnixStyle', () => {
  test('should convert Windows-style paths to UNIX-style paths', () => {
    const result = normalizeToUnixStyle('C:\\Users\\Test\\Documents');
    expect(result).toBe('C:/Users/Test/Documents');
  });

  test('should leave UNIX-style paths unchanged', () => {
    const result = normalizeToUnixStyle('/usr/local/bin');
    expect(result).toBe('/usr/local/bin');
  });

  test('should handle mixed-style paths', () => {
    const result = normalizeToUnixStyle('C:\\Users\\Test/Documents');
    expect(result).toBe('C:/Users/Test/Documents');
  });

  test('should handle empty paths', () => {
    const result = normalizeToUnixStyle('');
    expect(result).toBe('');
  });
});
