const chai = require('chai')
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;
const { saveVideo } = require('playwright-video');

global.chai = chai
global.expect = chai.expect
global.assert = chai.assert
global.saveVideo = saveVideo

global.baseURL = 'http://localhost:3000/'

global.logger = createLogger({
  level: 'http',
  format: combine(
    timestamp(),
    format.json(),
    prettyPrint()
  ),
  transports: [ new transports.File({ filename: `tmp/${Date.now().toString()}.txt` }) ]
})

module.exports = {
  diff: true,
  extension: ['js'],
  package: './package.json',
  reporter: 'spec', // https://mochajs.org/#reporters
  slow: 75,
  timeout: 15000,
  ui: 'bdd',
  'watch-files': ['test/mocha/**/*.js'],
  'watch-ignore': ['lib/**']
};
