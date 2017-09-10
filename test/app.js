'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
const prompts = {
  elementName: 'polymer3-test-element',
  authorName: 'TestUser',
  packageLicense: 'test'
};
describe('generator-polymer-init-polymer-3-element:app', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts(prompts);
  });

  it('creates files', () => {
    assert.file([
      'package.json'
    ]);
  });
  it('props are set correctly in package.json', () => {
    assert.jsonFileContent('package.json', {
      name: prompts.elementName,
      author: prompts.authorName,
      license: prompts.packageLicense
    });
  });
});
