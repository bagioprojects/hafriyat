/**
 * Adem Hafriyat - Otomatik Doğrulama ve Entegrasyon Testi
 * Modüler Sitemap, LLM Bilgi Haritası ve 13 Köy Makaleleri Kontrolü
 */

const http = require('http');
const app = require('./server');

const PORT = 7455;
process.env.NODE_ENV = 'test';

const server = app.listen(PORT, async () => {
  console.log(`[TEST]: Test sunucusu http://localhost:${PORT} üzerinde başlatıldı.`);
  let failed = false;

  async function fetchPath(path) {
    return new Promise((resolve, reject) => {
      http.get(`http://localhost:${PORT}${path}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
      }).on('error', reject);
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
    // Sitemap Index
    const sitemapIndexRes = await fetchPath('/sitemap.xml');
    if (sitemapIndexRes.statusCode === 200 && sitemapIndexRes.body.includes('<sitemapindex') && sitemapIndexRes.body.includes('sitemap-blog.xml')) {
      console.log('✅ [BAŞARILI]: /sitemap.xml geçerli bir Sitemap Index (<sitemapindex>) döndürüyor.');
    } else {
      console.error('❌ [HATA]: /sitemap.xml Sitemap Index formatında değil veya alt haritalar eksik!');
      failed = true;
    }

    // Alt Sitemaps
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

    // Robots.txt
    const robotsRes = await fetchPath('/robots.txt');
    if (robotsRes.body.includes('GPTBot') && robotsRes.body.includes('llms.txt') && robotsRes.body.includes('sitemap.xml') && robotsRes.body.includes('Host:')) {
      console.log('✅ [BAŞARILI]: /robots.txt AI botlarını (GPTBot), Host tanımını ve llms.txt referansını içeriyor.');
    } else {
      console.error('❌ [HATA]: /robots.txt içinde AI yetkilendirmesi veya sitemap eksik!');
      failed = true;
    }

    // llms.txt
    const llmsRes = await fetchPath('/llms.txt');
    if (llmsRes.statusCode === 200 && llmsRes.body.includes('0532 720 20 10') && llmsRes.body.includes('Adem Hafriyat') && llmsRes.body.includes('Yapay Zeka Asistanları')) {
      console.log('✅ [BAŞARILI]: /llms.txt llmstxt.org formatında LLM öneri ve iletişim yönergeleriyle aktif.');
    } else {
      console.error('❌ [HATA]: /llms.txt eksik veya hatalı!');
      failed = true;
    }

    // llms-full.txt
    const llmsFullRes = await fetchPath('/llms-full.txt');
    if (llmsFullRes.statusCode === 200 && llmsFullRes.body.includes('Kabaklı') && llmsFullRes.body.includes('Samanlı')) {
      console.log('✅ [BAŞARILI]: /llms-full.txt genişletilmiş 13 köy teknik hafriyat külliyatı aktif.');
    } else {
      console.error('❌ [HATA]: /llms-full.txt eksik veya hatalı!');
      failed = true;
    }

    // ai.json
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

    console.log('\n--- 4. SCHEMA.ORG & GEO & ÇİFT YÖNLÜ KÖPRÜLEME KONTROLLERİ ---');
    // Gacık Köyü Sayfası Köy Makalesi Köprüsü Kontrolü
    const gacikPageRes = await fetchPath('/bolgeler/ciftlikkoy/mahalle/gacik-koyu');
    if (gacikPageRes.body.includes('KÖYE ÖZEL SAHA REHBERİ') && gacikPageRes.body.includes('gacik-koyu-zeytinlik-temizleme-ve-villa-temel-kazisi')) {
      console.log('✅ [BAŞARILI]: Köy sayfasında (/bolgeler/ciftlikkoy/mahalle/gacik-koyu) ilgili köy makalesine doğrudan köprü mevcut.');
    } else {
      console.error('❌ [HATA]: Köy sayfasında ilgili makale kartı bulunamadı!');
      failed = true;
    }

    // Gacık Makalesinden Köy Sayfasına Geri Köprü Kontrolü
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

    // Hreflang kontrolü
    if (homeRes.body.includes('hreflang="tr"') && homeRes.body.includes('rel="sitemap"')) {
      console.log('✅ [BAŞARILI]: Hreflang tr etiketi ve sitemap link bağlantısı mevcut.');
    } else {
      console.error('❌ [HATA]: Hreflang veya sitemap link etiketi eksik!');
      failed = true;
    }

    // Statik dosya önbellekleme kontrolü
    const cssRes = await fetchPath('/css/main.css');
    const cacheHeader = cssRes.headers['cache-control'] || '';
    if (cacheHeader.includes('max-age=2592000')) {
      console.log('✅ [BAŞARILI]: Statik dosyalarda 30 günlük agresif Cache-Control önbellekleme aktif.');
    } else {
      console.error(`❌ [HATA]: Cache-Control başlığı eksik veya hatalı: ${cacheHeader}`);
      failed = true;
    }

    console.log('\n--- 5. 404 HATA SAYFASI KONTROLÜ ---');
    const notFoundRes = await fetchPath('/olmayan-bir-sayfa-urlsi');
    if (notFoundRes.statusCode === 404 && notFoundRes.body.includes('404')) {
      console.log('✅ [BAŞARILI]: Olmayan URL için HTTP 404 dönüldü ve özel 404 sayfası render edildi.');
    } else {
      console.error(`❌ [HATA]: 404 testi başarısız. Status: ${notFoundRes.statusCode}`);
      failed = true;
    }

    if (failed) {
      console.error('\n❌ TESTLERDE HATALAR BULUNDU!');
      process.exit(1);
    } else {
      console.log('\n🎉 TÜM TESTLER BAŞARIYLA GEÇTİ! MODÜLER SITEMAP, LLM HARİTASI VE 13 KÖY MAKALESİ EKSİKSİZ HAZIR.');
      process.exit(0);
    }
  } catch (err) {
    console.error('Test sırasında beklenmeyen hata:', err);
    process.exit(1);
  } finally {
    server.close();
  }
});
