const assert = require('assert');
const sinon = require('sinon');
const vscode = require('vscode');
const proxyquire = require('proxyquire');

suite('getSafeSizesOption', function () {
  let sandbox;
  let getSafeSizesOption;
  let showWarningMessageStub;
  let mockConfig;

  setup(() => {
    sandbox = sinon.createSandbox();
    showWarningMessageStub = sandbox.stub(vscode.window, 'showWarningMessage');

    mockConfig = {
      get: sandbox.stub()
    };
  });

  teardown(() => {
    sandbox.restore();
  });

  function loadPlatformUtilsWithMockedOS(osPlatform) {
    getSafeSizesOption = proxyquire('../../../src/utils/platformUtils', {
      os: { platform: () => osPlatform },
      vscode: vscode
    }).getSafeSizesOption;
  }

  test('should return false and show a warning on Windows when sizes is enabled', () => {
    loadPlatformUtilsWithMockedOS('win32');
    mockConfig.get.withArgs('sizes', false).returns(true);

    const result = getSafeSizesOption(mockConfig);

    assert.strictEqual(result, false, 'Expected sizes option to be false on Windows');
    assert(showWarningMessageStub.calledOnce, 'Warning message should be shown on Windows');
    assert(
      showWarningMessageStub.calledWith('File sizes are not supported on Windows and have been disabled.'),
      'Correct warning message should be shown'
    );
  });

  test('should return false on Windows when sizes is disabled', () => {
    loadPlatformUtilsWithMockedOS('win32');
    mockConfig.get.withArgs('sizes', false).returns(false);

    const result = getSafeSizesOption(mockConfig);

    assert.strictEqual(result, false, 'Expected sizes option to remain false on Windows');
    assert(showWarningMessageStub.notCalled, 'No warning message should be shown when sizes is false');
  });

  test('should return true on non-Windows OS when sizes is enabled', () => {
    loadPlatformUtilsWithMockedOS('linux');
    mockConfig.get.withArgs('sizes', false).returns(true);

    const result = getSafeSizesOption(mockConfig);

    assert.strictEqual(result, true, 'Expected sizes option to be true on non-Windows OS');
    assert(showWarningMessageStub.notCalled, 'No warning should be shown on non-Windows OS');
  });

  test('should return false on non-Windows OS when sizes is disabled', () => {
    loadPlatformUtilsWithMockedOS('darwin'); // macOS
    mockConfig.get.withArgs('sizes', false).returns(false);

    const result = getSafeSizesOption(mockConfig);

    assert.strictEqual(result, false, 'Expected sizes option to remain false on non-Windows OS');
    assert(showWarningMessageStub.notCalled, 'No warning should be shown when sizes is false');
  });
});
