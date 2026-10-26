const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const base = 'c:/Zuopin/NNew/public/images/works/desktop-light';

async function copy(name, newName) {
  const src = path.join(base, name);
  const dst = path.join(base, newName);
  const meta = await sharp(src).metadata();
  await sharp(src).toFile(dst);
  const dstMeta = await sharp(dst).metadata();
  console.log(`Copied: ${name} → ${newName}  (${meta.width}x${meta.height}) → (${dstMeta.width}x${dstMeta.height})`);
}

(async () => {
  // Only copy if destination doesn't exist or is empty
  const dst1 = path.join(base, 'structure.jpg');
  const dst2 = path.join(base, 'scene.jpg');
  const s1 = fs.statSync(dst1).size;
  const s2 = fs.statSync(dst2).size;
  if (s1 === 0) {
    await copy('摆件灯爆炸图.png', 'structure.jpg');
  } else {
    console.log('structure.jpg already has content, skipping');
  }
  if (s2 === 0) {
    await copy('摆件灯场景图.png', 'scene.jpg');
  } else {
    console.log('scene.jpg already has content, skipping');
  }
  console.log('Done.');
})().catch(e => { console.error(e); process.exit(1); });
