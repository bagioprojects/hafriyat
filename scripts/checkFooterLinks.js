const fs = require('fs');
const http = require('http');

const footer = fs.readFileSync('views/components/common/footer.ejs', 'utf8');
const linkMatches = [...footer.matchAll(/href=["']([^"'#]+)["']/g)];
const urls = [...new Set(linkMatches.map(m => m[1]).filter(u => u.startsWith('/')))];

console.log('Testing', urls.length, 'unique relative URLs in footer:');

async function testUrl(url) {
  return new Promise(resolve => {
    http.get('http://localhost:7450' + url, res => {
      resolve({ url, status: res.statusCode });
    }).on('error', err => {
      resolve({ url, status: 'ERROR', error: err.message });
    });
  });
}

(async () => {
  const broken = [];
  const ok = [];
  for (const url of urls) {
    const res = await testUrl(url);
    if (res.status === 200) {
      ok.push(url);
    } else {
      broken.push(res);
      console.log('❌ BROKEN / NON-200:', res.status, res.url);
    }
  }
  console.log('\n--- SUMMARY ---');
  console.log('✅ OK (200):', ok.length);
  console.log('❌ BROKEN:', broken.length);
})();

