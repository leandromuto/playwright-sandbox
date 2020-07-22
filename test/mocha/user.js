const { chromium } = require('playwright')

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
  }

  before(async function(){
    browser = await chromium.launch({
      logger: {
        isEnabled: (name, severity) => name === 'browser' || name === 'api',
        log: (name, severity, message, args) => logger.info(`[${severity}][${name}]${message}`)
      }
    })
    const context = await browser.newContext();
    page = await context.newPage()

    await saveVideo(page, `tmp/video/${this.test.parent.title.replace(' ', '_')}.mp4`);

    await page.goto(baseURL)
    await login()
  })

  beforeEach(async function() {
    logger.info(`Starting ${this.test.ctx.title}`)
  })

  after(async function() {
    await browser.close()
  })

  afterEach(async function() {
    await page.screenshot({ path: `tmp/${this.test.ctx.currentTest.title.replace(' ', '_')}.png` })
    await page.goto(baseURL)
    logger.info(`Finishing ${this.test.ctx.title}`)
  })

  describe('edit', function() {
    it('access user info page', async () => {
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
