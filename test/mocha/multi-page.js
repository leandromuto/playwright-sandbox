const { chromium } = require('playwright')
const { saveVideo } = require('playwright-video')
const { login } = require('../utils/user')
const { newTransaction } = require('../utils/transaction')

describe('[Multi-page] Transaction', function() {
  let browser
  const receivingUser = { username: 'Allie2', password: 's3cret' }
  const payingUser = { username: 'Tavares_Barrows', password: 's3cret' }

  before(async () => {
    browser = await chromium.launch({
      logger: {
        isEnabled: (name, severity) => name === 'browser' || name === 'api',
        log: (name, severity, message, args) => logger.info(`[${severity}][${name}]${message}`)
      }
    })
  })

  after(async () => {
    await browser.close()
  })

  it('Pay', async () => {
    const transaction = {
      user: receivingUser.username,
      type: 'payment',
      amount: 1,
      message: 'paying you'
    }

    const payingUserContext = await browser.newContext()
    const receivingUserContext = await browser.newContext()
    const payingUserPage = await payingUserContext.newPage()
    const receivingUserPage = await receivingUserContext.newPage()

    // arange
    let receivingCapture, payingCapture
    await Promise.all([
      receivingCapture = await saveVideo(
        receivingUserPage,
        `tmp/video/multi-page/mocha/${this.title}-${this.ctx.test.title}-requesting.mp4`
      ),
      payingCapture = await saveVideo(
        payingUserPage,
        `tmp/video/multi-page/mocha/${this.title}-${this.ctx.test.title}-paying.mp4`
      )
    ])

    await receivingUserPage.goto(baseURL)
    await payingUserPage.goto(baseURL)
    await login(receivingUserPage, receivingUser)
    await login(payingUserPage, payingUser)

    // action
    await newTransaction(payingUserPage, transaction)

    await Promise.all([
      receivingCapture.stop(),
      payingCapture.stop()
    ])
  })

  it('Request', async () => {
    const transaction = {
      user: payingUser.username,
      type: 'request',
      amount: 1,
      message: 'give my money back'
    }

    const requestingUserContext = await browser.newContext()
    const requestingUserPage = await requestingUserContext.newPage()
    const payingUserContext = await browser.newContext()
    const payingUserPage = await payingUserContext.newPage()

    // arrange
    let requestingCapture, payingCapture
    await Promise.all([
      requestingCapture = await saveVideo(
        requestingUserPage,
        `tmp/video/multi-page/mocha/${this.title}-${this.ctx.test.title}-requesting.mp4`
      ),
      payingCapture = await saveVideo(
        payingUserPage,
        `tmp/video/multi-page/mocha/${this.title}-${this.ctx.test.title}-paying.mp4`
      )
    ])

    await requestingUserPage.goto(baseURL)
    await payingUserPage.goto(baseURL)
    await login(requestingUserPage, receivingUser)
    await login(payingUserPage, payingUser)

    // action
    await newTransaction(requestingUserPage, transaction)

    await Promise.all([
      requestingCapture.stop(),
      payingCapture.stop()
    ])
  })
})
