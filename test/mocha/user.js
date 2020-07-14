const { chromium } = require('playwright')
const { saveVideo } = require('playwright-video');

describe('user', function() {

  let browser, page

  const login = async () => {
    await page.fill('#username', 'Katharina_Bernier')
    await page.fill('#password', 's3cret')
    await page.click('data-test=signin-submit')
  }

  const editUser = async (user) => {
    const { name, surname, email, telephone } = user

    // locators
    const [
      nameLocator,
      surnameLocator,
      emailLocator,
      telephoneLocator,
      saveBtnLocator
    ] = [
      'input[name=firstName]',
      'input[name=lastName]',
      'input[name=email]',
      'input[name=phoneNumber]',
      'button[data-test=user-settings-submit]'
    ]

    await page.click('data-test=sidenav-user-settings >> *text="My Account"')
    await page.fill(nameLocator, name)
    await page.fill(surnameLocator, surname)
    await page.fill(emailLocator, email)
    await page.fill(telephoneLocator, telephone)
    await page.click(saveBtnLocator)
    await page.screenshot({ path: 'saved.png'})
  }

  before(async function(){
    browser = await chromium.launch()
    const context = await browser.newContext();
    page = await context.newPage()

    await saveVideo(page, `tmp/video/${this.test.parent.title.replace(' ', '_')}.mp4`);

    await page.goto(baseURL)
    await login()
  })

  // beforeEach(async function() {
  //   await saveVideo(page, `tmp/video/${this.test.ctx.currentTest.title.replace(' ', '_')}.mp4`);
  // })

  after(async function() {
    await browser.close()
  })

  afterEach(async function() {
    await page.screenshot({ path: `/tmp/${this.test.ctx.currentTest.title}.png` })
    await page.goto(baseURL)
  })

  describe('edit', function() {
    it('user info', async () => {
      const user = {
        name: 'John',
        surname: 'Logan',
        email: 'john@emailme.com',
        telephone: '12678389'
      }

      await editUser(user)
    })

    it('xpto', async () => {
      const user = {
        name: 'XPTO',
        surname: 'CPTO',
        email: 'john@emailme.com',
        telephone: '12678389'
      }

      await editUser(user)
    })
  })
})