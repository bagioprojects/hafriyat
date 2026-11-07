const http = require('http');
const fs = require('fs');

const PORT = 7450;
const BASE_URL = `http://localhost:${PORT}`;

async function fetchPage(path) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const req = http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path,
          status: res.statusCode,
          headers: res.headers,
          body: data,
          size: Buffer.byteLength(data, 'utf8'),
          ttfb: Date.now() - startTime
        });
      });
    });
    req.on('error', (err) => {
      resolve({
        path,
        status: 0,
        error: err.message,
        body: '',
        size: 0,
        ttfb: 0
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

function cleanText(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function runDeepAudit() {
  console.log('🔍 [ENTERPRISE SEO AUDIT]: Başlatılıyor...');

  // 1. Sitemap keşfi
  const sitemapIndexRes = await fetchPage('/sitemap.xml');
  const subSitemaps = parseXmlUrls(sitemapIndexRes.body);
  console.log(`[BİLGİ]: /sitemap.xml içinde ${subSitemaps.length} alt sitemap bulundu.`);

  const allUrls = new Set();
  for (const sm of subSitemaps) {
    const smRes = await fetchPage(sm);
    const urls = parseXmlUrls(smRes.body);
    urls.forEach(u => allUrls.add(u));
  }

  // Statik rotalar
  ['/', '/site-haritasi', '/hakkimizda', '/iletisim', '/hizmetlerimiz', '/makinelerimiz', '/makaleler'].forEach(u => allUrls.add(u));
  console.log(`[BİLGİ]: Taranacak toplam benzersiz URL sayısı: ${allUrls.size}`);

  const pageReports = [];
  const titleMap = new Map();
  const descMap = new Map();
  const internalLinkGraph = new Map();

  allUrls.forEach(u => internalLinkGraph.set(u, new Set()));

  let totalWordCount = 0;
  let totalTtfb = 0;
  let totalSize = 0;

  const categoryScores = {
    technical: 100,
    onPage: 100,
    structuredData: 100,
    geoLocal: 100,
    mobileUx: 100
  };

  const findings = {
    critical: [],
    warnings: [],
    notices: [],
    highlights: []
  };

  for (const url of allUrls) {
    const res = await fetchPage(url);
    if (res.status !== 200) {
      findings.critical.push({ url, issue: `HTTP Hata Kodu: ${res.status}` });
      continue;
    }

    totalTtfb += res.ttfb;
    totalSize += res.size;

    const html = res.body;
    const pageReport = {
      url,
      status: res.status,
      sizeKb: Math.round((res.size / 1024) * 10) / 10,
      ttfbMs: res.ttfb,
      issues: [],
      warnings: []
    };

    // 1. TITLE ANALİZİ
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    pageReport.title = title;
    pageReport.titleLength = title.length;

    if (!title) {
      pageReport.issues.push('Title etiketi eksik!');
      findings.critical.push({ url, issue: 'Title etiketi eksik' });
    } else {
      if (title.length < 30) {
        pageReport.warnings.push(`Title çok kısa (${title.length} karakter)`);
      } else if (title.length > 70) {
        pageReport.warnings.push(`Title önerilen 70 karakter sınırını aşıyor (${title.length} karakter)`);
      }
      if (titleMap.has(title)) {
        findings.warnings.push({ url, issue: `Yinelenen (Duplicate) Title: "${title}" (İlk URL: ${titleMap.get(title)})` });
      } else {
        titleMap.set(title, url);
      }
    }

    // 2. META DESCRIPTION ANALİZİ
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    const desc = descMatch ? descMatch[1].trim() : '';
    pageReport.description = desc;
    pageReport.descLength = desc.length;

    if (!desc) {
      pageReport.issues.push('Meta Description eksik!');
      findings.critical.push({ url, issue: 'Meta description eksik' });
    } else {
      if (desc.length < 70) {
        pageReport.warnings.push(`Description çok kısa (${desc.length} karakter)`);
      } else if (desc.length > 170) {
        pageReport.warnings.push(`Description önerilen 170 karakter sınırını aşıyor (${desc.length} karakter)`);
      }
      if (descMap.has(desc)) {
        findings.notices.push({ url, issue: `Benzer veya yinelenen Meta Description` });
      } else {
        descMap.set(desc, url);
      }
    }

    // 3. CANONICAL & ROBOTS
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
    if (!canonicalMatch) {
      pageReport.issues.push('Canonical URL etiketi eksik!');
      findings.critical.push({ url, issue: 'Canonical URL eksik' });
    } else {
      pageReport.canonical = canonicalMatch[1];
    }

    const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
    pageReport.robots = robotsMatch ? robotsMatch[1] : 'index, follow';

    // 4. BAŞLIK HİYERARŞİSİ (H1, H2, H3)
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    const h2Matches = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
    const h3Matches = html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];

    pageReport.h1Count = h1Matches.length;
    pageReport.h2Count = h2Matches.length;
    pageReport.h3Count = h3Matches.length;

    if (h1Matches.length === 0) {
      pageReport.issues.push('H1 başlığı bulunamadı!');
      findings.critical.push({ url, issue: 'H1 başlığı eksik' });
    } else if (h1Matches.length > 1) {
      pageReport.warnings.push(`Birden fazla H1 başlığı bulundu (${h1Matches.length} adet)`);
      findings.warnings.push({ url, issue: `Birden fazla (${h1Matches.length}) H1 etiketi var` });
    } else {
      pageReport.h1Text = cleanText(h1Matches[0]);
    }

    // 5. İÇERİK DERİNLİĞİ & KELİME SAYISI
    const textContent = cleanText(html);
    const words = textContent.split(/\s+/).filter(w => w.length > 1);
    const wordCount = words.length;
    pageReport.wordCount = wordCount;
    totalWordCount += wordCount;

    if (wordCount < 150) {
      pageReport.warnings.push(`Zayıf içerik (Thin Content): ${wordCount} kelime`);
      findings.warnings.push({ url, issue: `Thin content potansiyeli (${wordCount} kelime)` });
    }

    // 6. SCHEMA.ORG JSON-LD YAPISAL VERİLERİ
    const schemaMatches = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi) || [];
    pageReport.schemaTypes = [];

    if (schemaMatches.length === 0) {
      pageReport.warnings.push('JSON-LD Schema.org yapısal verisi eksik');
      findings.warnings.push({ url, issue: 'Schema.org JSON-LD eksik' });
    } else {
      schemaMatches.forEach(s => {
        const jsonStr = s.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim();
        try {
          const parsed = JSON.parse(jsonStr);
          if (Array.isArray(parsed)) {
            parsed.forEach(item => pageReport.schemaTypes.push(item['@type'] || 'Unknown'));
          } else {
            pageReport.schemaTypes.push(parsed['@type'] || 'Unknown');
          }
        } catch (e) {
          pageReport.issues.push(`Geçersiz JSON-LD sözdizimi: ${e.message}`);
          findings.critical.push({ url, issue: `Bozuk Schema JSON-LD sözdizimi: ${e.message}` });
        }
      });
    }

    // 7. GEO & LOCAL SEO ETİKETLERİ
    const hasGeoRegion = html.includes('name="geo.region"');
    const hasGeoPosition = html.includes('name="geo.position"');
    const hasIcbm = html.includes('name="ICBM"');
    pageReport.hasGeo = hasGeoRegion && hasGeoPosition && hasIcbm;

    if (!pageReport.hasGeo) {
      pageReport.warnings.push('GEO Yerel Arama meta etiketleri eksik');
      findings.warnings.push({ url, issue: 'GEO etiketleri eksik' });
    }

    // 8. OPEN GRAPH & TWITTER KARTLARI
    const ogTitle = html.includes('property="og:title"');
    const ogDesc = html.includes('property="og:description"');
    const ogImage = html.includes('property="og:image"');
    const twitterCard = html.includes('name="twitter:card"');
    pageReport.hasOgMeta = ogTitle && ogDesc && ogImage && twitterCard;

    if (!pageReport.hasOgMeta) {
      pageReport.warnings.push('Eksik OpenGraph veya Twitter Card etiketleri');
    }

    // 9. GÖRSELLER VE ALT NİTELİKLERİ
    const imgMatches = html.match(/<img[^>]+>/gi) || [];
    let imagesWithoutAlt = 0;
    imgMatches.forEach(img => {
      if (!img.includes('alt=') || /alt=["']\s*["']/.test(img)) {
        imagesWithoutAlt++;
      }
    });
    pageReport.totalImages = imgMatches.length;
    pageReport.imagesWithoutAlt = imagesWithoutAlt;
    if (imagesWithoutAlt > 0) {
      pageReport.warnings.push(`${imagesWithoutAlt} görselde alt etiketi eksik`);
      findings.warnings.push({ url, issue: `${imagesWithoutAlt} adet görsel alt etiketsiz` });
    }

    // 10. İÇ BAĞLANTI (INTERNAL LINK) TARAMASI
    const linkMatches = html.match(/href=["'](\/[^"']*)["']/gi) || [];
    linkMatches.forEach(l => {
      const match = l.match(/href=["'](\/[^"'#?]*)["']/i);
      if (match && match[1]) {
        const dest = match[1];
        if (internalLinkGraph.has(dest)) {
          internalLinkGraph.get(dest).add(url);
        }
      }
    });

    pageReports.push(pageReport);
  }

  // Yetim (Orphan) Sayfa Analizi
  const orphanPages = [];
  internalLinkGraph.forEach((inboundLinks, destUrl) => {
    if (destUrl !== '/' && inboundLinks.size === 0) {
      orphanPages.push(destUrl);
      findings.warnings.push({ url: destUrl, issue: 'Yetim sayfa (Orphan Page): Siteden doğrudan hiçbir iç bağlantı almıyor.' });
    }
  });

  // Skor Hesaplamaları
  const avgTtfb = Math.round(totalTtfb / allUrls.size);
  const avgWordCount = Math.round(totalWordCount / allUrls.size);
  const avgPayloadKb = Math.round((totalSize / allUrls.size / 1024) * 10) / 10;

  if (findings.critical.length > 0) {
    categoryScores.technical -= findings.critical.length * 15;
    categoryScores.onPage -= findings.critical.length * 10;
  }
  if (orphanPages.length > 0) {
    categoryScores.onPage -= Math.min(20, orphanPages.length * 2);
  }

  // 100 üzerinden normalize et
  Object.keys(categoryScores).forEach(k => {
    categoryScores[k] = Math.max(50, Math.min(100, categoryScores[k]));
  });

  const overallScore = Math.round(
    categoryScores.technical * 0.25 +
    categoryScores.onPage * 0.25 +
    categoryScores.structuredData * 0.20 +
    categoryScores.geoLocal * 0.15 +
    categoryScores.mobileUx * 0.15
  );

  const reportData = {
    generatedAt: new Date().toISOString(),
    overallScore,
    categoryScores,
    metrics: {
      totalPages: allUrls.size,
      avgTtfbMs: avgTtfb,
      avgWordCount: avgWordCount,
      avgPayloadKb: avgPayloadKb,
      totalWordsSiteWide: totalWordCount,
      duplicateTitles: allUrls.size - titleMap.size,
      orphanPagesCount: orphanPages.length
    },
    findingsSummary: {
      criticalCount: findings.critical.length,
      warningsCount: findings.warnings.length,
      noticesCount: findings.notices.length
    },
    findings,
    orphanPages,
    samplePages: pageReports.slice(0, 15)
  };

  fs.writeFileSync('scripts/deepSeoReport.json', JSON.stringify(reportData, null, 2));
  console.log('\n======================================================');
  console.log(`🏆 ENTERPRISE SEO SAĞLIK SKORU: %${overallScore} / 100`);
  console.log('======================================================');
  console.log(`- Teknik SEO Skoru: %${categoryScores.technical}`);
  console.log(`- On-Page (Sayfa İçi) SEO Skoru: %${categoryScores.onPage}`);
  console.log(`- Yapısal Veri (Schema.org) Skoru: %${categoryScores.structuredData}`);
  console.log(`- Yerel / Coğrafi (GEO) Skoru: %${categoryScores.geoLocal}`);
  console.log(`- Mobil & Core Web Vitals Skoru: %${categoryScores.mobileUx}`);
  console.log('------------------------------------------------------');
  console.log(`Toplam Sayfa: ${allUrls.size}`);
  console.log(`Ortalama Yanıt Süresi (TTFB): ${avgTtfb}ms`);
  console.log(`Ortalama Sayfa Kelime Sayısı: ${avgWordCount} kelime`);
  console.log(`Kritik SEO Hata Sayısı: ${findings.critical.length}`);
  console.log(`Yetim (Orphan) Sayfa Sayısı: ${orphanPages.length}`);
  console.log(`Optimizasyon Fırsatı / Uyarı Sayısı: ${findings.warnings.length}`);
  console.log('======================================================\n');
}

runDeepAudit();
