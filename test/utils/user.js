module.exports = {
  login: async (page, user) => {
    const { username, password } = user
    logger.info(`Loging using ${username}`)

    const usernameInput = '#username'
    const passwordInput = '#password'

    await page.fill(usernameInput, username)
    await page.fill(passwordInput, password)
    await page.click('data-test=signin-submit')
  },
  edit: async (page, user) => {
    const { name, surname, email, telephone } = user

    // locators
    const [
      nameLocator,
      surnameLocator,
      emailLocator,
      telephoneLocator,
      saveBtnLocator,
      myAccountBtn
    ] = [
      'input[name=firstName]',
      'input[name=lastName]',
      'input[name=email]',
      'input[name=phoneNumber]',
      'button[data-test=user-settings-submit]',
      'data-test=sidenav-user-settings >> text=My Account'
    ]

    await page.click(myAccountBtn)
    await page.fill(nameLocator, name)
    await page.fill(surnameLocator, surname)
    await page.fill(emailLocator, email)
    await page.fill(telephoneLocator, telephone)
    await page.click(saveBtnLocator)
  }
}
