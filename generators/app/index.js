'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');
const glob = require('glob');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
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
    }, {
      type: 'input',
      name: 'elementDescription',
      message: 'Brief description of the element',
      default: ''
    }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      // Auto create the class name from the elementName, I could let the user choose the class name
      // but the consistency between the class name and the element name will be preserved this way
      this.props.className = upperFirst(camelCase(this.props.elementName));
    });
  }

  writing() {
    const elementName = this.props.elementName;
    // Copy the whole content of the template folder
    this.fs.copyTpl(
      glob.sync(`${this.templatePath()}/**/*`),
      this.destinationPath(),
      this.props
    );
    // Rename the element with the prompted name
    this.fs.move(
      this.destinationPath('src/_element.js'),
      this.destinationPath(`${elementName}.js`),
      this.props
    );
  }

  install() {
    // Polymer will use yarn and not bower anymore
    this.installDependencies({
      bower: false,
      npm: false,
      yarn: true
    });
  }
};
