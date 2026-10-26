const http = require('http');
const urls = [
  'http://127.0.0.1:5173/works/desktop-light',
  'http://127.0.0.1:5173/images/works/desktop-light/摆件灯商业主图.png',
  'http://127.0.0.1:5173/images/works/desktop-light/摆件灯细节图.jpg',
  'http://127.0.0.1:5173/images/works/desktop-light/structure.png',
  'http://127.0.0.1:5173/images/works/desktop-light/scene.png',
  'http://127.0.0.1:5173/images/works/desktop-light/cover.jpg',
];
let i = 0;
function next() {
  if (i >= urls.length) { console.log('Done.'); return; }
  const u = urls[i++];
  http.get(u, res => {
    let total = 0;
    res.on('data', c => total += c.length);
    res.on('end', () => {
      console.log(`${res.statusCode}  ${(total/1024).toFixed(1)} KB  ${u}`);
      next();
    });
  }).on('error', e => { console.error(e.message, u); next(); });
}
next();
