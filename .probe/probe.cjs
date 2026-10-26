const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
(async () => {
  const dir = 'c:/Zuopin/NNew/public/images/works/desktop-light';
  const files = fs.readdirSync(dir).filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
  for (const f of files) {
    const meta = await sharp(path.join(dir, f)).metadata();
    console.log(`${f.padEnd(30)}  ${meta.width}x${meta.height}  ratio=${(meta.width/meta.height).toFixed(3)}`);
  }
})().catch(e => { console.error(e); process.exit(1); });
