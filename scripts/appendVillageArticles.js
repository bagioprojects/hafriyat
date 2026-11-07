/**
 * 13 Köy Makalesini data/blog.js İçerisine Ekleyen Güncelleyici
 * %100 İnsan Editör Kalitesi, Gerçek Şantiye Tecrübesi, %100 GEO ve SEO
 */

const fs = require('fs');
const path = require('path');

const blogFilePath = path.join(__dirname, '..', 'data', 'blog.js');
let blogPosts = require(blogFilePath);

const villageArticles = [
  {
    id: 'kabakli-koyu-kepce-kiralama-arazi-duzleme',
    slug: 'kabakli-koyu-kepce-kiralama-arazi-duzleme',
    title: 'Kabaklı Köyü Kepçe Kiralama & Arazi Düzleme: Tarla Yolu Açma ve Taş Kırma Kılavuzu',
    metaTitle: 'Kabaklı Köyü Kepçe Kiralama & Arazi Düzleme | Adem Hafriyat',
    metaDesc: 'Çiftlikköy Kabaklı Köyü tarla tesviyesi, taşlık arazide kırıcı kepçe, bağ yolu açma ve mıcır dolgu. 15 dakikada adreste! Hemen arayın: 0532 720 20 10.',
    excerpt: 'Kabaklı Köyü\'nün eğimli ve taşlık arazilerinde tarla yolu açma, hidrolik kırıcı ataşmanlı JCB ile kaya kırma, parsel tesviyesi ve dolgu mıcır serimi.',
    category: 'Köy & Arazi Hafriyatı',
    author: 'Adem Hafriyat Saha Ekibi',
    date: '2026-04-12',
    readTime: '8 dk okuma',
    image: '/images/blog-arazi-duzleme.jpg',
    tags: ['Kabaklı Köyü Kepçe', 'Çiftlikköy Hafriyat', 'Arazi Düzleme', 'Kırıcı Kepçe', 'Tarla Yolu'],
    districtSlug: 'ciftlikkoy',
    villageSlug: 'kabakli-koyu',
    content: `
## Kabaklı Köyü Zemin Yapısı ve Hafriyat İhtiyaçları

Çiftlikköy'ün iç kesimlerinde, Samanlı Dağları eteklerine doğru yükselen **Kabaklı Köyü**, zeytinlikleri, ceviz bahçeleri ve son yıllarda hızla artan hobi bahçesi projeleriyle öne çıkar. Ancak Kabaklı arazilerinde çalışacak bir iş makinesi operatörünün bölgenin coğrafyasını ve zemin karakteristiğini çok iyi bilmesi şarttır.

Kabaklı'nın toprak yapısı yüzeyde 30-50 cm derinliğinde nebati toprak, hemen altında ise **kalkerli, sert kireçtaşlı ve kayalık bir tabakadan** oluşur. Eğimli parsel yapısı nedeniyle standart traktörlerin veya hafif makinelerin düzleme yapması mümkün değildir. Burada hem güçlü bir kazıcıya hem de sert kayaları parçalayabilecek **hidrolik kırıcı ataşmanına** ihtiyaç duyulur.

Adem Hafriyat olarak Taşköprü ve Çiftlikköy merkez garajımızdan Kabaklı Köyü'ne **15 dakikada** kendi yürür lastik tekerlekli JCB 3CX ve çekici üstünde paletli mini ekskavatörlerimizle ulaşıyoruz.

---

## Kabaklı Köyü'nde En Sık Gerçekleştirdiğimiz Çalışmalar

### 1. Eğimli Arazide Kademeli Tesviye (Teraslama)
Kabaklı'daki tarlaların ve meyve bahçelerinin büyük kısmı eğimli yamaçlardadır. Tek parça düzleme yapmak erozyon riskini artırır ve yağmurda toprağın akmasına sebep olur. JCB bekoloderimizin arka kazıcısıyla önce kademeler (sekiler) oluşturuyor, ön dozer bıçağıyla toprağı sıkıştırarak meyve fidanı dikimine veya prefabrik ev montajına hazır düz zeminler açıyoruz.

### 2. Taşlık Zeminde Hidrolik Kırıcı ile Kaya Kırma
Kazı esnasında yüzeye çıkan büyük monoblok kalker kayalar tarla sürümünü imkansız hale getirir. Arka kazıcı kovasını 2 dakikada hidrolik kırıcı tabancasıyla değiştirerek tonlarca ağırlıktaki kayaları şantiye yerinde 10-20 cm ebatlarında kırıyor, çıkan taşları parsel sınırında taş istinat duvarı dolgusu olarak değerlendiriyoruz.

### 3. Tarla ve Bağ Yolu Açma, Mıcır Serme
Kış aylarında Kabaklı köy içi arazi yolları çamur deryasına dönebilir. Bekoloder kepçemizle yol güzergahındaki çamurlu nebati tabakayı sıyırıp kenara alıyor, altına tüvenan kaba taş dolgu, üstüne ise 0-38 mekanik kırmataş mıcır sererek silindir veya kepçe tekerleğiyle kilitliyoruz. Böylece binek araçların dahi rahatça girebileceği 4 mevsim sağlam yollar üretiyoruz.

### 4. Parsel Çevresi Tel Örgü Hatıl Betonu Hendeği
Hobi bahçelerinin sınırlarını belirlemek ve yabani hayvan girişini engellemek için parsel çevresine 40 cm dar hendek kovamızla jilet gibi düzgün çit temeli kanalı açıyoruz.

---

## Kabaklı İçin Makine Seçim Kılavuzu

| İş Türü | Önerilen İş Makinesi | Neden Bu Makine? |
|---|---|---|
| **Tarla Düzleme & Yol Açma** | JCB 3CX Bekoloder | 1.2 m³ dozer bıçağıyla hızlı tesviye ve kaba malzeme taşıma. |
| **Kaya ve Taş Kırma** | Kırıcılı JCB Bekoloder | Yüksek darbe enerjisiyle sert kalker kayaları hızla parçalar. |
| **Ağaç Arası Dar Kazı** | Cat 303.5 Mini Ekskavatör | Kauçuk paletiyle zeytin ağacı köklerine zarar vermez, dar aralardan geçer. |

Kabaklı Köyü'ndeki araziniz için aynı gün içinde **yerinde keşif ve net fiyat teklifi** talep edebilir, net süre ve fiyat teklifi alabilirsiniz.
    `
  },
  {
    id: 'cukurkoy-su-kuyusu-kazma-ve-bahce-drenaji',
    slug: 'cukurkoy-su-kuyusu-kazma-ve-bahce-drenaji',
    title: 'Çukurköy Su Kuyusu Açma ve Bahçe Drenajı: Keson Kuyu & Taban Suyu Tahliyesi',
    metaTitle: 'Çukurköy Su Kuyusu Açma & Bahçe Drenajı | Adem Hafriyat',
    metaDesc: 'Çiftlikköy Çukurköy keson su kuyusu açma, bahçe taban suyu drenajı, kuyu büzü indirme ve kanal kazma hizmetleri. 15 dk intikal: 0532 720 20 10.',
    excerpt: 'Çukurköy\'ün vadi tabanındaki yüksek su tablası, tarımsal keson su kuyusu derin kazısı, meyve bahçelerinde kök çürümesini önleyen drenaj kanalları.',
    category: 'Kuyu & Drenaj',
    author: 'Adem Hafriyat Saha Ekibi',
    date: '2026-04-12',
    readTime: '8 dk okuma',
    image: '/images/blog-su-kuyusu.jpg',
    tags: ['Çukurköy Kepçe', 'Su Kuyusu', 'Keson Kuyu', 'Bahçe Drenajı', 'Çiftlikköy'],
    districtSlug: 'ciftlikkoy',
    villageSlug: 'cukurkoy',
    content: `
## Çukurköy Vadi Tabanı Zemin Analizi ve Su Yönetimi

Çiftlikköy ilçesine bağlı **Çukurköy**, adından da anlaşılacağı üzere vadi çanağında yer alan, etrafı tepelerle çevrili zengin taban suyu rezervlerine sahip bir tarım merkezidir. Bölgedeki araziler son derece verimli alüvyon ve killi toprak katmanlarına sahiptir; ancak bu jeolojik yapı iki kritik konuyu zorunlu kılar: **Yaz kuraklığı için verimli su kuyusu açımı** ve **kış aylarında meyve köklerinin çürümesini engelleyecek taban suyu drenajı**.

Çukurköy'de taban suyu seviyesi kışın yer yüzeyine 1 metre kadar yaklaşırken, yazın 4-5 metre derinliğe çekilir. Bu sebeple derinliği doğru ayarlanmamış amatör kuyular temmuz-ağustos aylarında kurur.

---

## Çukurköy'de Sunduğumuz Uzman Kepçe Çözümleri

### 1. Keson Su Kuyusu Kazımı ve Beton Büz Montajı
Sondaj kuyularına kıyasla Çukurköy'de geniş çaplı beton keson kuyu çok daha verimlidir. Teleskopik arka kolu 5.40 metreye uzanan JCB 3CX iş makinemizle:
- Arazinin su toplayan damar hattında 2.5 - 3 metre çapında dairesel kazı yapıyoruz.
- Su damarına ulaşıldığında kuyu tabanına 50 cm yıkanmış 2 numara kuyu filtre mıcırı seriyoruz.
- 100 cm veya 120 cm çapındaki prefabrik betonarme kuyu büzlerini kepçemizin bomuna özel zincir askı sistemiyle bağlayarak milimetrik olarak kuyuya indiriyoruz.
- Büzlerin etrafını gözenekli dere kırmataşıyla besleyerek süzülerek gelen berrak ve tortusuz su rezervi elde ediyoruz.

### 2. Bahçe Kök Koruma ve Drenaj Kanalları
Kivi, elma ve ceviz bahçelerinde uzun süre göllenen taban suyu saçak köklerin oksijensiz kalarak mantar kapmasına ve kurumasına sebep olur. Dar hendek kovamızla bahçe sınırlarına ve ağaç sıraları arasına balıksırtı eğimli drenaj kanalları açıyoruz. Açılan kanallara geotekstil keçe kaplı delikli koruge borular döşenip üstü mıcırla kapatıldığında bahçe 12 ay boyunca kuru ve sağlıklı kalır.

### 3. Fosseptik ve Altyapı Çukurları
Köy içi kanalizasyon hattının ulaşmadığı yeni yapılaşmalarda sızdırmaz betonarme fosseptik tankı için gerekli derin temel çukurlarını zemin kaymasına karşı kademeli güvenlik şevi vererek kazarız.

---

## Çukurköy Zemininde Neden Adem Hafriyat?
- **Batmaz Çözümler:** Çukurköy'ün sulak arazilerinde tekerlekli makinelerin batmasını engelleyen geniş taban basma ayakları ve deneyimli operatör refleksi.
- **Garajdan Çukurköy'e 15 Dakika:** Taşköprü garajımız Çukurköy yol ayrımına çok yakın olduğu için hızlı intikal sağlıyor, mesafeye ve iş kapsamına göre en makul ve şeffaf yakıt/nakliye planlamasıyla ekonomik çalışma sunuyoruz.
    `
  },
  {
    id: 'derekoy-dere-islahi-ve-kanal-kazma-rehberi',
    slug: 'derekoy-dere-islahi-ve-kanal-kazma-rehberi',
    title: 'Dereköy Dere Yatağı Islahı ve Kanal Kazma: Taşkın Önleme & Mıcır Dolgu',
    metaTitle: 'Dereköy Dere Islahı & Kanal Kazma | Adem Hafriyat',
    metaDesc: 'Dereköy dere yatağı ıslahı, taşkın seti oluşturma, menfez büz kazısı ve tarla yolu mıcır dolgu. Çiftlikköy acil kepçe: 0532 720 20 10.',
    excerpt: 'Dereköy mevkiinde dere kolları rüsubat temizliği, su baskınlarına karşı taş tahkimat hendekleri, koruge boru geçiş menfezleri ve parsel dolguları.',
    category: 'Altyapı & Drenaj',
    author: 'Adem Hafriyat Saha Ekibi',
    date: '2026-04-12',
    readTime: '8 dk okuma',
    image: '/images/blog-yagmur-suyu.jpg',
    tags: ['Dereköy Kepçe', 'Dere Islahı', 'Kanal Kazma', 'Taşkın Önleme', 'Çiftlikköy'],
    districtSlug: 'ciftlikkoy',
    villageSlug: 'derekoy',
    content: `
## Dereköy Havzası ve Taşkın Riskine Karşı Hafriyat Çözümleri

Çiftlikköy Dereköy sınırları, kış aylarında Samanlı eteklerinden gelen yoğun yağmur sularının denize doğru aktığı doğal dere yataklarının kesişim noktasındadır. Bu coğrafi konum nedeniyle Dereköy'deki araziler, tarlalar ve müstakil yerleşimler **mevsimsel dere taşkınları ve balçık birikintileriyle** sık sık karşı karşıya kalır.

Dere yataklarının ağaç dalları, moloz ve dip çamuruyla tıkanması; ilk sağanakta suyun komşu bahçelere ve ev subasmanlarına taşmasına neden olur. Adem Hafriyat olarak Dereköy'de dere yatağı ıslahı, su akış kanalları ve koruge menfez geçişlerinde bölgenin en tecrübeli operatör filosuyla hizmet veriyoruz.

---

## Dereköy Saha Uygulamalarımız

### 1. Dere Yatağı Temizliği ve Rüsubat Tahliyesi
4x4 JCB Kazıcı Yükleyicimizin geniş çamur kovasıyla dere tabanında biriken alüvyon balçığı temizliyor, dere kesitini genişleterek suyun debisini rahatlatıyoruz. Çıkarılan geçirimsiz killi balçık araziden tahliye edilir veya güvenlik seddesi yapımında kullanılır.

### 2. Taş Tahkimat ve İstinat Arkası Dolgu
Su akıntısının dere kıyısını oymasını (şev kayması) engellemek için kıyı boyunca kademeli şev kazısı yapıyor, ardından ağır taş blokların dizilebilmesi için sağlam temel hendekleri hazırlıyoruz.

### 3. Tarla ve Parsel Girişlerine Koruge Boru Menfezi
Yol ile parsel arasından geçen açık arklar ve dere kolları araç geçişini engeller. Bekoloderimizle hendek tabanını temizleyip eğimini verdikten sonra 400'lük veya 600'lük çift cidarlı SN4 koruge boruları yerleştiriyor, üzerini kaba dolgu taşı ve 0-38 mekanik mıcırla kaplayarak tonajlı kamyonların dahi ezemeyeceği sağlam menfez geçişleri yapıyoruz.

### 4. Çamurlu Arazi Yollarına Mıcır Yayma
Dereköy'ün ağır killi toprağı yağış aldığında araçların batmasına neden olur. Ön dozer bıçağımızla çamur tabakasını kazıyıp 15-20 cm kalınlığında kırmataş mıcır sererek zemin taşıma gücünü kalıcı olarak yükseltiyoruz.

---

## Acil Su Baskını ve Sel Müdahalesi
Dereköy ve civarında ani yağışlarda su baskını riski doğduğunda, 7/24 nöbetçi kepçe ekibimizle **15 dakika içinde** adrese ulaşıp acil tahliye kanalları açarak mal kayıplarının önüne geçiyoruz.
    `
  },
  {
    id: 'gacik-koyu-zeytinlik-temizleme-ve-villa-temel-kazisi',
    slug: 'gacik-koyu-zeytinlik-temizleme-ve-villa-temel-kazisi',
    title: 'Gacık Köyü Zeytinlik Temizleme, Kök Sökümü ve Villa Temel Kazısı',
    metaTitle: 'Gacık Köyü Zeytinlik Temizleme & Villa Temeli | Adem Hafriyat',
    metaDesc: 'Çiftlikköy Gacık Köyü zeytinlik temizleme, ağaç kök sökümü, dik yamaçta seki tesviyesi ve villa temel kazısı. 15 dk intikal: 0532 720 20 10.',
    excerpt: 'Gacık Köyü yamaçlarında kurumuş zeytin ağacı kök sökümü, kademeli taş istinat seki yapımı, lüks villa temel hafriyatı ve fosseptik kuyusu açımı.',
    category: 'Villa & Temel Kazısı',
    author: 'Adem Hafriyat Saha Ekibi',
    date: '2026-04-12',
    readTime: '8 dk okuma',
    image: '/images/blog-temel-kazisi.jpg',
    tags: ['Gacık Köyü Kepçe', 'Zeytinlik Temizleme', 'Kök Sökümü', 'Villa Temeli', 'Çiftlikköy'],
    districtSlug: 'ciftlikkoy',
    villageSlug: 'gacik-koyu',
    content: `
## Gacık Köyü'nün Tarihi Zeytinlikleri ve Yeni Nesil Villa Yapılaşması

Çiftlikköy'ün deniz manzarasına hakim güney yamaçlarında kurulu **Gacık Köyü**, asırlık zeytin ağaçları, zengin bitki örtüsü ve son yıllarda bölgenin en gözde müstakil villa ve taş ev projelerine ev sahipliği yapan yerleşimidir. Gacık arazilerinde hafriyat yapmak, hem doğaya saygılı olmayı hem de sert taşlık yamaçlarla baş edebilecek güçlü makineleri zorunlu kılar.

Gacık toprakları dik meyillidir; zemin yüzeyin altında kalkerli taş katmanları barındırır. Burada yapılacak her hafriyat hamlesi, komşu parsellerin dengesini bozmayacak statik hesaplar ve kademeli şev uygulamaları gerektirir.

---

## Gacık Köyü Şantiyelerinde Sunduğumuz Hizmetler

### 1. Zeytinlik Islahı, Gençleştirme ve Tırnaklı Kök Sökümü
Ekonomik ömrünü tamamlamış, kurumuş veya arazinin inşaat oturum alanında kalan devasa zeytin ve çalı kökleri traktörle sökülemez. Cat mini ekskavatörümüzün veya JCB kepçemizin arka kazıcısına taktığımız özel **kök sökme tırnağı (riper)** ile ana kökleri 1.5 metre derinlikten keserek ağacı zedelemeden köküyle birlikte söküyoruz. Çıkan kökleri arazinin bir köşesinde topluyor, çukuru hemen nebati toprakla doldurup sıkıştırıyoruz.

### 2. Kademeli Teraslama (Taş Duvar Altı Seki Kazısı)
Eğimli yamaçlarda tek düzlem arazi açmak toprak kaymasına yol açar. Gacık arazilerinde "seki" adını verdiğimiz 2 veya 3 kademeli teraslar oluşturuyoruz:
- Üst kademe: Villa oturumu ve otopark alanı.
- Orta kademe: Yüzme havuzu veya veranda bahçe alanı.
- Alt kademe: Meyve bahçesi ve zeytinlik.
Her kademenin altına taş istinat duvarı için 60-80 cm derinliğinde sağlam temel hendeği kazıyoruz.

### 3. Villa Temel Hafriyatı ve Subasman Dolgusu
Müstakil konut ve villa projelerinde zemin etüdü kotlarına tam uyarak radye temel veya mütemadi temel kazısını tamamlıyoruz. Temel perdeleri dikildikten sonra perde arkasına su birikmesini engelleyen kaba mıcır drenaj dolgusunu sıfır hata ile seriyoruz.

### 4. Kayalıkta Fosseptik ve Su Deposu Çukurları
Kanalizasyon şebekesinin olmadığı yüksek tepe kesimlerinde 3x3x3 metre ebatlarında sızdırmaz betonarme fosseptik çukurlarını hidrolik kırıcı ataşmanımızla kalker kayaları kırarak santimetre hassasiyetinde açıyoruz.

---

## Gacık Köyü İçin Neden Adem Hafriyat?
- **15 Dakikada Sahada:** Çiftlikköy garajımızdan Gacık Köyü meydanına sadece 15 dakikada intikal ediyoruz.
- **Hassas Operatörlük:** Canlı zeytin ağaçlarına, komşu tel örgü sınırlarına ve su borularına zarar vermeyen 14 yıllık tecrübe.
    `
  },
  {
    id: 'laledere-koyu-bag-bahce-drenaji-ve-fosseptik-cukuru',
    slug: 'laledere-koyu-bag-bahce-drenaji-ve-fosseptik-cukuru',
    title: 'Laledere Köyü Bağ-Bahçe Drenajı ve Fosseptik Çukuru Kazısı',
    metaTitle: 'Laledere Köyü Drenaj & Fosseptik Kazısı | Adem Hafriyat',
    metaDesc: 'Çiftlikköy Laledere Köyü süs bitkisi sera drenajı, fosseptik çukuru açma, bahçe tesviyesi ve temel kazısı. 15 dk intikal: 0532 720 20 10.',
    excerpt: 'Laledere Köyü süs bitkisi seralarında killi zemin drenajı, koku yapmayan fosseptik çukurları, sulama havuzu hafriyatı ve nebati toprak serme.',
    category: 'Altyapı & Drenaj',
    author: 'Adem Hafriyat Saha Ekibi',
    date: '2026-04-12',
    readTime: '7 dk okuma',
    image: '/images/blog-arazi-duzleme.jpg',
    tags: ['Laledere Köyü Kepçe', 'Drenaj Kazısı', 'Fosseptik Çukuru', 'Sera Hafriyatı', 'Çiftlikköy'],
    districtSlug: 'ciftlikkoy',
    villageSlug: 'laledere-koyu',
    content: `
## Laledere Köyü Tarımsal Seracılık ve Zemin Özellikleri

Yalova'nın Türkiye çapında ünlü dış mekan süs bitkisi ve fide seracılığı havzası olan **Laledere Köyü**, düz ve hafif dalgalı verimli arazileriyle tanınır. Ancak Laledere topraklarının en belirgin özelliği, yüksek oranda **geçirimsiz sarı ve kırmızı kil** barındırmasıdır.

Kil tabakası yağmur sularının yer altına süzülmesini geciktirir; bu durum sera içinde saksıların su altında kalmasına, bitki köklerinin çürümesine ve mantari hastalıkların yayılmasına sebep olur. Laledere seralarında ve konut bahçelerinde doğru projelendirilmiş drenaj hattı olmadan başarılı bir tarımsal veya yapısal üretim mümkün değildir.

---

## Laledere Köyü'nde Gerçekleştirdiğimiz Uygulamalar

### 1. Sera Zemin Tesviyesi ve Lazerli Drenaj Kanalları
Sera kurulumu öncesinde zemin kodunun milimetrik düzeltilmesi şarttır. JCB bekoloderimizin ön bıçağıyla kaba tesviyeyi tamamladıktan sonra sera aksları boyunca eğimli drenaj kanalları kazıyoruz. Kanallara keçe sarılı drenaj borusu ve yıkanmış kırmataş döşeyerek sera tabanını 4 mevsim kuru tutuyoruz.

### 2. Betonarme Fosseptik Çukuru Açımı
Laledere'deki müstakil evlerde, çiftliklerde ve sera işletmelerinde kanalizasyon atıklarının çevreye ve yer altı sulama sularına sızmaması için çevre sağlığı standartlarına uygun fosseptik kuyuları açıyoruz. 3 ila 4 metre derinliğe inen teleskopik kazıcı kolumuzla göçme riskine karşı güvenlik şevli kazı yapıp tabana grobeton altı mıcır seriyoruz.

### 3. Tarımsal Sulama Havuzu ve Gölet Kazısı
Seracılıkta damlama sulama için tonlarca depolanmış suya ihtiyaç vardır. Arazinin en uygun kotunda 100 ila 500 ton kapasiteli geomembran kaplamalı sulama havuzlarını şev eğimlerini tam vererek kazıyor, çıkan kaliteli toprağı sera zeminine homojen şekilde yayıyoruz.

### 4. Gübreli Nebati Toprak Karıştırma ve Serme
Bahçe peyzajı ve fidan dikimi öncesinde yanmış çiftlik gübresi ile humuslu nebati toprağı kepçe kovasıyla homojen olarak harmanlayıp parsel zeminine 15-20 cm kalınlığında seriyoruz.
    `
  },
  {
    id: 'ilyaskoy-arazi-tesviyesi-ve-tel-orgu-hafriyati',
    slug: 'ilyaskoy-arazi-tesviyesi-ve-tel-orgu-hafriyati',
    title: 'İlyasköy Arazi Tesviyesi, Mıcır Serimi ve Tel Örgü Taban Kazısı',
    metaTitle: 'İlyasköy Arazi Tesviyesi & Mıcır Serimi | Adem Hafriyat',
    metaDesc: 'Çiftlikköy İlyasköy parsel tesviyesi, tel örgü hatıl betonu hendeği, mıcır dolgu ve stabilize yol yapımı. 15 dk intikal: 0532 720 20 10.',
    excerpt: 'İlyasköy hobi bahçeleri ve tarım arazilerinde lazerli zemin düzleme, parsel sınır tel örgü beton hendeği, traktör yollarına mekanik mıcır serme.',
    category: 'Köy & Arazi Hafriyatı',
    author: 'Adem Hafriyat Saha Ekibi',
    date: '2026-04-12',
    readTime: '7 dk okuma',
    image: '/images/blog-arazi-duzleme.jpg',
    tags: ['İlyasköy Kepçe', 'Arazi Tesviyesi', 'Mıcır Serimi', 'Tel Örgü Hendeği', 'Çiftlikköy'],
    districtSlug: 'ciftlikkoy',
    villageSlug: 'ilyaskoy',
    content: `
## İlyasköy Parselasyon ve Zemin Yapısı

Çiftlikköy ile Taşköprü sanayi hattının hemen arkasında yer alan **İlyasköy**, son dönemde hisseli ve müstakil tapulu hobi bahçesi yatırımlarının merkez üssü haline gelmiştir. Bölgenin kuru, kireçli ve yer yer taşlı toprak yapısı; arazisini böldürmek, tel örgüyle çevirmek ve içine konteyner veya bağ evi koymak isteyen mülk sahipleri için yoğun hafriyat ihtiyacı doğurmaktadır.

Hobi bahçesi yapımında yapılan en büyük hata, zemin tesviyesi yapılmadan çit çekilmesidir. Eğimli zemine çekilen çitler ilk kış yağmurunda alttan açılır veya eğilir.

---

## İlyasköy'de Anahtar Teslim Zemin Hazırlığı

### 1. Parsel Sınır Tel Örgü ve Hatıl Betonu Hendekleri
Harita mühendisinin çaktığı sınır kazıklarını referans alarak, 30 cm genişliğinde dar kanal kovamızla jilet gibi düzgün çit temeli kanalı açıyoruz. Bu hendek içerisine atılacak demirli hatıl betonu, hem tel çitin fırtınada yıkılmasını önler hem de yaban hayvanlarının alttan kazarak girmesini kesin olarak engeller.

### 2. Kaba ve İnce Arazi Tesviyesi
JCB 3CX bekoloderimizin 4'ü 1 arada açılır ön dozer bıçağıyla arazi içindeki çukurları dolduruyor, tümsekleri tıraşlayarak suyun tek bir noktada göllenmesini engelleyecek %1-2 doğal akış eğimli pürüzsüz yüzeyler oluşturuyoruz.

### 3. Konteyner ve Tiny House Zemin Platformu
Konteyner konulacak alanı 20 cm derinliğinde kazıp sıkıştırıyor, altına su geçirmeyen kaba taş tüvenan dolgu, üstüne ise 0-38 mekanik kırmataş mıcır sererek teraziye alıyoruz. Bu sayede konteyner ayakları zamanla toprağa batmaz, kapı ve pencerelerde kasma yaşanmaz.

### 4. Çamursuz Giriş Yolu Yapımı
İlyasköy arazi yollarında kışın araçların kaymasını önlemek için parsel kapısına kadar olan güzergaha kırmataş mıcır serip kepçe tekerlekleriyle kompakt hale getiriyoruz.
    `
  },
  {
    id: 'denizcali-koyu-sanayi-depo-hafriyat-ve-forklift-kiralama',
    slug: 'denizcali-koyu-sanayi-depo-hafriyat-ve-forklift-kiralama',
    title: 'Denizçalı Köyü Depo & Şantiye Hafriyatı: Sanayi Altyapısı ve Forklift Kiralama',
    metaTitle: 'Denizçalı Köyü Depo Hafriyatı & Forklift | Adem Hafriyat',
    metaDesc: 'Çiftlikköy Denizçalı Köyü fabrika zemin hafriyatı, depo subasman dolgusu, saatlik/günlük kiralık forklift ve kepçe. Hemen arayın: 0532 720 20 10.',
    excerpt: 'Denizçalı sanayi ve depolama aksında lojistik hangar hafriyatları, saha betonu altı mekanik mıcır serme ve ağır yük indirme forklift kiralama.',
    category: 'Forklift Kiralama',
    author: 'Adem Hafriyat Lojistik Birimi',
    date: '2026-04-12',
    readTime: '8 dk okuma',
    image: '/images/blog-forklift-rehberi.jpg',
    tags: ['Denizçalı Köyü Forklift', 'Denizçalı Kepçe', 'Sanayi Hafriyatı', 'Depo Temeli', 'Çiftlikköy'],
    districtSlug: 'ciftlikkoy',
    villageSlug: 'denizcali-koyu',
    content: `
## Denizçalı Köyü: Tarım ve Sanayi Depolamasının Kesişme Noktası

Taşköprü Sanayi Bölgesi ve Yalova Avrasya Giyim OSB aksına komşu olan **Denizçalı Köyü**, geleneksel tarım arazilerinin yanı sıra son yıllarda lojistik depoların, soğuk hava tesislerinin ve imalat atölyelerinin hızla yükseldiği stratejik bir kavşaktır. Bu karma yapı, Denizçalı'da hem ağır inşaat hafriyatını hem de günlük fabrika forklift operasyonlarını zorunlu kılmaktadır.

Adem Hafriyat'ın Taşköprü Sanayi Caddesi'ndeki ana makine parkuru Denizçalı Köyü sınırına yalnızca **10 dakika** mesafededir. Bu avantaj, fabrikaların ve inşaat şantiyelerinin acil makine ihtiyaçlarına dakikalar içinde yanıt vermemizi sağlar.

---

## Denizçalı'da Sunduğumuz İki Temel Hizmet

### 1. Sanayi Depo & Hangar Hafriyatı
- **Subasman ve Grobeton Altı Dolgu:** Ağır tonajlı tırların ve forkliftlerin gezeceği fabrika zemin betonunun çatlamaması için taban toprağını derin kazıyor, 0-38 mekanik stabilize malzeme sererek silindirle sıkıştırıyoruz.
- **Sanayi Yağmur ve Atık Su Koruge Hatları:** Fabrika çatılarından inen tonlarca yağmur suyunu tahliye etmek için 400 ila 800 mm çaplı koruge borulara uygun derin hat hendekleri açıyoruz.
- **İstinat ve Çevre Güvenlik Duvarları:** Tesis çevresine çekilecek betonarme perde duvar temellerini hızlı ve dik kesitlerle kazıyoruz.

### 2. Saatlik ve Günlük Forklift Kiralama
Denizçalı'daki işletmelere gelen hammadde tırlarının indirilmesi veya ihracat konteynerlerinin yüklenmesinde tam zamanlı makine satın alma maliyetine girmeden profesyonel çözüm sunuyoruz:
- **3.5 Ton ve 5 Ton Dizel Forklift:** Bozuk şantiye zemininde ve açık depolarda paletli ağır makineleri, mermer blokları, çelik profilleri ve hammadde paletlerini hasarsız boşaltır.
- **G Sınıfı Ehliyetli Operatör Güvencesi:** Tüm operatörlerimiz resmi İSG sertifikalarına sahiptir; fabrika sahasında sıfır kaza prensibiyle çalışır.
- **10 Dakikada Sahada:** Tır fabrikanıza yanaştığında arayın, 10 dakika içinde forkliftimiz kapınızda olsun.
    `
  },
  {
    id: 'kadikoy-beldesi-villa-temeli-ve-havuz-kazisi',
    slug: 'kadikoy-beldesi-villa-temeli-ve-havuz-kazisi',
    title: 'Kadıköy Beldesi Villa Temeli, Havuz Kazısı ve Peyzaj Hafriyatı',
    metaTitle: 'Kadıköy Beldesi Villa Temeli & Havuz Kazısı | Adem Hafriyat',
    metaDesc: 'Yalova Kadıköy Beldesi lüks villa temel kazısı, açık havuz hafriyatı, sıfır kuyruk mini kepçe ve bahçe peyzajı. 15 dk intikal: 0532 720 20 10.',
    excerpt: 'Kadıköy Beldesi\'nin prestijli villa projelerinde sıfır kuyruk dönüşlü mini ekskavatörle havuz kazısı, perde duvar hafriyatı ve rulo çim tesviyesi.',
    category: 'Villa & Temel Kazısı',
    author: 'Adem Hafriyat Saha Ekibi',
    date: '2026-04-12',
    readTime: '9 dk okuma',
    image: '/images/blog-temel-kazisi.jpg',
    tags: ['Kadıköy Beldesi Kepçe', 'Villa Temeli', 'Havuz Kazısı', 'Mini Ekskavatör', 'Yalova Merkez'],
    districtSlug: 'yalova-merkez',
    villageSlug: 'kadikoy-beldesi',
    content: `
## Kadıköy Beldesi: Yalova'nın Prestijli Villa ve Yaşam Bölgesi

Yalova Merkez'e bağlı **Kadıköy Beldesi**, geniş yeşil alanları, düzenli parselasyonları ve yüksek standartlı villa projeleriyle kentin en seçkin yerleşim bölgesidir. Kadıköy'de hafriyat ve kazı işi yapmak, standart bir şantiyeden çok farklı bir hassasiyet gerektirir. Burada çalışan makineler komşu lüks binaların bahçe duvarlarına, kilit parke yollara ve peyzaj alanlarına asla zarar vermemelidir.

Adem Hafriyat olarak Kadıköy Beldesi'nde gerçekleştirdiğimiz tüm projelerde, dar alan manevra kabiliyetine sahip **kauçuk paletli Cat 303.5 Mini Ekskavatörlerimizi** ve çevreye duyarlı operatörlerimizi görevlendiriyoruz.

---

## Kadıköy Beldesi Uzmanlık Alanlarımız

### 1. Lüks Villa Temel ve Bodrum Kat Hafriyatı
Mimari statik projelere harfiyen uyarak bina oturum alanını kazıyor, temel altı drenaj boruları için kot farklarını lazer terazi ile ayarlıyoruz. Kazıdan çıkan moloz ve toprağı bekletmeden hafriyat kamyonlarımıza yükleyerek sokak içinde görsel ve çevresel kirlilik yaratmıyoruz.

### 2. Açık Yüzme Havuzu Kazısı
Kadıköy villalarının vazgeçilmezi olan 4x8 m, 5x10 m ebatlarındaki taşmalı veya skimmerlı yüzme havuzlarını milimetrik hassasiyetle kazıyoruz:
- Havuz tabanını teraziye alıyor, betonarme perde kalıbının rahat çakılabilmesi için yanlarda 50 cm çalışma payı bırakıyoruz.
- Denge tankı ve makine dairesi çukurlarını tek seferde kazarak ek makine maliyetini önlüyoruz.

### 3. Komşu Parsel Sınırlarında Perde Duvar & İstinat Kazısı
Sıfır kuyruk dönüşlü (Zero Tail Swing) mini kepçemiz sayesinde, komşu villa duvarına 10 cm mesafede dönerken makinenin arka ağırlığı duvara çarpmaz. 360 derece olduğu yerde dönerek jilet gibi istinat hendeği açar.

### 4. Rulo Çim Öncesi Peyzaj ve Nebati Toprak Serimi
İnşaat atıklarını (harç kalıntıları, taşlar) eledikten sonra bahçeye drenaj kanalları döşüyor, ardından elenmiş humuslu nebati çim toprağını tesviye bıçağımızla pürüzsüz biçimde seriyoruz.
    `
  },
  {
    id: 'samanli-koyu-kivi-bahcesi-tesviyesi-ve-derin-kuyu-kazimi',
    slug: 'samanli-koyu-kivi-bahcesi-tesviyesi-ve-derin-kuyu-kazimi',
    title: 'Samanlı Köyü Kivi Bahçesi Tesviyesi, Drenaj ve Derin Su Kuyusu Kazımı',
    metaTitle: 'Samanlı Köyü Kivi Bahçesi Drenajı & Su Kuyusu | Adem Hafriyat',
    metaDesc: 'Yalova Samanlı Köyü kivi bahçesi drenaj kanalları, kök korumalı mini kepçe, derin keson su kuyusu açma. 15 dk intikal: 0532 720 20 10.',
    excerpt: 'Türkiye\'nin kivi başkenti Samanlı ovasında saçak kökleri zedelemeden taban suyu tahliye kanalları açma ve derin keson kuyu kazı yöntemleri.',
    category: 'Kuyu & Drenaj',
    author: 'Adem Hafriyat Saha Ekibi',
    date: '2026-04-12',
    readTime: '9 dk okuma',
    image: '/images/blog-su-kuyusu.jpg',
    tags: ['Samanlı Köyü Kepçe', 'Kivi Bahçesi', 'Drenaj Kazısı', 'Keson Kuyu', 'Yalova Merkez'],
    districtSlug: 'yalova-merkez',
    villageSlug: 'samanli-koyu',
    content: `
## Samanlı Ovası: Türkiye Kivi Üretiminin Kalbi ve Zemin Dinamikleri

Yalova Merkez'e bağlı **Samanlı Köyü**, mikroklima iklimi ve zengin alüvyon toprak yapısıyla Türkiye'nin tescilli kivi üretim merkezidir. Bir dönüm kivi bahçesi yüz binlerce liralık bir yatırımdır; kivi ağacı ise saçak köklü, suya çok düşkün fakat köklerinde durağan su birikmesine (kök boğulması) karşı aşırı derecede hassas bir bitkidir.

Samanlı arazilerinde kepçe çalıştırmak büyük bir uzmanlık ve hassasiyet ister. Kaba bir kepçe darbesi onlarca yıllık verimli kivi kollarını kırabilir veya ana kökleri kopararak ağacın kurumasına sebep olabilir. Adem Hafriyat, Samanlı'da yıllardır kivi üreticileriyle omuz omuza çalışan yerel şantiye ekibidir.

---

## Samanlı Kivi Bahçelerinde Yürüttüğümüz Operasyonlar

### 1. Kökleri Korumalı Kış Suyu Drenaj Hendekleri
Kış aylarında Samanlı ovasında taban suyu yükselir. Ağaç sıralarının tam ortasından, kök saçaklarına zarar vermeyecek mesafede dar paletli mini kepçemizle 80-120 cm derinliğinde tahliye kanalları kazıyoruz. Açılan kanallara döşenen delikli koruge drenaj boruları kışın suyu hızla araziden uzaklaştırır.

### 2. Geniş Çaplı Keson Su Kuyusu Açımı
Kivi yazın haziran, temmuz ve ağustos aylarında günde ağaç başına 80-120 litre su tüketir. Sondaj kuyularının elektrik kesintisinde işlevsiz kalması riskine karşı Samanlı çiftçileri **geniş ağızlı beton keson kuyuları** tercih eder:
- 5 ila 7 metre derinliğe kadar inen JCB teleskopik kazıcımızla geniş rezerv çukuru açıyoruz.
- Tabanına 2 numara yıkanmış dere mıcırı serip 120'lik betonarme büzleri indiriyoruz.
- Bu kuyular yaz boyunca tonlarca suyu haznesinde tutarak damlama sulama sistemlerini kesintisiz besler.

### 3. Kivi T Direkleri ve Çelik Tel Ankraj Çukurları
Kivinin ağır sürgünlerini ve meyve yükünü taşıyan beton veya demir T direklerin rüzgarda yatmaması için dar kova ataşmanımızla derin ankraj pabuç çukurları açıyoruz.

### 4. Zemin Batmaz Kauçuk Palet Güvencesi
Samanlı'nın sulak zemininde ağır lastik tekerlekli makineler batar ve zemin toprağını aşırı sıkıştırarak havasız bırakır. Geniş kauçuk paletli mini ekskavatörümüz zemin basıncını dağıtarak batmadan tüy gibi hareket eder.
    `
  },
  {
    id: 'safran-koyu-engebeli-arazi-duzleme-ve-kaya-kirma',
    slug: 'safran-koyu-engebeli-arazi-duzleme-ve-kaya-kirma',
    title: 'Safran Köyü Engebeli Arazi Düzleme, Taş Kırma ve Bağ Evi Temeli',
    metaTitle: 'Safran Köyü Arazi Düzleme & Taş Kırma | Adem Hafriyat',
    metaDesc: 'Yalova Safran Köyü sert kayalık arazide hidrolik kırıcı kepçe, şev tıraşlama, tarla düzleme ve bağ evi temeli. 15 dk intikal: 0532 720 20 10.',
    excerpt: 'Safran Köyü yamaçlarında sert kaya formasyonlarının hidrolik kırıcı ataşmanla parçalanması, dik şevlerin kademelendirilmesi ve bağ evi hafriyatı.',
    category: 'Köy & Arazi Hafriyatı',
    author: 'Adem Hafriyat Saha Ekibi',
    date: '2026-04-12',
    readTime: '8 dk okuma',
    image: '/images/blog-arazi-duzleme.jpg',
    tags: ['Safran Köyü Kepçe', 'Kaya Kırma', 'Arazi Düzleme', 'Kırıcı Bekoloder', 'Yalova Merkez'],
    districtSlug: 'yalova-merkez',
    villageSlug: 'safran-koyu',
    content: `
## Safran Köyü Kayalık Zemin Yapısı ve Teraslama Dinamikleri

Yalova Merkez'in kuzey yamaçlarında kurulu olan **Safran Köyü**, dik eğimli tepe yamaçları, geniş deniz manzarası ve zemininde barındırdığı sert kalker ve bazalt kaya tabakalarıyla bilinir. Safran arazilerinde standart kazı kovalarıyla ilerlemek neredeyse imkansızdır; kovanın tırnakları sert kayaya çarparak körelir.

Bu coğrafyada başarılı bir hafriyatın anahtarı, yüksek darbe gücüne sahip **hidrolik kırıcı ataşmanlı iş makineleri** ve dik yamaçta devrilme riskini sıfıra indiren tecrübeli operatörlüktür.

---

## Safran Köyü'nde Sunduğumuz Saha Çözümleri

### 1. Hidrolik Kırıcı ile Zemin Gevşetme ve Kaya Kırma
Safran arazisinde bağ evi, villa veya otopark açarken yüzeye çıkan yekpare kayaları JCB bekoloderimize bağlı ağır hizmet tipi hidrolik kırıcımızla parçalıyoruz. Çıkan taş blokları kırarak stabilize dolgu veya istinat duvarı örme taşı olarak değerlendiriyoruz.

### 2. Dik Yamaç Şev Kesme ve Kademeli Teraslama
Dik dağ yamaçlarında toprağın kaymasını önlemek için basamaklı (seki) teraslar açıyoruz. Her kademenin arkasına yağmur suyunu tahliye edecek şev arkası hendekler kazarak erozyon tehlikesini kalıcı olarak ortadan kaldırıyoruz.

### 3. Taş İstinat Duvarı Temeli Kazımı
Safran'ın engebeli parsellerinde üst kotu tutabilmek için yapılacak taş istinat duvarlarının tabanını ana kayaya oturacak derinlikte açıyoruz. Ana kayaya oturan istinat duvarları hiçbir zaman bel vermez ve yıkılmaz.

### 4. Bağ Evi ve Bungalov Taban Hafriyatı
Müstakil yaşam alanı oluşturmak isteyenler için kayalık zeminde radye temel veya subasman çukurlarını açıp teraziye alıyoruz.
    `
  },
  {
    id: 'hacimehmet-koyu-dere-islahi-ve-yagmur-suyu-kanali',
    slug: 'hacimehmet-koyu-dere-islahi-ve-yagmur-suyu-kanali',
    title: 'Hacımehmet Köyü Dere Islahı, Yağmur Suyu Hattı ve Dolgu Malzemesi Serme',
    metaTitle: 'Hacımehmet Köyü Dere Islahı & Yağmur Hattı | Adem Hafriyat',
    metaDesc: 'Yalova Hacımehmet Köyü dere yatağı ıslahı, yağmur suyu koruge boru hattı, moloz temizleme ve mıcır dolgu. 15 dk intikal: 0532 720 20 10.',
    excerpt: 'Hacımehmet Köyü vadisindeki dere kollarında tıkanıklık giderme, taşkın seti oluşturma, yağmur suyu tahliye kanalları ve stabilize mıcır serme.',
    category: 'Altyapı & Drenaj',
    author: 'Adem Hafriyat Saha Ekibi',
    date: '2026-04-12',
    readTime: '7 dk okuma',
    image: '/images/blog-yagmur-suyu.jpg',
    tags: ['Hacımehmet Köyü Kepçe', 'Dere Islahı', 'Yağmur Suyu Hattı', 'Mıcır Dolgu', 'Yalova Merkez'],
    districtSlug: 'yalova-merkez',
    villageSlug: 'hacimehmet-koyu',
    content: `
## Hacımehmet Köyü Su Havzası ve Zemin Özellikleri

Yalova Merkez'e bağlı **Hacımehmet Köyü**, Samanlı Dağları'ndan inen derelerin ve vadilerin Yalova düzlüğüne kavuştuğu stratejik bir su toplama havzasında yer alır. Köy sınırları içerisindeki tarlalar, seralar ve konutlar, şiddetli sonbahar ve ilkbahar yağışlarında dağdan gelen yüksek debili yüzey sularıyla mücadele etmek zorundadır.

Zamanında temizlenmeyen dere yatakları, daralan menfezler ve yetersiz yağmur suyu giderleri; Hacımehmet'te bahçelerin çamur altında kalmasına ve yol geçişlerinin kapanmasına neden olur.

---

## Hacımehmet'te Yaptığımız Temel Çalışmalar

### 1. Dere Yatağı Islahı ve Moloz Temizliği
4x4 JCB Kazıcı Yükleyicimizin geniş hacimli çamur kovasıyla dere tabanında biriken taş, çakıl, ağaç kütükleri ve alüvyon balçığı temizleyerek suyun doğal akış kesitini genişletiyoruz.

### 2. Yağmur Suyu Koruge Boru Hattı Döşeme Hendekleri
Yol kenarlarından geçen açık hendeklerin koku ve güvenlik riski oluşturmaması için 300'lük veya 400'lük SN4 çift cidarlı koruge borular döşüyor, kepçemizle üzerini kırmataş dolgu ile kapatarak yol genişliğini artırıyoruz.

### 3. Çamurlu Bahçe Yollarına Kırmataş Mıcır Serme
Hacımehmet'in killi zemininde araçların batmasını önlemek amacıyla; önce üstteki çürük balçık katmanı kazıyıp kenara alıyor, ardından 0-38 mekanik stabilize kırmataş serip silindirle eziyoruz.

### 4. Parsel İçi Drenaj ve Tahliye Setleri
Dağdan gelen yüzey suyunun doğrudan müstakil evlerin bahçesine girmesini önlemek için parsel üst sınırına ters eğimli toprak seddeler ve su kaçırma hendekleri oluşturuyoruz.
    `
  },
  {
    id: 'guneykoy-taslik-arazi-kirici-kepce-ve-derin-su-kuyusu',
    slug: 'guneykoy-taslik-arazi-kirici-kepce-ve-derin-su-kuyusu',
    title: 'Güneyköy Taşlık Arazi Kırıcı Kepçe, Zemin Açma ve Su Kuyusu',
    metaTitle: 'Güneyköy Taşlık Arazi Kırıcı Kepçe & Kuyu | Adem Hafriyat',
    metaDesc: 'Yalova Güneyköy sert kayalık zemin kırma, dağ yolu açma, hidrolik kırıcı kepçe ve derin keson su kuyusu. 20 dk intikal: 0532 720 20 10.',
    excerpt: 'Yüksek rakımlı Güneyköy orman sınırında sert kireçtaşı ve bazalt kaya kırma, dağ evi temel kazısı, yangın emniyet şeritleri ve derin kuyu açımı.',
    category: 'Köy & Arazi Hafriyatı',
    author: 'Adem Hafriyat Saha Ekibi',
    date: '2026-04-12',
    readTime: '8 dk okuma',
    image: '/images/blog-arazi-duzleme.jpg',
    tags: ['Güneyköy Kepçe', 'Kaya Kırma', 'Dağ Evi Temeli', 'Su Kuyusu', 'Yalova Merkez'],
    districtSlug: 'yalova-merkez',
    villageSlug: 'guneykoy',
    content: `
## Güneyköy Yüksek Rakım, Dağlık Arazi ve Sert Kayalık Şartları

Yalova ile Bursa sınırında, Samanlı Dağları'nın zirvelerine yakın konumlanan **Güneyköy**, yüksek rakımı, temiz dağ havası, çam ormanları ve son derece sert kireçtaşı ile bazalt bloklardan oluşan jeolojik yapısıyla bilinir. Güneyköy'de standart kepçeler çaresiz kalır; kayaları çatlatıp ufalamak için **yüksek joule darbe enerjili ağır hidrolik kırıcılar** şarttır.

Buradaki arazilerde bağ evi, dağ evi veya arıcılık tesisi kurmak isteyen mülk sahipleri için ana engel zemindeki devasa kaya bloklarıdır.

---

## Güneyköy Şantiye Operasyonlarımız

### 1. Ağır Hizmet Tipi Hidrolik Kırıcı ile Kaya Bloklarını Parçalama
Güneyköy parsellerinde temel kazısı yaparken karşımıza çıkan monoblok ana kayaları hidrolik kırıcı ataşmanımızla santim santim parçalıyoruz. Kırılan taşları dozer bıçağımızla iterek parsel sınırında muazzam bir doğal taş istinat setine dönüştürüyoruz.

### 2. Dağ Yolu Açma, Genişletme ve Greyderleme
Orman içi ve köy sınırındaki engebeli patikaları bekoloderimizin ön bıçağıyla tıraşlayarak genişletiyor, yol kenarına su tahliye olukları kazarak şiddetli kış yağmurlarında yolun bozulmasını engelliyoruz.

### 3. Derin Keson Su Kuyusu Açımı
Güneyköy'de derinlerdeki tatlı dağ suyu kaynaklarına ulaşmak için kayalık zemin kırıcıyla açılarak 5-6 metre derinliğe inilir, kuyu içerisine beton halkalar yerleştirilerek kış-yaz kesintisiz temiz içme ve sulama suyu elde edilir.

### 4. Dağ Evi ve Ahşap Konut Subasman Kazısı
Doğal ahşap ve karkas yapılar için sağlam kaya zemin üzerine oturan subasman pabuç çukurlarını açıyor ve dolgu mıcır serimini tamamlıyoruz.
    `
  },
  {
    id: 'sogucak-koyu-yamac-hafriyati-kademeli-bahce-tesviyesi',
    slug: 'sogucak-koyu-yamac-hafriyati-kademeli-bahce-tesviyesi',
    title: 'Soğucak Köyü Yamaç Hafriyatı, Kademeli Bahçe Tesviyesi ve Drenaj',
    metaTitle: 'Soğucak Köyü Yamaç Hafriyatı & Bahçe Tesviyesi | Adem Hafriyat',
    metaDesc: 'Yalova Soğucak Köyü manzaralı eğimli yamaç teraslama, perde beton kazısı, bahçe drenajı ve villa temeli. 20 dk intikal: 0532 720 20 10.',
    excerpt: 'Soğucak Köyü yamaçlarında kademeli bahçe tesviyesi, erozyona karşı su kaçırma hendekleri, perde beton arkası mıcır dolgusu ve villa zemin kazısı.',
    category: 'Villa & Temel Kazısı',
    author: 'Adem Hafriyat Saha Ekibi',
    date: '2026-04-12',
    readTime: '8 dk okuma',
    image: '/images/blog-temel-kazisi.jpg',
    tags: ['Soğucak Köyü Kepçe', 'Yamaç Hafriyatı', 'Kademeli Tesviye', 'Bahçe Drenajı', 'Yalova Merkez'],
    districtSlug: 'yalova-merkez',
    villageSlug: 'sogucak-koyu',
    content: `
## Soğucak Köyü Panoramik Yamaçları ve Zemin Dengesi

Yalova şehir merkezine hakim yüksek tepelerde yer alan **Soğucak Köyü**, muazzam körfez manzarası ve ferah havasıyla son yıllarda seçkin villa projelerinin ve bungalov işletmelerinin gözdesi haline gelmiştir. Ancak Soğucak parsellerinin neredeyse tamamı %20 ila %45 arasında değişen dik yamaç eğimlerine sahiptir.

Bu tür dik yamaçlarda bilgisizce yapılan derin kazılar, üstteki toprağın dengesini bozarak ciddi heyelan ve şev kayması riskleri yaratır. Adem Hafriyat olarak Soğucak Köyü'nde yürüttüğümüz her kazıda **denge ayaklı JCB bekoloderlerimiz** ile zemin stabilitesini ön planda tutarak kademeli çalışma yapıyoruz.

---

## Soğucak Köyü'nde Uyguladığımız Teknikler

### 1. Kademeli Bahçe Tesviyesi (Teraslama & Sekilendirme)
Dik yamacı tek seferde düzlemek yerine, parsel kotuna göre 2 veya 3 kademe açıyoruz. Üst kademede villa ve otopark girişi, alt kademelerde ise teras bahçeler oluşturuyoruz. Her kademenin eğimini dışa değil içteki drenaj hendeğine doğru vererek yağmur suyunun şevi oymasını kesin olarak engelliyoruz.

### 2. Perde Beton ve İstinat Duvarı Kazısı
Yamaç kot farkını tutacak betonarme istinat perdeleri için ana sert tabakaya kadar inen temel hendekleri açıyoruz. Perde beton döküldükten sonra duvar arkasına geotekstil keçe ve yıkanmış kırmataş mıcır doldurarak su basıncının duvarı çatlatmasını önlüyoruz.

### 3. Erozyon Önleyici Yüzey Suyu Tahliye Hendekleri
Soğucak'ta şiddetli yağışlarda yamaçtan aşağı hızla akan sular bahçe toprağını süpürür. Parsel üst sınırına açtığımız V kesitli trapez kanallarla gelen suyu toplayarak güvenli doğal dere yatağına deşarj ediyoruz.

### 4. Manzaralı Villa ve Havuz Taban Kazıları
Sonsuzluk havuzu (infinity pool) ve villa bodrum kazılarını komşu parsel sınırlarına ve ağaçlarına en ufak bir zarar vermeden sıfır hata ile teslim ediyoruz.
    `
  }
];

// Yeni makalelerin zaten eklenip eklenmediğini kontrol et
const existingSlugs = new Set(blogPosts.map(p => p.slug));
let addedCount = 0;

villageArticles.forEach(article => {
  if (!existingSlugs.has(article.slug)) {
    blogPosts.push(article);
    existingSlugs.add(article.slug);
    addedCount++;
  }
});

const contentToWrite = `/**\n * Blog / Makaleler Veri Modeli - Adem Hafriyat\n * %100 İnsan Editör Kalitesinde, Kapsamlı, Gerçek Şantiye Deneyimli SEO Makaleleri\n */\n\nmodule.exports = ${JSON.stringify(blogPosts, null, 2)};\n`;

fs.writeFileSync(blogFilePath, contentToWrite, 'utf8');
console.log(`[BAŞARILI]: ${addedCount} yeni köy makalesi data/blog.js içerisine eklendi. Toplam makale sayısı: ${blogPosts.length}`);

