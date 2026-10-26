const puppeteer = require('puppeteer-core');
(async () => {
  console.log('[verify] launching Edge headless');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    protocolTimeout: 600000,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  console.log('[verify] launched');
  const page = await browser.newPage();
  page.setDefaultTimeout(120000);

  // Surface page console/errors
  page.on('console', m => console.log(`[page:${m.type()}] ${m.text()}`));
  page.on('pageerror', e => console.log(`[pageerror] ${e.message}`));

  await page.setViewport({ width: 1280, height: 720 });

  const failed = [];
  page.on('response', resp => {
    if (resp.status() >= 400) failed.push(`${resp.status()} ${resp.url()}`);
  });
  page.on('requestfailed', req => failed.push(`FAILED ${req.url()} ${req.failure()?.errorText || ''}`));

  console.log('[verify] navigating');
  await page.goto('http://127.0.0.1:5173/works/desktop-light', {
    waitUntil: 'domcontentloaded',
    timeout: 120000,
  });
  console.log('[verify] nav complete, giving page time to settle');
  await new Promise(r => setTimeout(r, 6000));

  // Read images WITHOUT awaiting their load (some may never finish — that's what we want to detect).
  let imgs = [];
  try {
    imgs = await Promise.race([
      page.evaluate(() => Array.from(document.querySelectorAll('.dl-detail img')).map(i => ({
        src: i.getAttribute('src') || i.currentSrc,
        nat: i.naturalWidth + 'x' + i.naturalHeight,
        complete: i.complete,
      }))),
      new Promise((_, rej) => setTimeout(() => rej(new Error('img-listing-eval-timeout')), 30000)),
    ]);
  } catch (e) {
    console.log('[verify] image listing failed: ' + e.message);
  }
  console.log('IMAGES:');
  (imgs || []).forEach(i => console.log(`  [${i.complete && i.nat !== '0x0' ? 'OK' : 'FAIL'}] ${i.nat}  ${i.src}`));

  console.log('\nFailed requests:');
  failed.forEach(f => console.log('  ' + f));

  const selectors = ['.dl-hero', '.dl-concept', '.dl-detail-section', '.dl-structure', '.dl-light', '.dl-context', '.dl-closing'];
  for (const sel of selectors) {
    try {
      await Promise.race([
        page.evaluate(s => { const el = document.querySelector(s); el && el.scrollIntoView({ block: 'start' }); }, sel),
        new Promise((_, rej) => setTimeout(() => rej(new Error('scroll-timeout')), 15000)),
      ]);
    } catch (e) {
      console.log(`[verify] scroll ${sel} failed: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 600));
    const name = sel.replace('.dl-', '').replace('-section', '');
    try {
      await page.screenshot({ path: `shots/dl-${name}.png`, timeout: 30000 });
      console.log(`screenshot: dl-${name}.png`);
    } catch (e) {
      console.log(`[verify] screenshot ${sel} failed: ${e.message}`);
    }
  }
  await browser.close();
  console.log('[verify] done');
})().catch(e => { console.error(e); process.exit(1); });
