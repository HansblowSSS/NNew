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
  page.on('requestfailed', req => failed.push(`FAILED ${req.url()} ${req.failure()?.errorText || ''}`));

  console.log('[verify] navigating to /works/desktop-light');
  await page.goto('http://127.0.0.1:5173/works/desktop-light', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });
  await new Promise(r => setTimeout(r, 5000));

  // Scroll to each section and screenshot
  const sections = [
    { sel: '.dl-hero', name: '01-hero' },
    { sel: '.dl-form', name: '02-form' },
    { sel: '.dl-interaction', name: '03-interaction' },
    { sel: '.dl-detail-section', name: '04-detail' },
    { sel: '.dl-context', name: '05-context' },
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
        new Promise((_, rej) => setTimeout(() => rej(new Error('scroll-timeout')), 15000)),
      ]);
    } catch (e) {
      console.log(`[scroll] ${name} failed: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 1500));
    try {
      await Promise.race([
        page.screenshot({ path: `shots/dl-${name}.png`, timeout: 30000 }),
        new Promise((_, rej) => setTimeout(() => rej(new Error('screenshot-timeout')), 35000)),
      ]);
      console.log(`screenshot: dl-${name}.png`);
    } catch (e) {
      console.log(`[screenshot] ${name} failed: ${e.message}`);
    }
  }

  console.log('\nFailed requests:');
  failed.forEach(f => console.log('  ' + f));

  await browser.close();
  console.log('[done]');
})().catch(e => { console.error(e); process.exit(1); });
