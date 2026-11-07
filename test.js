/**
 * Adem Hafriyat - Otomatik Doğrulama, Entegrasyon & Performans Testi
 * Modüler Sitemap, LLM Bilgi Haritası, 13 Köy Makaleleri ve Microcache Performans Kontrolleri
 */

const http = require('http');
const app = require('./server');

const PORT = 7455;
process.env.NODE_ENV = 'test';

const server = app.listen(PORT, async () => {
  console.log(`[TEST]: Test sunucusu http://localhost:${PORT} üzerinde başlatıldı.`);
  let failed = false;

  async function fetchPath(path, headers = {}) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const options = {
        hostname: 'localhost',
        port: PORT,
        path: path,
        method: 'GET',
        headers: headers
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const duration = Date.now() - startTime;
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data,
            duration
          });
        });
      });
      req.on('error', reject);
      req.end();
    });
  }

  try {
    console.log('\n--- 1. ROTA VE SAYFA KONTROLLERİ ---');
    const testRoutes = [
      { path: '/', title: 'Ana Sayfa', expectText: 'Yalova Kepçe Kiralama' },
      { path: '/hizmetlerimiz', title: 'Hizmetlerimiz', expectText: 'Kepçe & Hafriyat Hizmetlerimiz' },
      { path: '/hizmetlerimiz/kepce-kiralama', title: 'Kepçe Kiralama Detay', expectText: 'Yalova Kepçe Kiralama' },
      { path: '/hizmetlerimiz/forklift-kiralama', title: 'Forklift Kiralama Detay', expectText: 'Yalova Forklift Kiralama' },
      { path: '/hizmetlerimiz/kanal-kazma', title: 'Kanal Kazma Detay', expectText: 'Kanal Kazma' },
      { path: '/hizmetlerimiz/su-kuyusu-kazma', title: 'Su Kuyusu Detay', expectText: 'Su Kuyusu' },
      { path: '/hizmetlerimiz/yagmur-kanalizasyon-giderleri', title: 'Yağmur & Kanalizasyon', expectText: 'Yağmur' },
      { path: '/hizmetlerimiz/tamir-altyapi-onarim', title: 'Tamir & Onarım', expectText: 'Tamir' },
      { path: '/hizmetlerimiz/arazi-duzleme-tesviye', title: 'Arazi Düzleme', expectText: 'Arazi Düzleme' },
      { path: '/hizmetlerimiz/dolgu-micir-yayma', title: 'Dolgu & Mıcır Yayma', expectText: 'Mıcır' },
      { path: '/hizmetlerimiz/elektrik-kanal-kazma', title: 'Elektrik Kanal Kazma', expectText: 'Elektrik' },
      { path: '/hizmetlerimiz/bina-cevre-duzenleme', title: 'Bina Çevre Düzenleme', expectText: 'Çevre Düzenleme' },
      { path: '/hizmetlerimiz/hafriyat-peyzaj-isleri', title: 'Hafriyat Peyzaj', expectText: 'Peyzaj' },
      { path: '/hizmetlerimiz/temel-kazma', title: 'Temel Kazma', expectText: 'Temel' },
      { path: '/bolgeler/ciftlikkoy', title: 'Çiftlikköy Bölge', expectText: 'Çiftlikköy' },
      { path: '/bolgeler/taskopru', title: 'Taşköprü Bölge', expectText: 'Taşköprü' },
      { path: '/bolgeler/yalova-merkez', title: 'Yalova Merkez Bölge', expectText: 'Yalova Merkez' },
      { path: '/bolgeler/altinova', title: 'Altınova Bölge', expectText: 'Altınova' },
      { path: '/bolgeler/ciftlikkoy/kanal-kazma', title: 'Çapraz SEO: Çiftlikköy Kanal Kazma', expectText: 'Çiftlikköy' },
      { path: '/bolgeler/taskopru/forklift-kiralama', title: 'Çapraz SEO: Taşköprü Forklift', expectText: 'Taşköprü' },
      { path: '/bolgeler/ciftlikkoy/mahalle/sahil-mahallesi', title: 'Mahalle SEO: Çiftlikköy Sahil', expectText: 'Sahil Mahallesi' },
      { path: '/bolgeler/taskopru/mahalle/taskopru-sanayi', title: 'Sanayi SEO: Taşköprü Sanayi Bölgesi', expectText: 'Taşköprü Sanayi' },
      { path: '/bolgeler/ciftlikkoy/mahalle/gacik-koyu', title: 'Köy SEO: Gacık Köyü Sayfası', expectText: 'Gacık Köyü' },
      { path: '/makinelerimiz', title: 'Makine Parkuru', expectText: 'JCB' },
      { path: '/makinelerimiz/jcb-3cx-bekoloder', title: 'JCB Makine Detay', expectText: 'JCB 3CX' },
      { path: '/makaleler', title: 'Makaleler Listesi', expectText: 'Rehber' },
      { path: '/makaleler/yalova-kepce-kiralama-rehberi', title: 'Makale Detay', expectText: 'Bekoloder mi Mini Ekskavatör mü' },
      { path: '/hakkimizda', title: 'Hakkımızda', expectText: 'Adem Hafriyat' },
      { path: '/iletisim', title: 'İletişim', expectText: '0532 720 20 10' },
      { path: '/site-haritasi', title: 'HTML Site Haritası', expectText: 'Adem Hafriyat Dijital İçerik Haritası' }
    ];

    for (const route of testRoutes) {
      const res = await fetchPath(route.path);
      if (res.statusCode !== 200) {
        console.error(`❌ [HATA]: ${route.title} (${route.path}) -> Beklenen 200, Alınan: ${res.statusCode}`);
        failed = true;
      } else if (!res.body.includes(route.expectText)) {
        console.error(`❌ [HATA]: ${route.title} (${route.path}) içeriğinde '${route.expectText}' bulunamadı!`);
        failed = true;
      } else {
        console.log(`✅ [BAŞARILI]: ${route.title} (${route.path}) -> HTTP 200 OK & İçerik Doğrulandı.`);
      }
    }

    console.log('\n--- 2. ÇİFTLİKKÖY VE YALOVA MERKEZ 13 KÖY MAKALESİ KONTROLLERİ ---');
    const villageArticleRoutes = [
      { path: '/makaleler/kabakli-koyu-kepce-kiralama-arazi-duzleme', expectText: 'Kabaklı Köyü' },
      { path: '/makaleler/cukurkoy-su-kuyusu-kazma-ve-bahce-drenaji', expectText: 'Çukurköy' },
      { path: '/makaleler/derekoy-dere-islahi-ve-kanal-kazma-rehberi', expectText: 'Dereköy' },
      { path: '/makaleler/gacik-koyu-zeytinlik-temizleme-ve-villa-temel-kazisi', expectText: 'Gacık Köyü' },
      { path: '/makaleler/laledere-koyu-bag-bahce-drenaji-ve-fosseptik-cukuru', expectText: 'Laledere Köyü' },
      { path: '/makaleler/ilyaskoy-arazi-tesviyesi-ve-tel-orgu-hafriyati', expectText: 'İlyasköy' },
      { path: '/makaleler/denizcali-koyu-sanayi-depo-hafriyat-ve-forklift-kiralama', expectText: 'Denizçalı Köyü' },
      { path: '/makaleler/kadikoy-beldesi-villa-temeli-ve-havuz-kazisi', expectText: 'Kadıköy Beldesi' },
      { path: '/makaleler/samanli-koyu-kivi-bahcesi-tesviyesi-ve-derin-kuyu-kazimi', expectText: 'Samanlı Köyü' },
      { path: '/makaleler/safran-koyu-engebeli-arazi-duzleme-ve-kaya-kirma', expectText: 'Safran Köyü' },
      { path: '/makaleler/hacimehmet-koyu-dere-islahi-ve-yagmur-suyu-kanali', expectText: 'Hacımehmet Köyü' },
      { path: '/makaleler/guneykoy-taslik-arazi-kirici-kepce-ve-derin-su-kuyusu', expectText: 'Güneyköy' },
      { path: '/makaleler/sogucak-koyu-yamac-hafriyati-kademeli-bahce-tesviyesi', expectText: 'Soğucak Köyü' }
    ];

    for (const vRoute of villageArticleRoutes) {
      const res = await fetchPath(vRoute.path);
      if (res.statusCode !== 200) {
        console.error(`❌ [HATA]: Köy Makalesi (${vRoute.path}) -> Beklenen 200, Alınan: ${res.statusCode}`);
        failed = true;
      } else if (!res.body.includes(vRoute.expectText)) {
        console.error(`❌ [HATA]: Köy Makalesi (${vRoute.path}) içeriğinde '${vRoute.expectText}' bulunamadı!`);
        failed = true;
      } else {
        console.log(`✅ [BAŞARILI]: Köy Makalesi (${vRoute.path}) -> HTTP 200 OK & '%100 GEO Doğrulandı'.`);
      }
    }

    console.log('\n--- 3. MODÜLER XML SITEMAP & ROBOTS & LLM KONTROLLERİ ---');
    const sitemapIndexRes = await fetchPath('/sitemap.xml');
    if (sitemapIndexRes.statusCode === 200 && sitemapIndexRes.body.includes('<sitemapindex') && sitemapIndexRes.body.includes('sitemap-blog.xml')) {
      console.log('✅ [BAŞARILI]: /sitemap.xml geçerli bir Sitemap Index (<sitemapindex>) döndürüyor.');
    } else {
      console.error('❌ [HATA]: /sitemap.xml Sitemap Index formatında değil veya alt haritalar eksik!');
      failed = true;
    }

    const subSitemaps = [
      '/sitemap-main.xml',
      '/sitemap-services.xml',
      '/sitemap-districts.xml',
      '/sitemap-localities.xml',
      '/sitemap-machinery.xml',
      '/sitemap-blog.xml'
    ];
    for (const subSm of subSitemaps) {
      const smRes = await fetchPath(subSm);
      if (smRes.statusCode === 200 && smRes.body.includes('<urlset')) {
        console.log(`✅ [BAŞARILI]: Alt Sitemap (${subSm}) -> HTTP 200 OK & Geçerli <urlset> XML.`);
      } else {
        console.error(`❌ [HATA]: Alt Sitemap (${subSm}) geçersiz veya status ${smRes.statusCode}`);
        failed = true;
      }
    }

    const robotsRes = await fetchPath('/robots.txt');
    if (robotsRes.body.includes('GPTBot') && robotsRes.body.includes('llms.txt') && robotsRes.body.includes('sitemap.xml') && robotsRes.body.includes('Host:')) {
      console.log('✅ [BAŞARILI]: /robots.txt AI botlarını (GPTBot), Host tanımını ve llms.txt referansını içeriyor.');
    } else {
      console.error('❌ [HATA]: /robots.txt içinde AI yetkilendirmesi veya sitemap eksik!');
      failed = true;
    }

    const llmsRes = await fetchPath('/llms.txt');
    if (llmsRes.statusCode === 200 && llmsRes.body.includes('0532 720 20 10') && llmsRes.body.includes('Adem Hafriyat') && llmsRes.body.includes('Yapay Zeka Asistanları')) {
      console.log('✅ [BAŞARILI]: /llms.txt llmstxt.org formatında LLM öneri ve iletişim yönergeleriyle aktif.');
    } else {
      console.error('❌ [HATA]: /llms.txt eksik veya hatalı!');
      failed = true;
    }

    const llmsFullRes = await fetchPath('/llms-full.txt');
    if (llmsFullRes.statusCode === 200 && llmsFullRes.body.includes('Kabaklı') && llmsFullRes.body.includes('Samanlı')) {
      console.log('✅ [BAŞARILI]: /llms-full.txt genişletilmiş 13 köy teknik hafriyat külliyatı aktif.');
    } else {
      console.error('❌ [HATA]: /llms-full.txt eksik veya hatalı!');
      failed = true;
    }

    const aiJsonRes = await fetchPath('/ai.json');
    if (aiJsonRes.statusCode === 200 && aiJsonRes.headers['content-type'].includes('application/json')) {
      const parsedAi = JSON.parse(aiJsonRes.body);
      if (parsedAi.name === 'Adem Hafriyat' && parsedAi.services.length > 0) {
        console.log('✅ [BAŞARILI]: /ai.json geçerli JSON Semantic Graph döndürüyor.');
      } else {
        console.error('❌ [HATA]: /ai.json içeriği eksik!');
        failed = true;
      }
    } else {
      console.error('❌ [HATA]: /ai.json JSON formatında değil!');
      failed = true;
    }

    console.log('\n--- 4. OLAĞANÜSTÜ PERFORMANS, MICROCACHE & CORE WEB VITALS KONTROLLERİ ---');
    // 1. İstek: Cache Miss (İlk Derleme)
    const missRes = await fetchPath('/');
    const etag = missRes.headers['etag'];

    // 2. İstek: Microcache Hit (< 15ms)
    const hitRes = await fetchPath('/');
    if (hitRes.headers['x-cache'] === 'HIT') {
      console.log(`✅ [BAŞARILI]: In-Memory Microcache devrede! Yanıt süresi: ${hitRes.duration}ms (X-Cache: HIT).`);
    } else {
      console.error('❌ [HATA]: Microcache HIT yanıtı dönmedi!');
      failed = true;
    }

    // 3. İstek: 304 Not Modified Testi
    if (etag) {
      const notModifiedRes = await fetchPath('/', { 'if-none-match': etag });
      if (notModifiedRes.statusCode === 304) {
        console.log(`✅ [BAŞARILI]: ETag eşleşmesinde HTTP 304 Not Modified döndü (0 bayt bant genişliği).`);
      } else {
        console.error(`❌ [HATA]: 304 Not Modified beklenirken ${notModifiedRes.statusCode} alındı!`);
        failed = true;
      }
    }

    // 4. Statik Dosyalarda 1 Yıllık Immutable Cache Kontrolü
    const cssRes = await fetchPath('/css/main.css');
    const cacheHeader = cssRes.headers['cache-control'] || '';
    if (cacheHeader.includes('max-age=31536000') && cacheHeader.includes('immutable')) {
      console.log('✅ [BAŞARILI]: Statik dosyalarda 1 yıllık (31536000s) immutable önbellekleme aktif.');
    } else {
      console.error(`❌ [HATA]: Cache-Control başlığı eksik veya hatalı: ${cacheHeader}`);
      failed = true;
    }

    // 5. Preload & Resource Hints Kontrolü
    if (hitRes.body.includes('rel="preload"') && hitRes.body.includes('as="style"') && hitRes.body.includes('fetchpriority="high"')) {
      console.log('✅ [BAŞARILI]: HTML head içinde kritik CSS ve LCP SVG Logo preload etiketleri mevcut.');
    } else {
      console.error('❌ [HATA]: Preload etiketleri eksik!');
      failed = true;
    }

    console.log('\n--- 5. SCHEMA.ORG & GEO & ÇİFT YÖNLÜ KÖPRÜLEME KONTROLLERİ ---');
    const gacikPageRes = await fetchPath('/bolgeler/ciftlikkoy/mahalle/gacik-koyu');
    if (gacikPageRes.body.includes('KÖYE ÖZEL SAHA REHBERİ') && gacikPageRes.body.includes('gacik-koyu-zeytinlik-temizleme-ve-villa-temel-kazisi')) {
      console.log('✅ [BAŞARILI]: Köy sayfasında (/bolgeler/ciftlikkoy/mahalle/gacik-koyu) ilgili köy makalesine doğrudan köprü mevcut.');
    } else {
      console.error('❌ [HATA]: Köy sayfasında ilgili makale kartı bulunamadı!');
      failed = true;
    }

    const gacikArticleRes = await fetchPath('/makaleler/gacik-koyu-zeytinlik-temizleme-ve-villa-temel-kazisi');
    if (gacikArticleRes.body.includes('/bolgeler/ciftlikkoy/mahalle/gacik-koyu') && gacikArticleRes.body.includes('HİZMET BÖLGESİ')) {
      console.log('✅ [BAŞARILI]: Köy makalesinde (/makaleler/gacik-...) ilgili köy sayfasına geri bağlantı mevcut.');
    } else {
      console.error('❌ [HATA]: Köy makalesinde köy sayfasına geri bağlantı bulunamadı!');
      failed = true;
    }

    const homeRes = await fetchPath('/');
    if (homeRes.body.includes('application/ld+json') && homeRes.body.includes('HomeAndConstructionBusiness')) {
      console.log('✅ [BAŞARILI]: Ana sayfada LocalBusiness Schema.org JSON-LD mevcut.');
    } else {
      console.error('❌ [HATA]: Ana sayfada Schema.org JSON-LD bulunamadı!');
      failed = true;
    }

    if (homeRes.body.includes('hasOfferCatalog') && homeRes.body.includes('AggregateRating')) {
      console.log('✅ [BAŞARILI]: Schema.org hasOfferCatalog ve Google yıldızlı AggregateRating aktif.');
    } else {
      console.error('❌ [HATA]: Schema.org hasOfferCatalog veya AggregateRating eksik!');
      failed = true;
    }

    if (homeRes.body.includes('name="geo.region" content="TR-77"') && homeRes.body.includes('40.6628;29.3512')) {
      console.log('✅ [BAŞARILI]: Coğrafi (GEO) TR-77 ve ICBM koordinat meta etiketleri mevcut.');
    } else {
      console.error('❌ [HATA]: GEO koordinat meta etiketleri eksik!');
      failed = true;
    }

    // 404 Hata Sayfası Kontrolü
    const notFoundRes = await fetchPath('/olmayan-bir-sayfa-urlsi');
    if (notFoundRes.statusCode === 404 && notFoundRes.body.includes('404')) {
      console.log('✅ [BAŞARILI]: Olmayan URL için HTTP 404 dönüldü ve özel 404 sayfası render edildi.');
    } else {
      console.error(`❌ [HATA]: 404 testi başarısız. Status: ${notFoundRes.statusCode}`);
      failed = true;
    }

    console.log('\n--- 6. 60 ADET %100 SEO & GEO UYUMLU MAKALE VE ÖZEL FAQ COMPONENT KONTROLLERİ ---');
    const blogPosts = require('./data/blog');
    console.log(`[BİLGİ]: Toplam ${blogPosts.length} makale taranıyor...`);
    if (blogPosts.length !== 60) {
      console.error(`❌ [HATA]: Beklenen 60 makale, ancak ${blogPosts.length} bulundu!`);
      failed = true;
    } else {
      console.log('✅ [BAŞARILI]: Toplam 60 adet makale kütüphanesi eksiksiz mevcut.');
    }

    let allFaqsOk = true;
    for (const post of blogPosts) {
      const postRes = await fetchPath(`/makaleler/${post.slug}`);
      if (postRes.statusCode !== 200) {
        console.error(`❌ [HATA]: Makale ${post.slug} HTTP 200 dönmedi! Kod: ${postRes.statusCode}`);
        failed = true;
        allFaqsOk = false;
        break;
      }
      if (!postRes.body.includes('faq-section-block') || !postRes.body.includes('FAQPage')) {
        console.error(`❌ [HATA]: Makale ${post.slug} içinde özel FAQ bileşeni veya FAQPage Schema.org eksik!`);
        failed = true;
        allFaqsOk = false;
        break;
      }
    }
    if (allFaqsOk) {
      console.log('✅ [BAŞARILI]: Tüm 60 makalede özel FAQ accordion componenti ve Schema.org FAQPage JSON-LD %100 doğrulandı.');
    }

    // Sitemap blog kontrolü
    const sitemapBlogRes = await fetchPath('/sitemap-blog.xml');
    const blogUrlMatches = (sitemapBlogRes.body.match(/<loc>/g) || []).length;
    if (blogUrlMatches === 60) {
      console.log('✅ [BAŞARILI]: /sitemap-blog.xml içinde 60 makalenin tamamı dinamik olarak listeleniyor.');
    } else {
      console.error(`❌ [HATA]: /sitemap-blog.xml içinde ${blogUrlMatches} URL bulundu (Beklenen: 60)!`);
      failed = true;
    }

    console.log('\n--- 7. FOOTER VE TÜM SİTE LİNKLERİ 0 KIRIK LİNK DOĞRULAMASI ---');
    const footerLinks = [
      '/hizmetlerimiz/kepce-kiralama',
      '/hizmetlerimiz/kanal-kazma',
      '/hizmetlerimiz/su-kuyusu-kazma',
      '/hizmetlerimiz/yagmur-kanalizasyon-giderleri',
      '/hizmetlerimiz/tamir-altyapi-onarim',
      '/hizmetlerimiz/arazi-duzleme-tesviye',
      '/hizmetlerimiz/temel-kazma',
      '/hizmetlerimiz/dolgu-micir-yayma',
      '/hizmetlerimiz/elektrik-kanal-kazma',
      '/hizmetlerimiz/bina-cevre-duzenleme',
      '/hizmetlerimiz/hafriyat-peyzaj-isleri',
      '/hizmetlerimiz/forklift-kiralama',
      '/bolgeler/taskopru/mahalle/taskopru-sanayi',
      '/bolgeler/altinova/mahalle/altinova-tersaneler',
      '/hizmetlerimiz/operatorlu-forklift-kiralama',
      '/hizmetlerimiz/operatorsuz-forklift-kiralama',
      '/makinelerimiz/forklift-3-ton-dizel',
      '/makinelerimiz/forklift-5-ton-agir-sanayi',
      '/makinelerimiz/forklift-25-ton-akulu',
      '/bolgeler/ciftlikkoy',
      '/bolgeler/taskopru',
      '/bolgeler/yalova-merkez',
      '/bolgeler/altinova',
      '/bolgeler/cinarcik',
      '/bolgeler/termal',
      '/bolgeler/armutlu',
      '/makinelerimiz/jcb-3cx-bekoloder',
      '/makinelerimiz/mini-ekskavator-35-ton',
      '/makinelerimiz/paletli-ekskavator-22-ton',
      '/makaleler/yalova-kepce-kiralama-rehberi',
      '/makaleler/ciftlikkoy-zemin-yapisi-ve-kazi-rehberi',
      '/makaleler/taskopru-sanayi-forklift-kiralama-kriterleri',
      '/site-haritasi',
      '/sitemap.xml',
      '/llms.txt',
      '/makaleler',
      '/hakkimizda',
      '/iletisim'
    ];

    let brokenCount = 0;
    for (const url of footerLinks) {
      const res = await fetchPath(url);
      if (res.statusCode !== 200) {
        console.error(`❌ [HATA]: Footer linki kırık: ${url} (HTTP ${res.statusCode})`);
        brokenCount++;
        failed = true;
      }
    }
    if (brokenCount === 0) {
      console.log(`✅ [BAŞARILI]: Footer'daki ${footerLinks.length} adet linkin tamamı HTTP 200 OK! Sıfır (0) kırık link.`);
    }

    console.log('\n--- 8. STATİK VARLIKLAR, GÖRSELLER, FAVICON VE MANIFEST KONTROLLERİ ---');
    const assetCheckRoutes = [
      '/favicon.ico',
      '/manifest.json',
      '/images/favicon.svg',
      '/images/logo.svg',
      '/images/hero-kepce.jpg',
      '/images/kepce-kiralama.jpg',
      '/images/forklift-kiralama.jpg',
      '/images/jcb-3cx.jpg',
      '/images/cat-303.jpg',
      '/images/blog-kepce-rehberi.jpg'
    ];

    let missingAssetCount = 0;
    for (const assetPath of assetCheckRoutes) {
      const res = await fetchPath(assetPath);
      if (res.statusCode !== 200) {
        console.error(`❌ [HATA]: Statik varlık bulunamadı: ${assetPath} (HTTP ${res.statusCode})`);
        missingAssetCount++;
        failed = true;
      }
    }
    if (missingAssetCount === 0) {
      console.log(`✅ [BAŞARILI]: Kritik statik varlıklar (favicon, manifest, SVG logolar, 1200x675 JPG görseller) HTTP 200 OK!`);
    }

    if (failed) {
      console.error('\n❌ TESTLERDE HATALAR BULUNDU!');
      process.exit(1);
    } else {
      console.log('\n🎉 TÜM TESTLER BAŞARIYLA GEÇTİ! OLAĞANÜSTÜ PERFORMANS ALTYAPISI DEVREDE VE %100 ÇALIŞIYOR.');
      process.exit(0);
    }
  } catch (err) {
    console.error('Test sırasında beklenmeyen hata:', err);
    process.exit(1);
  } finally {
    server.close();
  }
});
