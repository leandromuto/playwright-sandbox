const chai = require('chai')
const { webkit } = require('playwright')

global.chai = chai
global.expect = chai.expect
global.assert = chai.assert
global.webkit = webkit

global.baseURL = 'http://localhost:3000/'

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
