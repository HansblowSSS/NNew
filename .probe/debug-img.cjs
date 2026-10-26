const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto('http://127.0.0.1:5173/works/desktop-light', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  // Check what image URLs are actually in the DOM
  const domImgs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.dl-detail img')).map(i => ({
      src: i.getAttribute('src'),
      loaded: i.complete && i.naturalWidth > 0,
      w: i.naturalWidth,
      h: i.naturalHeight,
    }));
  });
  console.log('DOM images:');
  domImgs.forEach(i => console.log(`  [${i.loaded ? 'OK' : 'FAIL'}] ${i.w}x${i.h}  ${i.src}`));

  // Try fetching the broken images directly
  const urls = [
    '/images/works/desktop-light/%E6%91%86%E4%BB%B6%E7%81%AF%E7%88%86%E7%83%A7%E5%9B%BE.png',
    '/images/works/desktop-light/%E6%91%86%E4%BB%B6%E7%81%AF%E5%9C%BA%E6%99%AF%E5%9B%BE.png',
  ];
  for (const url of urls) {
    const resp = await page.goto('http://127.0.0.1:5173' + url);
    console.log(`${resp.status()}  ${url}`);
    await page.goBack();
  }

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
