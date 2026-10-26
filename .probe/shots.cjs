const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.setDefaultTimeout(15000);
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto('http://127.0.0.1:5173/works/desktop-light', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 4000));

  const sections = [
    { sel: '.dl-hero', name: 'hero' },
    { sel: '.dl-concept', name: 'concept' },
    { sel: '.dl-detail-section', name: 'detail' },
    { sel: '.dl-structure', name: 'structure' },
    { sel: '.dl-light', name: 'light' },
    { sel: '.dl-context', name: 'context' },
    { sel: '.dl-closing', name: 'closing' },
  ];
  for (const { sel, name } of sections) {
    await page.evaluate(s => document.querySelector(s)?.scrollIntoView({ block: 'start' }), sel);
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: `shots/dl-${name}.png` });
    console.log(`saved dl-${name}.png`);
  }

  // mobile shot
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:5173/works/desktop-light', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'shots/dl-mobile-hero.png' });
  console.log('saved dl-mobile-hero.png');

  await browser.close();
  console.log('Done.');
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });
