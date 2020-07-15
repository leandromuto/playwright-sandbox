const chai = require('chai')
const moment = require('moment')
const fs = require('fs')


global.chai = chai
global.expect = chai.expect
global.assert = chai.assert

global.baseURL = 'http://localhost:3000/'

const now = () => moment().utc().format('D/MM/YY HH:mm:ss:SSSS')
global.logFile = fs.createWriteStream(`tmp/${Date.now().toString()}.txt`, { flags: 'w+' })
global.logger = (text) => {
  logFile.write(`${now()} - ${text}\n`)
}

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
