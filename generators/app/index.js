'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');
const glob = require('glob');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Polymer3 element generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'elementName',
      message: 'What would you like your element to be called?',
      default: 'polymer3-element'
    }, {
      type: 'input',
      name: 'authorName',
      message: 'What would you like the element author to be set as in the package.json?',
      default: 'Amazing Polymer Developer<amazing@polymer.dev>'
    }, {
      type: 'input',
      name: 'packageLicense',
      message: 'What would you like the license to be set as in the package.json?',
      default: 'MIT'
    }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      glob.sync(`${this.templatePath()}/**/*`),
      this.destinationPath(),
      this.props
    );
  }

  install() {
    this.installDependencies({
      bower: false,
      npm: false,
      yarn: true
    });
  }
};
