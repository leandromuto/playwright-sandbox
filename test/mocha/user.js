const { chromium } = require('playwright')
const { saveVideo } = require('playwright-video');
const { logger } = require('./helper/logger')

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
    browser = await chromium.launch({
      logger: {
        isEnabled: (name, severity) => name === 'browser' || name === 'api',
        log: (name, severity, message, args) => logger(`[${severity}][${name}] ${message}`)
      }
    })
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
    logger(`Finishing ${this.test.ctx.title}`)
    await page.screenshot({ path: `tmp/${this.test.ctx.currentTest.title.replace(' ', '_')}.png` })
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
  })
})
