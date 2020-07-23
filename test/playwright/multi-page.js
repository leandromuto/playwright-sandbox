const { chromium, devices } = require('playwright')
const { saveVideo } = require('playwright-video')
const { login } = require('../utils/user')
const { newTransaction } = require('../utils/transaction')

(async () => {
  const receivingUser = { username: 'Tavares_Barrows', password: 's3cret' }
  const payingUser = { username: 'Katharina_Bernier', password: 's3cret' }
  const transaction = {
    user: receivingUser.username,
    type: 'payment',
    amount: 1000,
    message: 'this is not real money'
  }

  const browser = await chromium.launch()
  const payingUserContext = await browser.newContext()
  const receivingUserContext = await browser.newContext()
  const payingUserPage = await payingUserContext.newPage()
  const receivingUserPage = await receivingUserContext.newPage()

  // receiving money user
  const captureReceiving = await saveVideo(receivingUserPage, `tmp/video/multi-page/playwright/receiving.mp4`)
  await receivingUserPage.goto('http://localhost:3000/')
  await login(receivingUserPage, receivingUser)

  // paying user
  const capturePaying = await saveVideo(payingUserPage, `tmp/video/multi-page/playwright/paying.mp4`)
  await payingUserPage.goto('http://localhost:3000/')
  await login(payingUserPage, payingUser)
  await newTransaction(payingUserPage, transaction)

  await captureReceiving.stop()
  await capturePaying.stop()
  await browser.close()
})()
