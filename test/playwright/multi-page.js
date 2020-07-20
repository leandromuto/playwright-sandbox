const { chromium, devices } = require('playwright');
const { saveVideo } = require('playwright-video');
const { login } = require('./helper/user')

const selectUser = async (page, username) => {
  const searchUserInput = '#user-list-search-input'
  const userElementLocator = `data-test=users-list >> text="${username}"`

  await page.fill(searchUserInput, 'Tavares_Barrows');
  const userElement = await page.$(userElementLocator)
  await userElement.click()
}

const createTransaction = async (page, transaction) => {
  // locators
  const newTransactionBtn = 'data-test=nav-top-new-transaction'
  const amountInput = '#amount'
  const transactionDescriptionInput = '#transaction-create-description-input'
  const transactionPayBtn = 'data-test=transaction-create-submit-payment'
  const transactionRequestBtn = 'data-test="transaction-create-submit-payment"'

  const { user, type, amount, message } = transaction

  await page.click(newTransactionBtn);
  await selectUser(page, user)
  await page.fill(amountInput, `${amount}`)
  await page.fill(transactionDescriptionInput, message)

  switch (type) {
    case 'payment':
      await page.click(transactionPayBtn)
      break
    case 'request':
      await page.click(transactionRequestBtn)
      break
    default:
      console.log('Unsupported payment type. Please select "pay" or "request"')
  }
}

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
  const payingUserContext = await browser.newContext();
  const receivingUserContext = await browser.newContext();
  const payingUserPage = await payingUserContext.newPage();
  const receivingUserPage = await receivingUserContext.newPage();

  // receiving money user
  const captureReceiving = await saveVideo(receivingUserPage, `tmp/video/multi-page/playwright-receiving.mp4`);
  await receivingUserPage.goto('http://localhost:3000/');
  await login(receivingUserPage, receivingUser)

  // paying user
  const capturePaying = await saveVideo(payingUserPage, `tmp/video/multi-page/playwright-paying.mp4`);
  await payingUserPage.goto('http://localhost:3000/');
  await login(payingUserPage, payingUser)
  await createTransaction(payingUserPage, transaction)

  await captureReceiving.stop()
  await capturePaying.stop()
  await browser.close();
})();

(async () => {})();
