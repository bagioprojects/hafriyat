/**
 * Adem Hafriyat - Otomatik Doğrulama ve Entegrasyon Testi
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
      { path: '/makinelerimiz', title: 'Makine Parkuru', expectText: 'JCB' },
      { path: '/makinelerimiz/jcb-3cx-bekoloder', title: 'JCB Makine Detay', expectText: 'JCB 3CX' },
      { path: '/makaleler', title: 'Makaleler Listesi', expectText: 'Rehber' },
      { path: '/makaleler/yalova-kepce-kiralama-rehberi', title: 'Makale Detay', expectText: 'Bekoloder mi Mini Ekskavatör mü' },
      { path: '/hakkimizda', title: 'Hakkımızda', expectText: 'Adem Hafriyat' },
      { path: '/iletisim', title: 'İletişim', expectText: '0532 555 77 16' },
      { path: '/sitemap.xml', title: 'XML Sitemap', expectText: '<urlset' },
      { path: '/robots.txt', title: 'Robots.txt', expectText: 'Sitemap:' }
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

    console.log('\n--- 2. SCHEMA.ORG & SEO KONTROLLERİ ---');
    const homeRes = await fetchPath('/');
    if (homeRes.body.includes('application/ld+json') && homeRes.body.includes('HomeAndConstructionBusiness')) {
      console.log('✅ [BAŞARILI]: Ana sayfada LocalBusiness Schema.org JSON-LD mevcut.');
    } else {
      console.error('❌ [HATA]: Ana sayfada Schema.org JSON-LD bulunamadı!');
      failed = true;
    }

    const ciftlikkoyKanalRes = await fetchPath('/bolgeler/ciftlikkoy/kanal-kazma');
    if (ciftlikkoyKanalRes.body.includes('breadcrumb-nav') && ciftlikkoyKanalRes.body.includes('Çiftlikköy')) {
      console.log('✅ [BAŞARILI]: Çapraz SEO sayfasında dinamik Breadcrumb ve ilçe parametreleri mevcut.');
    } else {
      console.error('❌ [HATA]: Çapraz SEO sayfasında breadcrumb hatası!');
      failed = true;
    }

    console.log('\n--- 3. 404 HATA SAYFASI KONTROLÜ ---');
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
      console.log('\n🎉 TÜM TESTLER BAŞARIYLA GEÇTİ! SİSTEM %100 ÇALIŞIYOR VE HAZIR.');
      process.exit(0);
    }
  } catch (err) {
    console.error('Test sırasında beklenmeyen hata:', err);
    process.exit(1);
  } finally {
    server.close();
  }
});
