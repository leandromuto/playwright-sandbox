const { chromium, devices } = require('playwright')
const { saveVideo } = require('playwright-video')
const { login } = require('../helper/user')

const [
  Pixel2,
  iPhoneX,
  iPhone11Pro
] = [
  { name: 'Pixel 2', spec: devices['Pixel 2'] },
  { name: 'iPhone X', spec: devices['iPhone X'] },
  { name: 'iPone 11 Pro', spec: devices['iPhone 11 Pro'] }
];

const test = async (device) => {
  const { name, spec } = device
  console.log(`Testing ${name} device`)

  const user = { username: 'Tavares_Barrows', password: 's3cret' }

  const browser = await chromium.launch()
  const context = await browser.newContext(spec);
  const page = await context.newPage();

  await page.goto('http://localhost:3000/');
  await saveVideo(page, `tmp/video/parallel/${name}.mp4`);
  await login(page, user)
  await page.click('data-test=drawer-icon')
  await page.click('//span[text()="My Account"]') // xpath demonstration

  await page.screenshot({path: `tmp/${name}.png`, fullPage: true });
  await browser.close();
}

(async () => {
  console.log('Starting parallel tests...')

  await Promise.all([
    test(Pixel2),
    test(iPhoneX),
    test(iPhone11Pro)
  ])

  console.log('Tests finished.')
})();
