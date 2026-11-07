const fs = require('fs');
const path = require('path');

function getAllFiles(dir, exts) {
  let files = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, exts));
    } else if (exts.some(ext => fullPath.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

const ejsFiles = getAllFiles('views', ['.ejs']);
const jsFiles = getAllFiles('public/js', ['.js']).concat(getAllFiles('src', ['.js']));
const cssFiles = getAllFiles('public/css', ['.css']);

console.log(`Found ${ejsFiles.length} EJS templates, ${jsFiles.length} JS files, ${cssFiles.length} CSS files.`);

const issues = {
  placeholderHrefs: [],
  hardcodedPixelWidths: [],
  missingButtonTypes: [],
  jsFunctionIssues: [],
  potentialOverflows: []
};

// 1. EJS Taraması
ejsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    // Check href="#"
    if (/href\s*=\s*["']#["']/i.test(line) && !line.includes('href="#bolgeler"') && !line.includes('href="#mainContent"')) {
      issues.placeholderHrefs.push({ file, line: idx + 1, code: line.trim() });
    }

    // Check empty href
    if (/href\s*=\s*["']\s*["']/i.test(line)) {
      issues.placeholderHrefs.push({ file, line: idx + 1, code: line.trim() });
    }

    // Check hardcoded widths in inline styles (> 320px)
    const widthMatch = line.match(/style=["'][^"']*width:\s*([3-9][0-9]{2}|[1-9][0-9]{3,})px/i);
    if (widthMatch) {
      issues.hardcodedPixelWidths.push({ file, line: idx + 1, width: widthMatch[1], code: line.trim() });
    }

    // Check button without type
    if (/<button\b(?![^>]*\btype=)/i.test(line)) {
      issues.missingButtonTypes.push({ file, line: idx + 1, code: line.trim() });
    }
  });
});

// 2. CSS Taraması (Sert genişlikler ve taşma potansiyelleri)
cssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    // Check min-width > 350px not inside @media (min-width
    const minWidthMatch = line.match(/min-width:\s*([4-9][0-9]{2}|[1-9][0-9]{3,})px/i);
    if (minWidthMatch) {
      issues.potentialOverflows.push({ file, line: idx + 1, value: minWidthMatch[1], code: line.trim() });
    }
  });
});

console.log('\n--- SCAN RESULTS ---');
console.log(`Placeholder/Empty hrefs: ${issues.placeholderHrefs.length}`);
issues.placeholderHrefs.forEach(i => console.log(`  - [${i.file}:${i.line}] ${i.code}`));

console.log(`\nHardcoded inline widths > 320px: ${issues.hardcodedPixelWidths.length}`);
issues.hardcodedPixelWidths.forEach(i => console.log(`  - [${i.file}:${i.line}] (${i.width}px) ${i.code}`));

console.log(`\nButtons missing type attribute: ${issues.missingButtonTypes.length}`);
issues.missingButtonTypes.forEach(i => console.log(`  - [${i.file}:${i.line}] ${i.code}`));

console.log(`\nCSS potential min-width overflow (>400px): ${issues.potentialOverflows.length}`);
issues.potentialOverflows.forEach(i => console.log(`  - [${i.file}:${i.line}] ${i.code}`));

fs.writeFileSync('scripts/codebaseScanResults.json', JSON.stringify(issues, null, 2));
console.log('\nResults saved to scripts/codebaseScanResults.json');

