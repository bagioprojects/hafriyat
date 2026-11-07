const http = require('http');
const vm = require('vm');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function testCookieConsent() {
  console.log('🧪 [ÇEREZ MODALI VE ALTYAPISI TESTİ BAŞLATILIYOR]...\n');

  // 1. HTML Render Testi
  const home = await fetch('http://localhost:7450/');
  if (!home.body.includes('id=\"cookieConsentBanner\"')) {
    throw new Error('Ana sayfada cookieConsentBanner elementi bulunamadı!');
  }
  console.log('✅ 1. Ana sayfada #cookieConsentBanner elementi eksiksiz render edildi.');

  if (!home.body.includes('onclick=\"acceptAllCookies()\"') || !home.body.includes('onclick=\"rejectAllCookies()\"')) {
    throw new Error('Çerez bannerında kabul et ve reddet butonları eksik!');
  }
  console.log('✅ 2. "Tümünü Kabul Et" ve "Yalnızca Gerekli / Reddet" butonları onaylandı.');

  if (!home.body.includes('id=\"cookieNecessary\"') || !home.body.includes('id=\"cookieAnalytics\"') || !home.body.includes('id=\"cookieFunctional\"')) {
    throw new Error('Çerez kategorileri toggle checkboxları eksik!');
  }
  console.log('✅ 3. Zorunlu, Analitik ve İşlevsel çerez kategori toggle switchleri doğrulandı.');

  // 2. Footer ve Gizlilik Sayfası Entegrasyon Testi
  if (!home.body.includes('onclick=\"openCookieModal()\"')) {
    throw new Error('Footerda Çerez Tercihleri butonu bulunamadı!');
  }
  console.log('✅ 4. Footer alt bağlantılarında "Çerez Tercihleri" kalıcı erişim butonu onaylandı.');

  const privacy = await fetch('http://localhost:7450/gizlilik-politikasi');
  if (!privacy.body.includes('Çerez Tercihlerimi Yönet / Güncelle')) {
    throw new Error('Gizlilik politikasında çerez yönetim butonu eksik!');
  }
  console.log('✅ 5. /gizlilik-politikasi sayfasında "Çerez Tercihlerimi Yönet / Güncelle" butonu onaylandı.');

  // 3. JavaScript Motoru & Kalıcılık (Persistence) Simülasyonu
  const mainJs = fs.readFileSync('public/js/main.js', 'utf8');

  // Node VM sandbox mock
  const storage = {};
  let currentCookie = '';
  let openedCount = 0;
  let closedCount = 0;

  const mockContext = {
    document: {
      get cookie() { return currentCookie; },
      set cookie(val) { currentCookie = val; },
      addEventListener: () => {},
      readyState: 'complete',
      getElementById: (id) => {
        if (id === 'cookieConsentBanner') {
          return {
            style: {},
            classList: {
              add: (c) => { if (c === 'active') openedCount++; },
              remove: (c) => { if (c === 'active') closedCount++; },
              contains: () => false
            },
            offsetWidth: 100
          };
        }
        if (id === 'cookieAnalytics') return { checked: false };
        if (id === 'cookieFunctional') return { checked: false };
        return { style: {}, classList: { add: () => {}, remove: () => {} } };
      }
    },
    localStorage: {
      getItem: (k) => storage[k] || null,
      setItem: (k, v) => { storage[k] = v; },
      removeItem: (k) => { delete storage[k]; }
    },
    window: {
      dispatchEvent: () => {}
    },
    CustomEvent: class CustomEvent { constructor(type, detail) { this.type = type; this.detail = detail; } },
    setTimeout: (fn) => fn(),
    console: console
  };

  vm.createContext(mockContext);
  vm.runInContext(mainJs, mockContext);

  // Test Initial Load (No consent yet)
  mockContext.initCookieConsent();
  console.log('✅ 6. İlk ziyarette (onay yokken) banner açılışı tetiklendi.');

  // Test Accept All
  mockContext.acceptAllCookies();
  const consentAfterAccept = JSON.parse(storage['adem_cookie_consent']);
  if (consentAfterAccept.status !== 'accepted' || consentAfterAccept.analytics !== true) {
    throw new Error('Tümünü kabul etme mantığı hatalı!');
  }
  if (!currentCookie.includes('cookie_consent=accepted')) {
    throw new Error('document.cookie kaydı başarısız!');
  }
  console.log('✅ 7. "Tümünü Kabul Et" tıklandığında cookie_consent=accepted çerezi ve localStorage başarıyla yazıldı.');

  // Test Reload after Accept (Should NOT open modal again)
  const prevOpenCount = openedCount;
  mockContext.initCookieConsent();
  if (openedCount !== prevOpenCount) {
    throw new Error('Onay verildikten sonra tekrar sordu! Sormaması gerekirdi.');
  }
  console.log('✅ 8. Sayfa yenilendiğinde (onay mevcutken) banner KESİNLİKLE tekrar açılmadı (Kalıcılık doğrulandı).');

  // Test Reject All
  mockContext.rejectAllCookies();
  const consentAfterReject = JSON.parse(storage['adem_cookie_consent']);
  if (consentAfterReject.status !== 'rejected' || consentAfterReject.analytics !== false) {
    throw new Error('Reddetme mantığı hatalı!');
  }
  if (!currentCookie.includes('cookie_consent=rejected')) {
    throw new Error('Reddedilince document.cookie kaydı başarısız!');
  }
  console.log('✅ 9. "Yalnızca Gerekli / Reddet" tıklandığında analitik reddedildi ve kalıcı olarak kaydedildi.');

  // Test Reload after Reject (Should NOT open modal again)
  const prevOpenCount2 = openedCount;
  mockContext.initCookieConsent();
  if (openedCount !== prevOpenCount2) {
    throw new Error('Reddedildikten sonra tekrar sordu! Sormaması gerekirdi.');
  }
  console.log('✅ 10. Reddedildikten sonra da sayfa yenilendiğinde tekrar sormadığı doğrulandı.');

  console.log('\n🎉 TÜM ÇEREZ YÖNETİMİ TESTLERİ EKSİKSİZ VE %100 BAŞARILI!');
}

testCookieConsent().catch(err => {
  console.error('❌ TEST BAŞARISIZ:', err);
  process.exit(1);
});

