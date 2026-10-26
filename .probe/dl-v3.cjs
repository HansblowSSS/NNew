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
  console.log('total scroll height:', totalH);

  // Capture 9 evenly-spaced positions through the roll + end footer
  const stops = 9;
  for (let i = 0; i <= stops; i++) {
    const y = Math.floor((totalH - vh) * (i / stops));
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await new Promise(r => setTimeout(r, 1200));
    const tag = String(i).padStart(2, '0');
    await page.screenshot({ path: `shots/v3-${tag}.png`, timeout: 30000 });
    console.log(`scroll=${y}  →  v3-${tag}.png`);
  }

  // Mobile
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:5173/works/desktop-light', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));
  const mH = await page.evaluate(() => document.documentElement.scrollHeight);
  const mvh = 844;
  for (let i = 0; i <= 6; i++) {
    const y = Math.floor((mH - mvh) * (i / 6));
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `shots/v3m-${String(i).padStart(2, '0')}.png`, timeout: 30000 });
    console.log(`mobile scroll=${y}`);
  }

  console.log('Failed responses:', failed.length);
  failed.forEach(f => console.log('  ' + f));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
