const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5173/works/desktop-light', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 3000));
  // Scroll to concept
  await page.evaluate(() => document.querySelector('.dl-concept')?.scrollIntoView({ block: 'start' }));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'shots/dl-concept-v2.png', fullPage: false });
  console.log('dl-concept-v2.png done');
  // detail section
  await page.evaluate(() => document.querySelector('.dl-detail-section')?.scrollIntoView({ block: 'start' }));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'shots/dl-detail-v2.png', fullPage: false });
  console.log('dl-detail-v2.png done');
  // light section
  await page.evaluate(() => document.querySelector('.dl-light')?.scrollIntoView({ block: 'start' }));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'shots/dl-light-v2.png', fullPage: false });
  console.log('dl-light-v2.png done');
  await browser.close();
  console.log('Done.');
})().catch(e => { console.error(e.message); process.exit(1); });
