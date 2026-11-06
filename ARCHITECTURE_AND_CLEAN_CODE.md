# Adem Hafriyat — MVC Mimarisi, Clean Code Standartları ve Bileşen Kılavuzu
**Web Platformu:** [yalovakepcehafriyat.com.tr](https://yalovakepcehafriyat.com.tr)  
**Firma:** Adem Hafriyat — Yalova Kepçe ve Forklift Kiralama  
**Tarih:** 2026

---

## 1. Mimari Felsefe ve Clean Code Kuralları

Bu proje, Yalova'nın tüm ilçelerinde (başta Çiftlikköy, Taşköprü, Yalova Merkez ve Altınova olmak üzere) kepçe kiralama, forklift kiralama ve ağır hafriyat hizmetlerinde arama motorlarında 1. sırayı hedefleyen, yüksek performanslı ve modüler bir **MVC (Model-View-Controller)** mimarisine sahiptir.

### 1.1. Temel Clean Code Prensipleri
1. **DRY (Don't Repeat Yourself - Kendini Tekrar Etme):**
   - Sayfalarda başlık, meta etiketler, navigasyon, iletişim kutusu, SSS akordeonu, ilçe-mahalle listeleri veya CTA şeritleri ASLA kopyala-yapıştır yapılmaz.
   - Tüm görsel ve fonksiyonel bloklar `views/components/` dizininde parametrik EJS partial'ları olarak kodlanır.
2. **KISS (Keep It Simple, Stupid - Yalın ve Etkili Tut):**
   - Gereksiz harici kütüphanelerden (ağır client-side frameworkler, karmaşık build pipeline'ları) kaçınılır.
   - Doğrudan Express.js + Server-Side Rendered (SSR) EJS kullanılarak Googlebot ve gerçek kullanıcılar için **0 milisaniye JS bekleme süresi** ve tam taranabilirlik sağlanır.
3. **SoC (Separation of Concerns - Sorumlulukların Ayrılığı):**
   - **Model / Data (`data/`):** Yalnızca saf veri, coğrafi yapılar, makine teknik detayları ve insan editör kalitesinde SEO metinlerini barındırır.
   - **Controller (`src/controllers/`):** İstekleri karşılar, veriyi süzer, dinamik SEO meta & schema verilerini üretir ve View'a aktarır.
   - **View (`views/`):** Yalnızca gelen veriyi görselleştiren şablonlardan ve bileşenlerden oluşur. İş mantığı içermez.
   - **Helpers (`src/helpers/`):** Schema.org JSON-LD üreticileri, breadcrumb formatlayıcıları ve URL slug dönüştürücüleri burada toplanır.
4. **Semantic & Accessible HTML (Semantik HTML):**
   - Her sayfada tam olarak **1 adet `<h1>`** etiketi bulunur ve o sayfanın anahtar kelime odağını taşır.
   - `<h2>`, `<h3>` başlık hiyerarşisi bozulmaz.
   - Tüm görsellerde anlamlı `alt` etiketleri, `width` ve `height` tanımları yer alır.
5. **Human-First SEO Copywriting (Gerçek İnsan Editör Kalitesi):**
   - Mekanik, yapay zeka tekrarı olan jenerik kalıplar kullanılmaz.
   - Yalova'nın zemin koşulları (kumlu, killi, sahil dolgu, kayalık dağ etekleri), koruge boru eğimleri, bekoloder kazıcı derinlikleri, forklift tonajları ve iş güvenliği terimleri gerçek saha diliyle yazılır.

---

## 2. Tasarım Sistemi, Renk Paleti ve Tipografi

Sektörün güvenilirlik, güç, hız ve acil müdahale doğasını yansıtan endüstriyel **Sarı & Siyah** renk paleti ve modern tipografi skalası tanımlanmıştır.

### 2.1. Renk Tokenları (CSS Custom Properties)
```css
:root {
  /* Birincil Marka Rengi - CAT / Ağır Sanayi Sarısı */
  --color-primary: #f59e0b;
  --color-primary-hover: #d97706;
  --color-primary-light: #fef3c7;
  --color-primary-dark: #b45309;

  /* İkincil Renk - Ağır Sanayi Karbon Siyahı */
  --color-dark: #0b0f19;
  --color-dark-surface: #111827;
  --color-dark-card: #1e293b;
  --color-dark-border: #334155;

  /* Destekleyici Renkler */
  --color-text-main: #0f172a;
  --color-text-muted: #64748b;
  --color-text-light: #94a3b8;
  --color-bg-light: #f8fafc;
  --color-white: #ffffff;
  --color-accent-red: #ef4444; /* Acil arama & uyarı rozetleri */
  --color-accent-green: #22c55e; /* WhatsApp butonu */
}
```

### 2.2. Tipografi Standartları
- **Font Ailesi (Başlıklar & İlanlar):** `'Barlow', 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif`
  - Tok, endüstriyel, güçlü ve güven aşılayan şantiye tipografisi.
- **Font Ailesi (Gövde Metinleri & Makaleler):** `'Inter', system-ui, sans-serif`
  - Yüksek x-yüksekliği, üstün harf aralığı ile uzun makalelerde kusursuz okunabilirlik.
- **Modüler Tipografi Skalası:**
  - `Hero H1`: `font-size: 2.75rem (44px)` | `line-height: 1.15` | `font-weight: 800`
  - `Bölüm H2`: `font-size: 2.0rem (32px)` | `line-height: 1.25` | `font-weight: 700`
  - `Kart / Alt H3`: `font-size: 1.35rem (22px)` | `line-height: 1.3` | `font-weight: 600`
  - `Gövde (Body)`: `font-size: 1.0625rem (17px)` | `line-height: 1.7` | `font-weight: 400`
  - `Küçük / Rozet`: `font-size: 0.8125rem (13px)` | `font-weight: 600` | `letter-spacing: 0.05em`

---

## 3. Yeniden Kullanılabilir (Reusable) MVC Tasarım Bileşenleri

Her sayfada tekrar kod yazılmasını önlemek amacıyla aşağıdaki bileşenler parametrik EJS parçaları olarak geliştirilmiştir:

| Bileşen Yolu | Çağrılış Şekli | Görevi ve Parametreleri |
|---|---|---|
| `components/seo/head.ejs` | `<%- include('../components/seo/head', { seo }) %>` | Başlık, meta description, canonical, robots, favicon ve OG kartları |
| `components/seo/schema.ejs` | `<%- include('../components/seo/schema', { schemas }) %>` | LocalBusiness, Service, BreadcrumbList, FAQPage JSON-LD yapısal verileri |
| `components/seo/breadcrumbs.ejs` | `<%- include('../components/seo/breadcrumbs', { items }) %>` | Hiyerarşik linkleme ve breadcrumb işaretlemesi |
| `components/common/header.ejs` | `<%- include('../components/common/header', { activeNav }) %>` | Logo, navigasyon, 7/24 Acil Çağrı & WhatsApp hızlı aksiyonları |
| `components/common/footer.ejs` | `<%- include('../components/common/footer') %>` | SEO link ağı, ilçe-mahalle listesi, kurumsal iletişim, harita |
| `components/common/pageHero.ejs` | `<%- include('../components/common/pageHero', { title, subtitle, badge }) %>` | Sayfa başlığı, özet açıklama ve acil buton alanı |
| `components/common/ctaBanner.ejs` | `<%- include('../components/common/ctaBanner', { title, phone }) %>` | Sayfa sonu "Hemen Ara / Teklif Al" dönüşüm şeridi |
| `components/common/whatsappFloat.ejs` | `<%- include('../components/common/whatsappFloat') %>` | Sayfanın sağ altında yapışkan canlı WhatsApp & Arama butonu |
| `components/services/serviceCard.ejs` | `<%- include('../components/services/serviceCard', { service }) %>` | Hizmet görseli, başlık, özet, avantajlar ve detay linki |
| `components/services/serviceGrid.ejs` | `<%- include('../components/services/serviceGrid', { services }) %>` | 10 Kepçe + 3 Forklift hizmetini responsive gridde listeleme |
| `components/geo/districtSelector.ejs` | `<%- include('../components/geo/districtSelector', { districts }) %>` | Tüm Yalova ilçeleri arasında anında geçiş menüsü |
| `components/geo/neighborhoodGrid.ejs` | `<%- include('../components/geo/neighborhoodGrid', { district }) %>` | Çiftlikköy, Taşköprü ve Merkez mahalle/köy linkleme ağı |
| `components/machinery/machineCard.ejs`| `<%- include('../components/machinery/machineCard', { machine }) %>` | Kepçe, Bekoloder ve Forklift teknik özellikleri ve kiralama kartı |
| `components/content/faqAccordion.ejs` | `<%- include('../components/content/faqAccordion', { faqs }) %>` | Soru-cevap akordeonu ve Google FAQ zengin sonucu |
| `components/content/blogCard.ejs` | `<%- include('../components/content/blogCard', { post }) %>` | SEO makale kartı (yazar, süre, özet, link) |

---

## 4. %100 SEO & GEO Kapsama Matrisi

Sitenin her sayfasında aşağıdaki yerel coğrafi derinlik sağlanacaktır:
- **Çiftlikköy:** Çiftlikköy Merkez, Sahil Mahallesi, Siteler Mahallesi, Mehmet Akif Ersoy, Sultaniye; Köyler: Kabaklı, Çukurköy, Dereköy, Gacık, Laledere, İlyasköy, Denizçalı.
- **Taşköprü & Sanayi Bölgesi:** Taşköprü Merkez, Taşköprü Sanayi Sitesi, Yalkim OSB çevresi, Kılıç Köyü, Çukurköy kavşağı ve çevre üretim tesisleri (özellikle Ağır Yük Forklift ve Drenaj Kepçe odaklı).
- **Yalova Merkez:** Bahçelievler, Gaziosmanpaşa, İsmetpaşa, Rüstempaşa, Süleymanbey, Adnan Menderes, Bağlarbaşı, Kazım Karabekir, Paşakent, Seyrantepe, Fevziçakmak, Samanlı, Kadıköy, Hacımehmet, Safran.
- **Altınova:** Tersaneler Bölgesi, Subaşı, Kaytazdere, Tavşanlı, Fevziye (Özellikle operatörlü ve operatörsüz forklift kiralama için 1 numaralı hedef bölge).
- **Çınarcık, Armutlu, Termal.**

---
*Bu mimari ve clean code kuralları tüm proje dosyalarında istisnasız uygulanmaktadır.*

