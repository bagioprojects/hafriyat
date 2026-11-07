const fs = require('fs');
const path = require('path');
const http = require('http');

function getAllFiles(dir, ext = '.ejs') {
  let files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, ext));
    } else if (item.name.endsWith(ext)) {
      files.push(fullPath);
    }
  }
  return files;
}

const ejsFiles = getAllFiles(path.join(__dirname, '..', 'views'));
console.log('Found', ejsFiles.length, 'EJS template files.');

const allUrls = new Set();
const urlSources = {};

for (const file of ejsFiles) {
  const content = fs.readFileSync(file, 'utf8');
  // Match href="/..." but ignore EJS tags inside href like href="/bolgeler/<%= ... %>"
  const matches = [...content.matchAll(/href=["'](\/[^"'#<%]+)["']/g)];
  for (const m of matches) {
    const url = m[1];
    if (url.startsWith('/')) {
      allUrls.add(url);
      if (!urlSources[url]) urlSources[url] = [];
      const relFile = path.relative(path.join(__dirname, '..'), file);
      if (!urlSources[url].includes(relFile)) {
        urlSources[url].push(relFile);
      }
    }
  }
}

const urlList = [...allUrls].sort();
console.log('Total unique static internal links found:', urlList.length);

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
  for (const url of urlList) {
    const res = await testUrl(url);
    if (res.status === 200) {
      ok.push(url);
    } else {
      broken.push({ url, status: res.status, sources: urlSources[url] });
      console.log(`❌ 404/BROKEN (${res.status}): ${url} (found in: ${urlSources[url].join(', ')})`);
    }
  }

  console.log('\n=========================================');
  console.log(`SUMMARY: ${ok.length} OK, ${broken.length} BROKEN`);
  console.log('=========================================');
  fs.writeFileSync('scripts/brokenLinksReport.json', JSON.stringify(broken, null, 2), 'utf8');
})();
