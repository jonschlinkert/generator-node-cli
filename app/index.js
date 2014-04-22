/*!
 * generator-cli <https://github.com/assemble/generator-cli>
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */


'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');
var changeCase = require('change-case');
var Configstore = require('configstore');
var yeoman = require('yeoman-generator');
var log = require('verbalize');

log.runner = 'generator-node-cli';

var cliConfig = new Configstore('generator-node-cli');

var CliGenerator = module.exports = function CliGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  var self = this;

  this._.mixin(changeCase);
  this.appname = changeCase.paramCase(this.appname);

  var readJSON = function() {
    var filepath = path.join.apply(path, arguments);
    return JSON.parse(self.readFileAsString(filepath));
  };

  this.on('end', function () {
    this.installDependencies({
      skipInstall: this.options['skip-install'] || this.options['s'],
      skipMessage: this.options['skip-welcome-message'] || this.options['w']
    });
  });

  this.pkg = readJSON(__dirname, '../package.json');

  this.username = this.user.git.username || process.env.user || process.env.username || null;
};
util.inherits(CliGenerator, yeoman.generators.Base);


CliGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  var prompts = [];

  // have Yeoman greet the user, unless skipped
  if (!this.options['skip-welcome-message']) {
    console.log(this.yeoman);
  }

  var author = cliConfig.get('author') || {};

  prompts.push({
    name: 'projectname',
    message: 'What is the name of the project?',
    default: this.appname
  });

  prompts.push({
    name: 'cliname',
    message: 'What will the CLI name be (e.g. `yo`, `grunt` etc)?',
    default: changeCase.camelCase(this.appname).toLowerCase()
  });

  prompts.push({
    name: 'projectdesc',
    message: 'What is the description?',
    default: this.pkg.description
  });

  prompts.push({
    name: 'authorname',
    message: 'What is the author\'s name?',
    default: author.name || this.username
  });

  prompts.push({
    name: 'authorurl',
    message: 'What is the author\'s URL?',
    default: author.url || ('https://github.com/' + this.username)
  });

  prompts.push({
    name: 'username',
    message: 'If pushed to GitHub, what will the username/org be?',
    default: cliConfig.get('username') || this.username
  });

  prompts.push({
    type: 'confirm',
    name: 'verb',
    message: 'Do you want to use Verb for documentation?',
    default: true
  });

  this.prompt(prompts, function (props) {

    cliConfig.set('username', props.username);
    cliConfig.set('author', {
      name: props.authorname,
      url: props.authorurl
    });

    this.authorname = cliConfig.get('author').name;
    this.authorurl = cliConfig.get('author').url;
    this.username = cliConfig.get('username');

    this.projectname = props.projectname;
    this.projectdesc = props.projectdesc;

    this.cliname = props.cliname;
    this.verb = props.verb;

    cb();
  }.bind(this));
};


/**
 * Check for existing files so this can be
 * run on existing projects
 */

CliGenerator.prototype.app = function app() {
  this.mkdir('bin');
  this.template('cli', ('bin/' + this.cliname));
};

CliGenerator.prototype.readme = function readme() {
  if(this.verb) {
    this.directory('docs', 'docs', true);
  }
  if (!fs.existsSync('README.md')) {
    this.template('README.md', 'README.md');
  }
};

CliGenerator.prototype.jshintrc = function jshintrc() {
  if (!fs.existsSync('.jshintrc')) {
    this.copy('jshintrc', '.jshintrc');
  }
};

CliGenerator.prototype.git = function git() {
  if (!fs.existsSync('.gitignore')) {
    this.copy('gitignore', '.gitignore');
  }

  if (!fs.existsSync('.gitattributes')) {
    this.copy('gitattributes', '.gitattributes');
  }
};

CliGenerator.prototype.license = function license() {
  if (!fs.existsSync('LICENSE-MIT')) {
    this.template('LICENSE-MIT');
  }
};

CliGenerator.prototype.pkg = function pkg() {
  if (!fs.existsSync('package.json')) {
    this.template('_package.json', 'package.json');
  }
};
