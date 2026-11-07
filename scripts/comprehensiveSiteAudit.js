const http = require('http');
const fs = require('fs');

const PORT = 7450;
const BASE_URL = `http://localhost:${PORT}`;

async function fetchUrl(path) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path,
          status: res.statusCode,
          headers: res.headers,
          body: data,
          duration: Date.now() - startTime
        });
      });
    }).on('error', (err) => {
      resolve({
        path,
        status: 0,
        error: err.message,
        body: '',
        duration: 0
      });
    });
  });
}

function parseXmlUrls(xml) {
  const matches = [];
  const regex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  let m;
  while ((m = regex.exec(xml)) !== null) {
    try {
      const u = new URL(m[1]);
      matches.push(u.pathname);
    } catch (e) {}
  }
  return matches;
}

async function runAudit() {
  console.log('🚀 Starting Comprehensive Site Audit for Adem Hafriyat...');
  
  // 1. Fetch sitemap.xml and all sub-sitemaps
  const sitemapIndex = await fetchUrl('/sitemap.xml');
  const subSitemaps = parseXmlUrls(sitemapIndex.body);
  console.log(`Found ${subSitemaps.length} sub-sitemaps in /sitemap.xml`);

  let allPageUrls = new Set();
  for (const sm of subSitemaps) {
    const res = await fetchUrl(sm);
    const urls = parseXmlUrls(res.body);
    urls.forEach(u => allPageUrls.add(u));
  }

  // Add key static pages if not present
  allPageUrls.add('/');
  allPageUrls.add('/site-haritasi');
  allPageUrls.add('/hakkimizda');
  allPageUrls.add('/iletisim');
  allPageUrls.add('/hizmetlerimiz');
  allPageUrls.add('/makinelerimiz');
  allPageUrls.add('/makaleler');

  console.log(`Total unique pages to audit: ${allPageUrls.size}`);

  const issues = [];
  const warnings = [];
  const stats = {
    totalPages: allPageUrls.size,
    checkedPages: 0,
    status200: 0,
    statusOther: 0,
    missingTitle: 0,
    missingDesc: 0,
    missingCanonical: 0,
    missingH1: 0,
    multipleH1: 0,
    missingGeo: 0,
    missingJsonLd: 0,
    invalidJsonLd: 0,
    imagesWithoutAlt: 0
  };

  for (const pagePath of allPageUrls) {
    stats.checkedPages++;
    const res = await fetchUrl(pagePath);
    if (res.status !== 200) {
      stats.statusOther++;
      issues.push({ path: pagePath, type: 'HTTP_STATUS', message: `Returned HTTP ${res.status}` });
      continue;
    }
    stats.status200++;

    const html = res.body;

    // Check Title
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
      stats.missingTitle++;
      issues.push({ path: pagePath, type: 'SEO_TITLE', message: 'Missing <title> tag' });
    } else {
      const titleLen = titleMatch[1].trim().length;
      if (titleLen < 20 || titleLen > 75) {
        warnings.push({ path: pagePath, type: 'SEO_TITLE_LENGTH', message: `Title length (${titleLen} chars) outside optimal 25-70 range: "${titleMatch[1].trim()}"` });
      }
    }

    // Check Meta Description
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    if (!descMatch || !descMatch[1].trim()) {
      stats.missingDesc++;
      issues.push({ path: pagePath, type: 'SEO_DESC', message: 'Missing meta description' });
    } else {
      const descLen = descMatch[1].trim().length;
      if (descLen < 60 || descLen > 220) {
        warnings.push({ path: pagePath, type: 'SEO_DESC_LENGTH', message: `Description length (${descLen} chars) outside optimal 70-170 range` });
      }
    }

    // Check Canonical
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
    if (!canonicalMatch) {
      stats.missingCanonical++;
      issues.push({ path: pagePath, type: 'SEO_CANONICAL', message: 'Missing canonical URL link tag' });
    }

    // Check H1
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    if (h1Matches.length === 0) {
      stats.missingH1++;
      issues.push({ path: pagePath, type: 'SEO_H1', message: 'Page has NO <h1> tag' });
    } else if (h1Matches.length > 1) {
      stats.multipleH1++;
      warnings.push({ path: pagePath, type: 'SEO_MULTIPLE_H1', message: `Page has ${h1Matches.length} <h1> tags` });
    }

    // Check GEO Meta Tags
    if (!html.includes('name="geo.region"') || !html.includes('name="geo.position"')) {
      stats.missingGeo++;
      warnings.push({ path: pagePath, type: 'SEO_GEO', message: 'Missing GEO meta tags' });
    }

    // Check JSON-LD Structured Data
    const jsonLdMatches = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi) || [];
    if (jsonLdMatches.length === 0) {
      stats.missingJsonLd++;
      warnings.push({ path: pagePath, type: 'SCHEMA_MISSING', message: 'No JSON-LD schema found' });
    } else {
      for (const ld of jsonLdMatches) {
        const rawJson = ld.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim();
        try {
          JSON.parse(rawJson);
        } catch (e) {
          stats.invalidJsonLd++;
          issues.push({ path: pagePath, type: 'SCHEMA_INVALID', message: `Invalid JSON-LD syntax: ${e.message}` });
        }
      }
    }

    // Check Images for Alt
    const imgMatches = html.match(/<img[^>]+>/gi) || [];
    for (const img of imgMatches) {
      if (!img.includes('alt=') || /alt=["']\s*["']/.test(img)) {
        stats.imagesWithoutAlt++;
        warnings.push({ path: pagePath, type: 'IMG_NO_ALT', message: `Image missing alt: ${img.substring(0, 80)}` });
      }
    }
  }

  // Check special files
  const specialFiles = ['/robots.txt', '/llms.txt', '/llms-full.txt', '/ai.json'];
  for (const sf of specialFiles) {
    const res = await fetchUrl(sf);
    if (res.status !== 200) {
      issues.push({ path: sf, type: 'SPECIAL_FILE', message: `File returned HTTP ${res.status}` });
    }
  }

  console.log('\n======================================================');
  console.log('AUDIT SUMMARY & METRICS:');
  console.log('======================================================');
  console.log(`Total Pages Audited: ${stats.totalPages}`);
  console.log(`HTTP 200 OK: ${stats.status200}`);
  console.log(`HTTP Errors: ${stats.statusOther}`);
  console.log(`Missing Title: ${stats.missingTitle}`);
  console.log(`Missing Description: ${stats.missingDesc}`);
  console.log(`Missing Canonical: ${stats.missingCanonical}`);
  console.log(`Missing H1: ${stats.missingH1}`);
  console.log(`Multiple H1s: ${stats.multipleH1}`);
  console.log(`Missing GEO Tags: ${stats.missingGeo}`);
  console.log(`Missing JSON-LD: ${stats.missingJsonLd}`);
  console.log(`Invalid JSON-LD: ${stats.invalidJsonLd}`);
  console.log(`Images Without Alt: ${stats.imagesWithoutAlt}`);
  console.log(`Critical Issues Count: ${issues.length}`);
  console.log(`Optimization Warnings Count: ${warnings.length}`);

  fs.writeFileSync('scripts/auditResults.json', JSON.stringify({ stats, issues, warnings }, null, 2));
  console.log('\nFull audit results written to scripts/auditResults.json');

  if (issues.length > 0) {
    console.log('\n❌ CRITICAL ISSUES FOUND:');
    issues.forEach(i => console.log(`- [${i.type}] ${i.path}: ${i.message}`));
  } else {
    console.log('\n✅ ZERO CRITICAL ISSUES! All pages return 200 with title, description, canonical, and valid schemas.');
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️ OPTIMIZATION WARNINGS (${warnings.length} items - showing top 15):`);
    warnings.slice(0, 15).forEach(w => console.log(`- [${w.type}] ${w.path}: ${w.message}`));
  }
}

runAudit();

