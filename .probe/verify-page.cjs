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
  await new Promise(r => setTimeout(r, 3000));

  // Check all sections present
  const sections = await page.evaluate(() => {
    const names = [
      '产品主视觉',
      '设计理念',
      '形态与细节',
      '结构展示',
      '光感体验',
      '场景应用',
      '收尾',
    ];
    return names.map(name => ({
      name,
      present: !!document.querySelector(`[aria-label="${name}"]`),
    }));
  });
  console.log('Sections:');
  sections.forEach(s => console.log(`  ${s.present ? '✓' : '✗'} ${s.name}`));

  // Count images
  const imgs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.dl-detail img')).map(i => ({
      src: i.getAttribute('src'),
      nat: i.naturalWidth + 'x' + i.naturalHeight,
      complete: i.complete,
    }));
  });
  console.log('\nImages loaded:');
  imgs.forEach(i => console.log(`  ${i.complete ? '✓' : '✗'} ${i.src}  (${i.nat})`));

  // Screenshot hero
  await page.screenshot({ path: 'shots/dl-hero.png', fullPage: false });
  console.log('\nScreenshot saved.');

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
