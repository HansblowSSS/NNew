const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(120000);
  await page.setViewport({ width: 1440, height: 900 });

  const failed = [];
  page.on('response', (r) => { if (r.status() >= 400) failed.push(r.status() + ' ' + r.url()); });
  page.on('pageerror', (e) => console.log('[pageerror]', e.message));

  await page.goto('http://127.0.0.1:5173/works/desktop-light', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 5000));

  const totalH = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = 900;
  const driverTop = await page.evaluate(() => document.querySelector('.dl-driver')?.getBoundingClientRect().top + window.scrollY);
  const driverH = await page.evaluate(() => document.querySelector('.dl-driver')?.getBoundingClientRect().height);
  console.log('totalH:', totalH, 'driverTop:', driverTop, 'driverH:', driverH);

  // 9 panels, each takes 1/9 of driver scroll. Take 18 evenly-spaced
  // shots to capture the crossfades (one mid-crossfade per panel pair).
  const driverMax = Math.max(1, driverH - vh);
  const stops = 17;
  for (let i = 0; i <= stops; i++) {
    const y = Math.floor(driverMax * (i / stops));
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await new Promise(r => setTimeout(r, 900));
    const tag = String(i).padStart(2, '0');
    await page.screenshot({ path: `shots/v4-${tag}.png`, timeout: 30000 });
    console.log(`scroll=${y}  →  v4-${tag}.png`);
  }

  // Mobile
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:5173/works/desktop-light', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));
  const mDriverH = await page.evaluate(() => document.querySelector('.dl-driver')?.getBoundingClientRect().height);
  const mvh = 844;
  const mMax = Math.max(1, mDriverH - mvh);
  for (let i = 0; i <= 10; i++) {
    const y = Math.floor(mMax * (i / 10));
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await new Promise(r => setTimeout(r, 900));
    await page.screenshot({ path: `shots/v4m-${String(i).padStart(2, '0')}.png`, timeout: 30000 });
    console.log(`mobile scroll=${y}`);
  }

  console.log('Failed responses:', failed.length);
  failed.forEach(f => console.log('  ' + f));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
