module.exports = {
  newTransaction: async (page, transaction) => {
    const { user, type, amount, message } = transaction

    // locators
    const searchUserInput = '#user-list-search-input'
    const userElementLocator = `data-test=users-list >> text="${user}"`
    const newTransactionBtn = 'data-test=nav-top-new-transaction'
    const amountInput = '#amount'
    const transactionDescriptionInput = '#transaction-create-description-input'
    const transactionPayBtn = 'data-test=transaction-create-submit-payment'
    const transactionRequestBtn = 'data-test=transaction-create-submit-request'

    await page.click(newTransactionBtn);
    await page.fill(searchUserInput, 'Tavares_Barrows');
    const userElement = await page.$(userElementLocator)
    await userElement.click()
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
        console.log('Unsupported payment type. Please choose between "pay" or "request"')
    }
  }
}
