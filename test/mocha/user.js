const { chromium } = require('playwright')
const { login, edit } = require('../utils/user')

describe.only('user', function() {

  let browser
  const userCredentials = { username: 'Allie2', password: 's3cret' }

  before(async function(){
    browser = await chromium.launch({
      logger: {
        isEnabled: (name, severity) => name === 'browser' || name === 'api',
        log: (name, severity, message, args) => logger.info(`[${severity}][${name}]${message} ARGS: ${args}`)
      }
    })
  })

  beforeEach(async function() {
    logger.info(`Starting ${this.test.ctx.title}`)
  })

  after(async function() {
    await browser.close()
  })

  afterEach(async function() {
    logger.info(`Finishing ${this.test.ctx.title}`)
  })

  describe('edit', function() {
    it('access user info page', async () => {
      const newUserInfo = {
        name: 'John',
        surname: 'Logan',
        email: 'john@emailme.com',
        telephone: '12678389'
      }

      const page = await browser.newPage()
      await page.goto(baseURL)

      const capture = await saveVideo(page, `tmp/video/simple/mocha/${this.title}.mp4`)
      await login(page, userCredentials)
      await edit(page, newUserInfo)
      await capture.stop()
    })
  })
})
