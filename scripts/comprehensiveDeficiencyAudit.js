const http = require('http');
const { parse } = require('url');

function fetch(urlStr) {
  return new Promise((resolve, reject) => {
    http.get(urlStr, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function runAudit() {
  console.log('🚀 [KAPSAMLI DENETİM BAŞLATILDI]');
  
  // 1. Get sitemap URLs
  const sitemapRes = await fetch('http://localhost:7450/sitemap.xml');
  const subSitemaps = [...sitemapRes.body.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map(m => m[1]);
  
  let allUrls = [];
  for (const sub of subSitemaps) {
    const localSub = sub.replace(/^https?:\/\/[^\/]+/, 'http://localhost:7450');
    const res = await fetch(localSub);
    const urls = [...res.body.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map(m => m[1]);
    allUrls.push(...urls);
  }
  
  allUrls = [...new Set(allUrls)];
  console.log(`📌 Toplam Taranacak URL: ${allUrls.length}`);
  
  const issues = [];
  const warnings = [];
  const checkedAssets = new Set();
  const assetErrors = [];
  
  for (let i = 0; i < allUrls.length; i++) {
    const url = allUrls[i];
    const localUrl = url.replace(/^https?:\/\/[^\/]+/, 'http://localhost:7450');
    const res = await fetch(localUrl);
    
    if (res.status !== 200) {
      issues.push(`[HTTP ${res.status}] ${url}`);
      continue;
    }
    
    const body = res.body;
    
    // Check template leaks
    if (body.includes('<%=') || body.includes('%>') || body.includes('undefined') || body.includes('[object Object]') || body.includes('NaN')) {
      const match = body.match(/(<%=|%>|undefined|\[object Object\]|NaN)/);
      // Ensure "undefined" isn't part of normal text like "tanımlanmamış"
      if (body.includes('<%=') || body.includes('%>') || body.includes('[object Object]') || body.includes('NaN') || /\bundefined\b/.test(body)) {
        issues.push(`[Şablon Sızıntısı (${match[0]})]: ${url}`);
      }
    }
    
    // Check H1
    const h1Matches = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
    if (h1Matches.length === 0) {
      issues.push(`[H1 Eksik]: ${url}`);
    } else if (h1Matches.length > 1) {
      warnings.push(`[Birden Fazla H1 (${h1Matches.length})]: ${url}`);
    }
    
    // Check Title
    const titleMatch = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
      issues.push(`[Title Eksik]: ${url}`);
    } else {
      const t = titleMatch[1].trim();
      if (t.length < 20) warnings.push(`[Title Çok Kısa (${t.length})]: ${url} -> ${t}`);
      if (t.length > 85) warnings.push(`[Title Çok Uzun (${t.length})]: ${url} -> ${t}`);
    }
    
    // Check Meta Description
    const metaDescMatch = body.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    if (!metaDescMatch || !metaDescMatch[1].trim()) {
      issues.push(`[Meta Description Eksik]: ${url}`);
    } else {
      const d = metaDescMatch[1].trim();
      if (d.length < 50) warnings.push(`[Meta Description Kısa (${d.length})]: ${url}`);
      if (d.length > 180) warnings.push(`[Meta Description Uzun (${d.length})]: ${url}`);
    }
    
    // Check Canonical
    const canonicalMatch = body.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    if (!canonicalMatch) {
      issues.push(`[Canonical Eksik]: ${url}`);
    }
    
    // Check Schema JSON-LD
    const schemaMatches = [...body.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    for (const sm of schemaMatches) {
      try {
        JSON.parse(sm[1]);
      } catch (err) {
        issues.push(`[Geçersiz JSON-LD Schema]: ${url} -> ${err.message}`);
      }
    }
    
    // Check Images for alt
    const imgMatches = [...body.matchAll(/<img\s+([^>]+)>/gi)];
    for (const im of imgMatches) {
      const attrs = im[1];
      if (!attrs.includes('alt=') || /alt=["']\s*["']/.test(attrs)) {
        warnings.push(`[Alt Eksik Görsel]: ${url} -> ${im[0]}`);
      }
      
      const srcMatch = attrs.match(/src=["']([^"']+)["']/);
      if (srcMatch) {
        const src = srcMatch[1];
        if (src.startsWith('/') && !checkedAssets.has(src)) {
          checkedAssets.add(src);
          const assetRes = await fetch('http://localhost:7450' + src);
          if (assetRes.status !== 200) {
            assetErrors.push(`[Kırık Görsel / Varlık HTTP ${assetRes.status}]: ${src} (Referans: ${url})`);
          }
        }
      }
    }
    
    // Check Links
    const aMatches = [...body.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi)];
    for (const am of aMatches) {
      const href = am[1];
      if (href.startsWith('http://localhost:7450') || (href.startsWith('/') && !href.startsWith('//'))) {
        const cleanHref = href.split('#')[0].split('?')[0];
        if (cleanHref && cleanHref !== '/' && !checkedAssets.has('link:' + cleanHref)) {
          checkedAssets.add('link:' + cleanHref);
          try {
            const linkRes = await fetch('http://localhost:7450' + cleanHref);
            if (linkRes.status === 404) {
              issues.push(`[Kırık İç Bağlantı 404]: ${cleanHref} (Bulunduğu Sayfa: ${url})`);
            }
          } catch(e) {}
        }
      }
    }
  }
  
  console.log('\n--- DENETİM SONUÇLARI ---');
  console.log(`Kritik Hata Sayısı: ${issues.length}`);
  console.log(`Varlık / Görsel Hatası: ${assetErrors.length}`);
  console.log(`Uyarı Sayısı: ${warnings.length}`);
  
  if (issues.length > 0) {
    console.log('\n❌ KRİTİK HATALAR:');
    issues.slice(0, 20).forEach(i => console.log('  ' + i));
  }
  
  if (assetErrors.length > 0) {
    console.log('\n❌ KIRIK STATİK DOSYALAR:');
    assetErrors.forEach(a => console.log('  ' + a));
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️ UYARILAR (İlk 15):');
    warnings.slice(0, 15).forEach(w => console.log('  ' + w));
  }
}

runAudit().catch(console.error);
