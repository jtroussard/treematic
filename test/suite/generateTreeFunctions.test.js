const assert = require('assert');
const sinon = require('sinon');
const vscode = require('vscode');
const fs = require('fs');
const generateTreeFunctions = require('../../generateTreeFunctions.js');

suite('generateTree Command Test Suite', function () {
  let sandbox;
  let mockedUriResource;
  let showInformationMessageSpy;
  let showErrorMessageSpy;
  let clipboardMock = {
    writeText: sinon.stub()
  };
  let existsSyncStub;


  setup(function () {
    sandbox = sinon.createSandbox();

    // vscode.Uri
    mockedUriResource = {
      path: 'something',
      options: {}
    };

    showInformationMessageSpy = sandbox.spy(vscode.window, 'showInformationMessage');
    showErrorMessageSpy = sandbox.spy(vscode.window, 'showErrorMessage');

    existsSyncStub = sandbox.stub(fs, 'existsSync');
  });

  teardown(function () {
    sandbox.restore();
  });

  test('Should generate and copy tree to clipboard for valid resource', async function () {
    const treeOutputStub = 'predefined tree output';
    const treeStub = sandbox.stub().returns(treeOutputStub);
    existsSyncStub.returns(true);
    const originalClipboard = vscode.env.clipboard;
    vscode.env.clipboard = clipboardMock;

    const originalTreeFunction = generateTreeFunctions.tree;
    generateTreeFunctions.tree = treeStub;
    await generateTreeFunctions.generateTree(mockedUriResource);

    assert(showInformationMessageSpy.calledOnce);
    assert(showErrorMessageSpy.notCalled);
    assert(clipboardMock.writeText.calledOnce);

    vscode.env.clipboard = originalClipboard;
    generateTreeFunctions.tree = originalTreeFunction;
  });
});
