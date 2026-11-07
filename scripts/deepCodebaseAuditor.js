const fs = require('fs');
const path = require('path');

function getAllFiles(dir, exts) {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  fs.readdirSync(dir).forEach(file => {
    let p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      files = files.concat(getAllFiles(p, exts));
    } else if (exts.some(ext => file.endsWith(ext))) {
      files.push(p);
    }
  });
  return files;
}

const ejsFiles = getAllFiles('./views', ['.ejs']);
console.log('Auditing ' + ejsFiles.length + ' EJS templates...');

// 1. Check for raw markdown asterisks in rendered HTML
let mdIssues = [];
ejsFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('**') && !line.includes('//') && !line.includes('/*') && !line.includes('replace')) {
      mdIssues.push({ file: f, line: idx + 1, text: line.trim() });
    }
  });
});
console.log('=== 1. Literal ** in EJS files (' + mdIssues.length + ') ===');
mdIssues.forEach(m => console.log(`  ${m.file}:${m.line} -> ${m.text}`));

// 2. Check for empty or broken hrefs
let hrefIssues = [];
ejsFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/href=["'](\s*|#)[\"']/g);
  if (matches) {
    hrefIssues.push({ file: f, matches });
  }
});
console.log('\n=== 2. Empty or # hrefs in EJS files (' + hrefIssues.length + ') ===');
hrefIssues.forEach(h => console.log(`  ${h.file} -> ${JSON.stringify(h.matches)}`));

// 3. Check for buttons without type or with broken onclick
let buttonIssues = [];
ejsFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match <button without type=
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('<button') && !line.includes('type=') && !line.includes('//')) {
      buttonIssues.push({ file: f, line: idx + 1, text: line.trim() });
    }
  });
});
console.log('\n=== 3. Buttons without type attribute (' + buttonIssues.length + ') ===');
buttonIssues.forEach(b => console.log(`  ${b.file}:${b.line} -> ${b.text}`));

// 4. Check for images without alt or without loading attribute
let imgIssues = [];
ejsFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('<img') && !line.includes('alt=') && !line.includes('//')) {
      imgIssues.push({ file: f, line: idx + 1, issue: 'missing alt', text: line.trim() });
    }
  });
});
console.log('\n=== 4. Images with potential issues (' + imgIssues.length + ') ===');
imgIssues.forEach(i => console.log(`  ${i.file}:${i.line} -> ${i.issue}: ${i.text}`));

// 5. Check data files for any remaining raw markdown that might be rendered with <%= instead of <%- or without parsing
const dataFiles = getAllFiles('./data', ['.js']);
let dataMd = [];
dataFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('**')) {
      dataMd.push({ file: f, line: idx + 1, text: line.trim() });
    }
  });
});
console.log('\n=== 5. Data files with ** asterisks (' + dataMd.length + ') ===');
dataMd.forEach(d => console.log(`  ${d.file}:${d.line} -> ${d.text}`));

