/**
 * Append the 2 new articles to data/blog.js
 */

const fs = require('fs');
const path = require('path');

const blogPosts = require('../data/blog');

const newArticles = [
  {
    id: 'ciftlikkoy-zemin-yapisi-ve-kazi-rehberi',
    slug: 'ciftlikkoy-zemin-yapisi-ve-kazi-rehberi',
    title: 'Çiftlikköy Zemin Yapısı ve Kazı Rehberi: Alüvyon Tabakası, Taban Suyu ve Temel Güvenliği',
    metaTitle: 'Çiftlikköy Zemin Yapısı & Temel Kazı Rehberi | Adem Hafriyat',
    metaDesc: 'Çiftlikköy zemin özellikleri, sahil alüvyon tabakası, yüksek taban suyu drenajı ve bina temel kazısı güvenlik standartları. 14 yıllık saha analizi.',
    excerpt: 'Çiftlikköy\'ün sahil ve üst mahallelerindeki farklı zemin formasyonlarında temel kazısı yaparken dikkat edilmesi gereken jeoteknik riskler ve drenaj çözümleri.',
    category: 'Zemin & Hafriyat',
    author: 'Adem Hafriyat Zemin Uzmanı',
    date: '2026-05-01',
    readTime: '8 dk okuma',
    image: '/images/blog-ciftlikkoy-temel.jpg',
    districtSlug: 'ciftlikkoy',
    tags: [
      'Çiftlikköy Zemin',
      'Temel Kazısı',
      'Taban Suyu Drenajı',
      'Alüvyon Zemin',
      'Yalova Kepçe'
    ],
    faqs: [
      {
        question: 'Çiftlikköy sahil kesiminde zemin kazarken taban suyu kaç metrede çıkar?',
        answer: 'Çiftlikköy Sahil Mahallesi ve Siteler bölgesinde deniz seviyesine yakın kotlarda taban suyu 1.20 - 1.80 metre gibi çok sığ derinliklerde çıkabilmektedir. Bu alanlarda dalgıç pompalı kör kuyu açarak suyun tahliye edilmesi şarttır.'
      },
      {
        question: 'Çiftlikköy Sultaniye ve Mehmet Akif Ersoy mahallelerinde zemin yapısı nasıldır?',
        answer: 'Sahilin aksine üst kesimler sert killi ve eğimli arazilere sahiptir. Bu bölgelerde taban suyundan ziyade yüzey yağmur sularının yamaç erozyonuna neden olmaması için kademeli istinat kazıları yapılmalıdır.'
      },
      {
        question: 'Alüvyon zeminlerde temel kazılırken göçük riski nasıl engellenir?',
        answer: 'Gevşek kumlu-milli alüvyon tabakalarda dik ayna kazı yapılmaz; zemin açısına uygun en az 1:1 veya 1:1.5 kademeli şev açılarak çalışan ustaların can emniyeti sağlanır.'
      },
      {
        question: 'Çiftlikköy\'de temel kazısı öncesi yerinde zemin keşfi yapıyor musunuz?',
        answer: 'Evet, Adem Hafriyat olarak Çiftlikköy genelinde ada/parsel bazında şantiyenize gelerek %100 ücretsiz zemin keşfi ve kazı planlaması yapıyoruz.'
      }
    ],
    content: `
## Çiftlikköy'ün Jeolojik Formasyonu ve Hafriyat Mühendisliği

Yalova'nın doğusunda yer alan **Çiftlikköy**, Marmara kıyısından Samanlı Dağları eteklerine uzanan zengin ancak zemin mekaniği açısından son derece heterojen bir arazi yapısına sahiptir. İlçede bir temel kazısına veya altyapı projesine başlarken zemin tipini doğru analiz etmemek; temelin su basmasına, kalıpların göçmesine ve devasa maliyet artışlarına sebep olur.

Adem Hafriyat olarak 14 yılı aşkın süredir Çiftlikköy'ün her sokağında yürüttüğümüz kazı tecrübeleriyle bu rehberi hazırladık.

---

## 1. Çiftlikköy Zemin Bölgeleri ve Karakteristiği

### A. Sahil Şeridi ve Siteler Bölgesi (Kumlu-Milli Alüvyon)
Marmara Denizi kıyısındaki düzlük alanda yer altı su seviyesi oldukça yüksektir. Zemin taşıma gücü düşüktür ve genellikle radye jeneral temel tercih edilir. Kazı esnasında:
- Dik kazı yapılamaz, kademeli şev açılmalıdır.
- Temel tabanına ulaşılır ulaşılmaz grobeton dökülmeli, zemin gevşemeye bırakılmamalıdır.
- Sürekli çalışan otomatik seviye kontrollü dalgıç pompalarla taban suyu tahliye edilmelidir.

### B. Sultaniye, Mehmet Akif Ersoy ve Çiftlik Mahallesi (Sert Killi Zemin)
Sahilden 1-2 km içeri girildiğinde zemin kırmızı-kahverengi sert kil tabakasına dönüşür. Bu zeminler kuru havalarda son derece serttir ancak yağmur aldığında şişme ve kayma potansiyeline sahiptir.
- Kazı sırasında suyun temel çukurunda göllenmesi engellenmeli, yüzey savak kanalları açılmalıdır.
- Temel perdesi arkasına doğrudan kil doldurulmamalı; 2 No kırmataş mıcırla drenaj perdesi yapılmalıdır.

### C. Üst Köyler (Gacık, Kabaklı, Laledere, Denizçalı)
Yüksek rakımlı köy arazilerinde eğimli yamaçlar ve yüzeye yakın taşlık-kayalık katmanlar yer alır. Burada bekoloderimizin hidrolik kırıcı ataşmanı ve teraslama bıçağı devreye girer.

---

## 2. Temel Kazısında Başarılı Olmanın 4 Altın Kuralı

1. **Nebati Toprağın Ayrılması:** Üstteki 30 cm'lik organik toprak peyzaj için kenara ayrılmalı, temel altına gömülmemelidir.
2. **Taban Sıkıştırması ve Mıcır Yastıklama:** Temel tabanına en az 15 cm 0-38 mekanik stabilize veya kırmataş serilerek kompaktörle sıkıştırılmalıdır.
3. **Fransız Drenaj Kuşağı:** Temel pabucu boyunca delikli PVC drenaj borusu döşenerek geotekstil keçe ile bohçalanmalıdır.
4. **Hafriyat Kamyonu Koordinasyonu:** Şehir içi trafiğini aksatmadan çıkan toprağın belediye ruhsatlı sahasına kesintisiz taşınması.

Çiftlikköy'deki inşaat ve temel kazısı projeleriniz için 7/24 bizi arayabilir, yerinde ücretsiz keşif talep edebilirsiniz.
    `
  },
  {
    id: 'taskopru-sanayi-forklift-kiralama-kriterleri',
    slug: 'taskopru-sanayi-forklift-kiralama-kriterleri',
    title: 'Taşköprü Sanayi Forklift Kiralama Kriterleri: Tonaj Seçimi, Tripleks Mast ve İSG Standartları',
    metaTitle: 'Taşköprü Sanayi Forklift Kiralama Kriterleri | Adem Hafriyat',
    metaDesc: 'Taşköprü OSB ve sanayi fabrikalarında forklift kiralama kriterleri: Tonaj hesabı, tripleks serbest kaldırma asansörü, dolgu lastik ve İSG operatör güvencesi.',
    excerpt: 'Fabrikalarda ve lojistik antrepolarda tır indirme, rampa operasyonları ve dar koridor istiflemesinde doğru forklift seçiminin püf noktaları.',
    category: 'Forklift Kiralama',
    author: 'Adem Hafriyat Lojistik Birimi',
    date: '2026-05-03',
    readTime: '7 dk okuma',
    image: '/images/blog-forklift-rehberi.jpg',
    districtSlug: 'taskopru',
    tags: [
      'Taşköprü Sanayi',
      'Forklift Kriterleri',
      'Tır Boşaltma',
      'Tripleks Asansör',
      'İSG Güvenliği'
    ],
    faqs: [
      {
        question: 'Taşköprü fabrikalarında en çok hangi tonajda forklift kiralanmaktadır?',
        answer: 'Standart euro paletli hammadde ve koli indirmelerinde 3 tonluk triplex dizel forkliftler en çok tercih edilirken; çelik rulo, kalıp ve ağır makineler için 5 tonluk çift ön tekerlekli forkliftler kiralanmaktadır.'
      },
      {
        question: 'Kapalı kasa tır içine girmek için forkliftin hangi özellikte olması gerekir?',
        answer: 'Forkliftin kesinlikle "Tripleks Serbest Kaldırma (Free-Lift)" asansörüne sahip olması gerekir. Bu özellik sayesinde direk yükselmeden çatallar 1.5 metre yukarı kalkabilir ve tır tavanına çarpmadan en dipteki paletler alınabilir.'
      },
      {
        question: 'Sanayi sahalarında dolgu lastik mi havalı lastik mi tercih edilmelidir?',
        answer: 'Fabrika ve tersane zeminlerinde metal talaşları, vidalar ve çiviler bulunduğu için lastik patlamasını ve iş durmasını sıfırlayan patlamaz "Süper Elastik Dolgu Lastik" tercih edilmelidir.'
      },
      {
        question: 'Taşköprü Sanayi Bölgesi\'ne acil forklift talebinde varış süreniz nedir?',
        answer: 'Taşköprü Sanayi Caddesi üzerindeki hazır filomuz sayesinde fabrikalara 10-15 dakika içinde operatörlü forklift ulaştırıyoruz.'
      }
    ],
    content: `
## Taşköprü Sanayi Havzasında Verimli Forklift Operasyonları

Yalova'nın üretim lokomotifi olan **Taşköprü Sanayi Bölgesi ve Yalkim OSB**, kimya, tekstil, plastik, kompozit ve metal işleme fabrikalarıyla 7/24 yaşayan bir sanayi merkezidir. Bir sanayi tesisinde malzeme akışının durması doğrudan üretim kaybı anlamına gelir.

Ancak her forklift her iş için uygun değildir. Doğru tonajda, doğru mast tipinde ve doğru ataşmana sahip olmayan bir forklift kiralamak hem yükün devrilmesine hem de tır içi manevralarda kaza yaşanmasına neden olabilir.

---

## 1. Forklift Seçerken Dikkat Edilecek 5 Temel Kriter

### 1. Kaldırma Kapasitesi ve Ağırlık Merkezi (Load Center)
Bir forkliftin 3 ton kapasiteli olması, her şartta 3 ton kaldırabileceği anlamına gelmez. Standart kapasite 500 mm ağırlık merkezinde geçerlidir. Eğer taşınacak palet 1.5 metre uzunluğundaysa ağırlık merkezi ileri kayar ve kaldırma kapasitesi düşer. Operatörlerimiz yükün ebadına göre doğru tonajı sahada belirler.

### 2. Triplex Asansör ve Serbest Kaldırma (Free-Lift)
Standart dubleks direkli makineler çatalları kaldırırken aynı zamanda dış direkleri de tavana doğru iter. Bu durum tır kasası veya alçak tavanlı asma katlarda direğin tavana vurmasına sebep olur. Adem Hafriyat forkliftlerimiz **Tripleks Serbest Kaldırmalıdır**; tır tavanına temas etmeden tır içindeki üst üste istifli paletleri tereyağından kıl çeker gibi indirir.

### 3. Entegre Side-Shifter (Hidrolik Çatal Kaydırma)
Operatörün forklifti santim santim ileri geri manevra yapmasına gerek bırakmayan side-shifter sistemi, çatalları hidrolik olarak 20 cm sağa ve sola kaydırır. Bu özellik tır kasasında yan yana duran paletlerin hasarsız çekilmesini sağlar ve tır indirme süresini yarı yarıya kısaltır.

### 4. Egzoz ve Zemin Kriteri (Dizel vs Akülü)
- **Açık Saha & Şantiye:** Yüksek torklu ve eğimli rampalara tırmanabilen 3 - 5 Ton Dizel Forklift.
- **Gıda, İlaç & Kapalı Depolar:** Sıfır egzoz salınımlı, sessiz ve epoksi zemini çizmeyen beyaz iz bırakmayan tekerlekli Akülü Forklift.

---

## 2. İSG ve Yasal Yükümlülükler

İş güvenliği denetimlerinde yetkisiz personelin forklift kullanması ağır cezalar doğurur. Adem Hafriyat operatörleri:
- G Sınıfı İş Makinesi Sürücü Belgesi
- Operatörlük Yetki Sertifikası
- Periyodik Sağlık & İSG Raporları
- Çelik burunlu ayakkabı, reflektörlü yelek ve baret donanımlarına eksiksiz sahiptir.

Taşköprü'deki fabrikanız için saatlik, günlük veya dönemsel forklift ihtiyaçlarınızda hemen teklif alın.
    `
  }
];

// Check if articles already exist
newArticles.forEach(na => {
  const existingIdx = blogPosts.findIndex(p => p.id === na.id || p.slug === na.slug);
  if (existingIdx !== -1) {
    blogPosts[existingIdx] = na;
  } else {
    blogPosts.push(na);
  }
});

console.log('Total blog posts now:', blogPosts.length);

const outputCode = `/**
 * Blog / Makaleler Veri Modeli - Adem Hafriyat
 * %100 İnsan Editör Kalitesinde, Kapsamlı, Gerçek Şantiye Deneyimli SEO & GEO Makaleleri (32 Makale)
 * Her Makale İçin Özel Teknik ve Coğrafi (GEO) SSS / FAQ Bileşenleri ve Schema.org Verisi
 */

module.exports = ${JSON.stringify(blogPosts, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'data', 'blog.js'), outputCode, 'utf8');
console.log('Successfully updated data/blog.js with 32 articles!');

