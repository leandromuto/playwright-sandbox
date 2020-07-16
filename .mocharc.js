const chai = require('chai')
const fs = require('fs')

global.chai = chai
global.expect = chai.expect
global.assert = chai.assert

global.baseURL = 'http://localhost:3000/'

global.logFile = fs.createWriteStream(`tmp/${Date.now().toString()}.txt`, { flags: 'w+' }) // create log file

module.exports = {
  diff: true,
  extension: ['js'],
  package: './package.json',
  reporter: 'spec', // https://mochajs.org/#reporters
  slow: 75,
  timeout: 2000,
  ui: 'bdd',
  'watch-files': ['test/mocha/**/*.js'],
  'watch-ignore': ['lib/**']
};
