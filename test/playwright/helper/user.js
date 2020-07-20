module.exports = {
  login: async (page, user) => {
    const { username, password } = user

    const usernameInput = '#username'
    const passwordInput = '#password'

    await page.fill(usernameInput, username)
    await page.fill(passwordInput, password)
    await page.click('data-test=signin-submit')
  }
}
