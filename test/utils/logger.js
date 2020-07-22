const moment = require('moment')

const now = () => moment().utc().format('D/MM/YY HH:mm:ss:SSSS')

module.exports = {
  logger: (text) => {
    logFile.write(`${now()} - ${text}\n`)
  }
}
