const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    protocolTimeout: 300000,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(120000);
  await page.setViewport({ width: 1440, height: 900 });

  const failed = [];
  page.on('response', resp => {
    if (resp.status() >= 400) failed.push(`${resp.status()} ${resp.url()}`);
  });

  console.log('[verify] /works/desktop-light');
  await page.goto('http://127.0.0.1:5173/works/desktop-light', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });
  await new Promise(r => setTimeout(r, 5000));

  const sections = [
    { sel: '.dl-hero', name: '01-hero' },
    { sel: '.dl-form', name: '02-form' },
    { sel: '.dl-interaction', name: '03-interaction' },
    { sel: '.dl-detail', name: '04-detail' },
    { sel: '.dl-context-intro', name: '05a-context-1' },
    { sel: '.dl-context-b', name: '05b-context-2' },
    { sel: '.dl-structure', name: '06-structure' },
    { sel: '.dl-closing', name: '07-closing' },
  ];

  for (const { sel, name } of sections) {
    try {
      await Promise.race([
        page.evaluate((s) => {
          const el = document.querySelector(s);
          if (el) el.scrollIntoView({ block: 'start' });
        }, sel),
        new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 15000)),
      ]);
    } catch (e) {
      console.log(`[scroll] ${name}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 1500));
    try {
      await Promise.race([
        page.screenshot({ path: `shots/v2-${name}.png`, timeout: 30000 }),
        new Promise((_, rej) => setTimeout(() => rej(new Error('ss-timeout')), 35000)),
      ]);
      console.log(`screenshot: v2-${name}.png`);
    } catch (e) {
      console.log(`[ss] ${name}: ${e.message}`);
    }
  }

  // Mobile
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:5173/works/desktop-light', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });
  await new Promise(r => setTimeout(r, 3000));
  for (const { sel, name } of [
    { sel: '.dl-hero', name: 'm-01-hero' },
    { sel: '.dl-form', name: 'm-02-form' },
    { sel: '.dl-interaction', name: 'm-03-interaction' },
    { sel: '.dl-closing', name: 'm-07-closing' },
  ]) {
    try {
      await page.evaluate((s) => {
        const el = document.querySelector(s);
        if (el) el.scrollIntoView({ block: 'start' });
      }, sel);
    } catch (e) {}
    await new Promise(r => setTimeout(r, 1200));
    try {
      await page.screenshot({ path: `shots/v2-${name}.png`, timeout: 30000 });
      console.log(`screenshot: v2-${name}.png`);
    } catch (e) {}
  }

  console.log('\nFailed:', failed.length);
  failed.forEach(f => console.log('  ' + f));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
