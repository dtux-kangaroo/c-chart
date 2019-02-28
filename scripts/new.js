


const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const curPath = path.resolve('./');
const log = console.log;
const error = console.error;
const argv = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const tplDir = path.join(__dirname, '../template/complex');
const appDir = path.join(__dirname, '../src/');
const bigCamel = (argv._[0] || '').replace(/\b(\w)(\w*)/g, ($0, $1, $2) => {
  return $1.toUpperCase() + $2;
});
const smallCamel = (argv._[0] || '').replace(/\b(\w)(\w*)/g, ($0, $1, $2) => {
  return $1.toLowerCase() + $2;
});

module.exports = {
  fs: fs,
  path:path,
  exec: exec,
  spawn:spawn,
  log: log,
  error: error,
  argv: argv,
  chalk: chalk,
  tplDir: tplDir,
  appDir:appDir,
  bigCamel: bigCamel,
  smallCamel:smallCamel
}
