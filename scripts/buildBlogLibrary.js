/**
 * Build 30 High-Value, 100% SEO & GEO Blog Articles with Dedicated FAQs
 * Adem Hafriyat - Yalova Kepçe & Forklift Kiralama
 */

const fs = require('fs');
const path = require('path');

const existingPosts = require('../data/blog');

// 1. FAQs map for existing 19 posts
const existingFaqs = {
  'yalova-kepce-kiralama-rehberi': [
    {
      question: 'Yalova içinde bekoloder kepçe kiralamak için minimum kiralama süresi nedir?',
      answer: 'Adem Hafriyat olarak Yalova Merkez, Çiftlikköy ve Taşköprü bölgelerinde minimum 2 saatlik acil veya yarım günlük / günlük kiralama seçenekleri sunuyoruz. İşinizin büyüklüğüne göre hızlı keşif & şeffaf fiyat sonrası en ekonomik süreyi belirliyoruz.'
    },
    {
      question: 'Lastik tekerlekli bekoloder ile paletli mini ekskavatör arasında ne fark vardır?',
      answer: 'Bekoloderler lastik tekerlekli olup asfaltta kendi yürüyüşüyle 20 dakikada şantiyeye varır, ön kovasıyla malzeme taşır ve arka kazıcısıyla derin temel kazar. Mini ekskavatörler ise kauçuk paletleriyle kilit parke ve bahçeye zarar vermez, 360 derece sıfır kuyruk dönüşüyle dar alanlarda çalışır.'
    },
    {
      question: 'Kepçe kiralama esnasında operatör ehliyeti ve İSG belgeleri mevcut mudur?',
      answer: 'Evet. Filomuzdaki tüm operatörler G sınıfı iş makinesi ehliyetine, mesleki yeterlilik belgelerine ve güncel İSG eğitim sertifikalarına sahiptir.'
    },
    {
      question: 'Yalova Merkez garajından Çiftlikköy ve Taşköprü\'ye intikal süresi ne kadardır?',
      answer: 'Çiftlikköy ve Taşköprü Sanayi Bölgesi garajımıza yalnızca 5-15 dakika mesafededir. Çağrınız alındıktan sonra operatörümüz en geç 15-20 dakika içinde şantiyenizde iş başı yapmaktadır.'
    }
  ],
  'taskopru-sanayi-forklift-kiralama-rehberi': [
    {
      question: 'Taşköprü Sanayi Bölgesi ve OSB\'ye forklift kaç dakikada teslim edilir?',
      answer: 'Taşköprü Sanayi Caddesi üzerindeki hazır filomuz sayesinde fabrikalara ve tır yanaşma rampalarına ortalama 10-15 dakika içinde forklift sevk ediyoruz.'
    },
    {
      question: '3 tonluk dizel forklift ile 5 tonluk forklift arasında ne gibi farklar vardır?',
      answer: '3 tonluk modeller standart euro palet, ambalaj ve hammadde indirmelerinde yüksek manevra hızı sunarken; 5 tonluk makineler ağır makine blokları, mermer paletleri, çelik rulo ve tersane sacı indirmede tercih edilir.'
    },
    {
      question: 'Tır indirme işlemlerinde operatörlü kiralama neden daha avantajlıdır?',
      answer: 'Deneyimli operatör ağırlık merkezini doğru hesaplayarak tır kasasından yükü devirmeden, palet kırmadan 25-35 dakikada indirir; hem tır bekleme (demuraj) cezasını önler hem de İSG riskini sıfırlar.'
    },
    {
      question: 'Kapalı gıda deposu veya antrepolarda dizel yerine akülü forklift veriyor musunuz?',
      answer: 'Evet, gıda hijyeni ve sıfır egzoz gazı gereken kapalı tesisler için beyaz iz bırakmayan dolgu lastikli akülü forklift seçeneklerimiz mevcuttur.'
    }
  ],
  'ciftlikkoy-temel-kazisi-ve-drenaj-rehberi': [
    {
      question: 'Çiftlikköy sahil kesiminde temel kazarken taban suyu çıkarsa ne yapılır?',
      answer: 'Sahil bandında taban suyu çıktığında temelin en düşük kotuna dalgıç pompa için geçici bir drenaj toplama rögari açılır ve su tahliye edilerek grobeton kuru zemine dökülür.'
    },
    {
      question: 'Fransız drenaj borusu temel perdesine nasıl uygulanmalıdır?',
      answer: 'Temel pabucu seviyesinde %1 eğimli kanal açılır, geotekstil keçe serilir, delikli PVC drenaj borusu yerleştirilip üzeri 2 No kırmataş mıcırla bohçalanarak kapatılır.'
    },
    {
      question: 'Hafriyattan çıkan bitkisel toprak temel dolgusunda neden kullanılmaz?',
      answer: 'Bitkisel nebati toprak organik madde içerdiği için zamanla çürür ve oturma yapar; bu da bina çevresindeki beton ve tretuvarın çökmesine yol açar. Dolguda kırmataş stabilize mıcır kullanılmalıdır.'
    },
    {
      question: 'Çiftlikköy\'de temel kazısı öncesi zemin keşfi ücretli midir?',
      answer: 'Hayır, Adem Hafriyat olarak Çiftlikköy genelinde şantiye keşif hizmetimiz şeffaf şekilde önceden hesaplanır.'
    }
  ],
  'yagmur-ve-kanalizasyon-kazisi-standartlari': [
    {
      question: 'Kanalizasyon borusu döşenirken hendek tabanına verilmesi gereken minimum eğim nedir?',
      answer: 'Katı atıkların çökelmeden akabilmesi için 150-200 mm koruge borularda minimum eğim %1.5 ile %2 (metre başına 1.5 - 2 cm) olmalıdır.'
    },
    {
      question: 'Yalova ikliminde kanal boruları kaç santimetre derine gömülmelidir?',
      answer: 'Yalova genelinde don derinliği 60-80 cm arasındadır. Ağır araç yükü olan yollarda boru patlamasını önlemek için kazı derinliği en az 1.20 - 1.50 metre olmalıdır.'
    },
    {
      question: 'Kanal hendeğinde boru altına kum yastıklaması neden şarttır?',
      answer: 'Sert taş ve kaya parçalarının boru tabanını delmesini veya noktasal yükle kırmasını engellemek için borunun altı ve yanları 10-15 cm elenmiş taş tozu veya kumla yastıklanmalıdır.'
    },
    {
      question: 'Acil patlak kanalizasyon veya su borusu için gece kazı desteği var mıdır?',
      answer: 'Evet, 7/24 nöbetçi acil iş makinesi servisimizle gece ve tatil günlerinde ani patlaklara 15 dakikada müdahale ediyoruz.'
    }
  ],
  'arazi-duzleme-ve-micir-dolgu-rehberi': [
    {
      question: 'Eğimli arazilerde kademelendirme (teraslama) nasıl yapılır?',
      answer: 'Arazinin doğal şev açısına uygun olarak kepçeyle 2 veya 3 kademeli yatay düzlükler açılır ve kademe geçişlerine taş tahkimatı veya istinat payı bırakılarak erozyon önlenir.'
    },
    {
      question: 'Otopark ve şantiye dolgusunda hangi malzeme tercih edilmelidir?',
      answer: 'Alt taşıyıcı tabaka için 0-60 kaba taş dolgu, ara tabaka için 0-38 mekanik stabilize ve en üst kaplama için 2 No kırmataş mıcır tercih edilmelidir.'
    },
    {
      question: 'Dolgu malzemesi serildikten sonra silindirle sıkıştırma gerekli midir?',
      answer: 'Evet, dolgunun ağır tonajlı tır veya kepçe altında batmaması için kademeli olarak serilip tandem silindir veya kompaktör ile sıkıştırılması (%95 modifiye proktor) şarttır.'
    },
    {
      question: 'Yalova köylerinde arsa tesviyesi kaç günde tamamlanır?',
      answer: 'Standart 500 - 1.000 m² bir parselin çalı temizliği, kot düşürmesi ve tesviyesi bekoloder kepçemizle ortalama 4-8 saat içinde tamamlanır.'
    }
  ],
  'yalova-su-kuyusu-acma-keson-kuyu': [
    {
      question: 'Keson kuyu ile sondaj kuyusu arasındaki fark nedir?',
      answer: 'Keson kuyu 1 - 1.5 metre çapında geniş beton büzlerle açılan, taban suyunun geniş hacimde dinlenmesini sağlayan ve pompaya çamur çektirmeyen kuyulardır. Sondaj ise derin ana kaya çatlaklarına ulaşır.'
    },
    {
      question: 'Beton büzler kazı sırasında mı yoksa kazı bittikten sonra mı indirilir?',
      answer: 'Yumuşak zeminlerde göçmeyi önlemek için kuyu açıldıkça büzler kepçe bomuyla üst üste geçmeli olarak indirilir; sert arazide ise tam derinliğe inildikten sonra dizilir.'
    },
    {
      question: 'Yalova ve köylerinde taban suyuna ortalama kaç metrede ulaşılır?',
      answer: 'Çiftlikköy sahil ve dere yataklarında 3-5 metrede bol suya ulaşılırken; Gacık, Kabaklı ve Safran gibi yüksek yamaçlarda 7-12 metre kazı gerekebilir.'
    },
    {
      question: 'Büzlerin dış çevresine neden dere çakılı dökülmelidir?',
      answer: 'Büzlerin dışındaki boşluğa 2 No dere çakılı döküldüğünde doğal bir filtre bariyeri oluşur; ince mil ve kilin kuyu içine dolması önlenerek kristal berraklığında su elde edilir.'
    }
  ],
  'kabakli-koyu-kepce-kiralama-arazi-duzleme': [
    {
      question: 'Kabaklı Köyü\'nde meyve bahçesi tesviyesi ağaçlara zarar vermeden yapılır mı?',
      answer: 'Evet, mini ekskavatör ve dar kovalı bekoloderlerimizle ağaç gövde ve ana köklerine yaklaşmadan aradaki hendek ve eğimleri güvenle tesviye ediyoruz.'
    },
    {
      question: 'Kabaklı\'nın taşlık bölgelerinde kırıcı ataşman gerekiyor mu?',
      answer: 'Bölgedeki bazı parsellerde yüzey kayalıkları çıkabilmektedir; bekoloderlerimizde monteli hidrolik kaya kırıcı ile tek seferde kırım yapıyoruz.'
    },
    {
      question: 'Çiftlikköy garajından Kabaklı Köyü\'ne kepçe kaç dakikada varır?',
      answer: 'Kabaklı Köyü garajımıza 6-8 km mesafede olup bekoloderimiz yaklaşık 15-20 dakika içinde arazinizdedir.'
    },
    {
      question: 'Araziden çıkan taş ve kökleri araziden tahliye ediyor musunuz?',
      answer: 'Evet, hafriyat kamyonlarımızla çıkan iri kaya ve kökleri ruhsatlı döküm sahasına taşıyoruz.'
    }
  ],
  'cukurkoy-su-kuyusu-kazma-ve-bahce-drenaji': [
    {
      question: 'Çukurköy arazisinde kuyu açmak için en uygun dönem hangisidir?',
      answer: 'Yaz sonu ve sonbahar başı (Ağustos-Ekim), yeraltı su seviyesinin en dipte olduğu dönemdir; bu dönemde açılan kuyular yılın 12 ayı asla susuz kalmaz.'
    },
    {
      question: 'Çukurköy bahçelerinde drenaj kanalı derinliği kaç cm olmalıdır?',
      answer: 'Meyve ağacı köklerinin çürümemesi için drenaj borusu 80-120 cm derinliğe döşenmeli ve eğimli vadiye tahliye edilmelidir.'
    },
    {
      question: 'Kuyu kazısı sırasında kepçe operatörü büzleri yerleştirebilir mi?',
      answer: 'Evet, bekoloder kazıcı koluna bağlanan özel zincir mapa sistemiyle 500-800 kg\'lık beton büzler milimetrik olarak kuyuya indirilir.'
    },
    {
      question: 'Çukurköy\'e servis için ek nakliye ücreti alınıyor mu?',
      answer: 'Bekoloder kendi yürür hızıyla intikal ettiği için çekici masrafı olmadan standart tarife üzerinden hizmet verilir.'
    }
  ],
  'derekoy-dere-islahi-ve-kanal-kazma-rehberi': [
    {
      question: 'Dereköy mevkiinde dere ıslahı kazısı nasıl planlanır?',
      answer: 'Dere debisi ve bahar taşkınları hesaplanarak dere yatağı genişletilir, taban balçığı temizlenir ve kenarlara trapez şev açılır.'
    },
    {
      question: 'Bölgede taş tahkimatı ve gabion temeli kazıyor musunuz?',
      answer: 'Evet, dere kenarındaki erozyonu önlemek amacıyla taş duvar ve gabion sepeti temel kazılarını projesine uygun kotta açıyoruz.'
    },
    {
      question: 'Dereköy arazilerinde yağmur suyu savak kanalı açılabilir mi?',
      answer: 'Tarlalarda su birikintisini önlemek için arazinin doğal eğimi boyunca V kesitli savak kanalları açarak dereye bağlıyoruz.'
    },
    {
      question: 'Bölgeye kepçe intikali ne kadar sürmektedir?',
      answer: 'Dereköy şantiyelerine Çiftlikköy garajımızdan yaklaşık 20 dakika içinde ulaşıyoruz.'
    }
  ],
  'gacik-koyu-zeytinlik-temizleme-ve-villa-temel-kazisi': [
    {
      question: 'Gacık Köyü zeytinliklerinde köklere zarar vermeden temizlik nasıl yapılır?',
      answer: 'Kauçuk paletli mini ekskavatörümüzün tesviye bıçağı ve dar tırmığı ile zeytin gövdesinden 1.5 metre uzakta kalarak yabani çalıları temizliyoruz.'
    },
    {
      question: 'Gacık yamaçlarında villa temeli kazarken istinat duvarı şart mıdır?',
      answer: 'Eğimli parsellerde üst kotun kaymasını önlemek için temel kazısıyla eş zamanlı kademeli istinat kazısı yapılmalıdır.'
    },
    {
      question: 'Gacık arazilerinde sert kaya çıkarsa kırıcı ataşmanınız hazır mıdır?',
      answer: 'Evet, makinelerimizde hidrolik kırıcı takılıdır; kaya blokları yerinde kırılarak temel alanı temizlenir.'
    },
    {
      question: 'Gacık Köyü\'ne keşif için randevu nasıl alınır?',
      answer: '0532 720 20 10 numaramızdan veya WhatsApp üzerinden ada/parsel veya konum göndererek aynı gün hızlı keşif & şeffaf fiyat talep edebilirsiniz.'
    }
  ],
  'laledere-koyu-bag-bahce-drenaji-ve-fosseptik-cukuru': [
    {
      question: 'Laledere Köyü\'nde kanalizasyonsuz evler için foseptik kuyu derinliği ne olmalıdır?',
      answer: 'Hane nüfusuna ve zemin süzme kapasitesine göre 3 - 4.5 metre derinlikte kazı açılarak beton büz halkaları yerleştirilir.'
    },
    {
      question: 'Killi Laledere toprağında süzdürme drenajı nasıl çalışır?',
      answer: 'Büzlerin etrafına 50 cm kalınlığında iri taş ve mıcır dolgusu yapılarak atık suyun toprağa filtrelenerek süzülmesi sağlanır.'
    },
    {
      question: 'Laledere bağ ve bahçelerinde su basmasını önleyecek hendek açımı kaç saat sürer?',
      answer: 'Ortalama 100-200 metre uzunluğundaki çevre drenaj hendeği bekoloderimizle 3-4 saat içinde tamamlanır.'
    },
    {
      question: 'Foseptik kapağı ve montajı kepçe ile mi yapılır?',
      answer: 'Evet, beton kapak ve baca yükseltme elemanları kepçemizin bomu ile yerine hassasça monte edilir.'
    }
  ],
  'ilyaskoy-arazi-tesviyesi-ve-tel-orgu-hafriyati': [
    {
      question: 'İlyasköy\'de parsel sınırına tel örgü ve çit direği çukurları kepçeyle açılabilir mi?',
      answer: 'Evet, 30 cm dar kova ataşmanımız ile direk mesafelerine göre muntazam temel hendekleri ve çukurlar açıyoruz.'
    },
    {
      question: 'İlyasköy tarlalarında tesviye işlemi sonrasında toprak verimi düşer mi?',
      answer: 'Hayır, önce üst 30 cm nebati toprak sıyrılarak kenara ayrılır; alt tesviye bittikten sonra verimli toprak tekrar yüzeye serilir.'
    },
    {
      question: 'Şantiyeye bekoloder intikali için çekici parası alınıyor mu?',
      answer: 'Hayır, lastik tekerlekli bekoloderlerimiz kendi yürüyüşüyle ek nakliye ücreti olmadan İlyasköy\'e intikal eder.'
    },
    {
      question: 'Zemin düzleme sonrası mıcır dolgu temin ediyor musunuz?',
      answer: 'Evet, anlaşmalı taş ocaklarından uygun fiyatlı kırmataş mıcır nakliyesini ve serimini paket olarak sunuyoruz.'
    }
  ],
  'denizcali-koyu-sanayi-depo-hafriyat-ve-forklift-kiralama': [
    {
      question: 'Denizçalı Köyü Taşköprü OSB bölgesinde tır boşaltma forklifti ne kadar sürede gelir?',
      answer: 'Garajımız Taşköprü-Denizçalı aksında olduğundan forkliftimiz 10-15 dakika içinde fabrikanıza ulaşır.'
    },
    {
      question: 'Çelik konstrüksiyon sanayi depoları için ankraj pabuç kazısı yapıyor musunuz?',
      answer: 'Evet, kolon pabuç temelleri lazer nivo kontrolünde projeye uygun kot ve ebatlarda hassas biçimde kazılır.'
    },
    {
      question: 'Tır yanaşma rampası kazısı ve mıcır dolgusu kaç günde tamamlanır?',
      answer: 'Fabrika sahasındaki zemin sıyırma, 0-38 mekanik dolgu ve tesviye işlemi 1 iş günü içinde tamamlanır.'
    },
    {
      question: 'Ağır sanayi yüklerinde forklift kaldırma tonajı nedir?',
      answer: '3 ton ve 5 ton kaldırma kapasiteli, yandan kaydırmalı (side-shifter) dizel forkliftlerimizle hizmet veriyoruz.'
    }
  ],
  'kadikoy-beldesi-villa-temeli-ve-havuz-kazisi': [
    {
      question: 'Kadıköy Beldesi\'nde havuz kazısı için mini kepçe mi bekoloder mi uygundur?',
      answer: 'Geniş açık arsada bekoloder hız avantajı sağlarken; dar sokaklı veya çevre bahçe duvarı yapılmış villalarda kauçuk paletli mini ekskavatör şarttır.'
    },
    {
      question: 'Havuz çukuru kazılırken perde beton payı kaç cm bırakılmalıdır?',
      answer: 'Kalıp çakımı, su yalıtımı ve dış drenaj borusu için net havuz ölçüsünden her kenarda 50-60 cm fazla kazı payı bırakılır.'
    },
    {
      question: 'Kadıköy villa şantiyelerinde çıkan hafriyat toprağı ne yapılır?',
      answer: 'Peyzajda kullanılacak nebati toprak bahçede ayrılır; kalan fazla moloz ve kil Yalova Belediyesi döküm sahasına taşınır.'
    },
    {
      question: 'Kadıköy\'e kepçe intikali kaç dakikada gerçekleşir?',
      answer: 'Yalova Merkez ve Çiftlikköy garajlarımızdan Kadıköy şantiyelerine yaklaşık 15 dakikada varış sağlanır.'
    }
  ],
  'samanli-koyu-kivi-bahcesi-tesviyesi-ve-derin-kuyu-kazimi': [
    {
      question: 'Samanlı kivi bahçelerinde direk çukurları ve tel montajı için kazı nasıl yapılır?',
      answer: 'Kivi direk hatları boyunca dar kepçe ataşmanıyla eşit aralıklı derin çukurlar açılarak beton dökümüne hazır hale getirilir.'
    },
    {
      question: 'Kivi bahçesinde yüksek su debisi için keson kuyu derinliği ne olmalıdır?',
      answer: 'Samanlı dere yatağı alüvyonunda 6-10 metre derinlikteki keson kuyular kivi sulama sezonunda günde onlarca ton kesintisiz su sağlar.'
    },
    {
      question: 'Köklerde su göllenmesini önlemek için drenaj kanalları nasıl açılır?',
      answer: 'Sıra aralarında %1 eğimli kılcal drenaj kanalları açılarak fazla taban suyu tahliye kanalına yönlendirilir.'
    },
    {
      question: 'Samanlı\'da kivi sökümü veya fidan yenileme hafriyatı yapıyor musunuz?',
      answer: 'Evet, eski kurumuş kivi köklerini söküyor ve riper ile toprağı 80 cm derinlikte patlatarak havalandırıyoruz.'
    }
  ],
  'safran-koyu-engebeli-arazi-duzleme-ve-kaya-kirma': [
    {
      question: 'Safran Köyü\'nün sert kayalık zeminlerinde hidrolik kırıcı ataşman nasıl çalışır?',
      answer: 'Bekoloderin arka koluna takılan yüksek darbeli hidrolik çekiç ile masif kayalar parçalanır ve kova ile temel dışına taşınır.'
    },
    {
      question: 'Engebeli Safran arazisinde kademeli istinat duvarı temeli nasıl açılır?',
      answer: 'Yamaç stabilitesi bozulmadan kademeli pabuç kazısı yapılır ve taş ustalarının harç dökebileceği temiz zemin hazırlanır.'
    },
    {
      question: 'Kırılan taş blokları şantiyede dolgu olarak kullanılabilir mi?',
      answer: 'Evet, kırılan sert taşlar alt tabaka dolgusu veya istinat duvarı arkası filtre dolgusunda değerlendirilerek maliyet düşürülür.'
    },
    {
      question: 'Safran Köyü\'ne keşif ve fiyat teklifi aynı gün verilebilir mi?',
      answer: 'Evet, Safran Köyü\'ne aynı gün içinde teknik ekibimiz gelerek zemin keşfi yapar ve net fiyat sunar.'
    }
  ],
  'hacimehmet-koyu-dere-islahi-ve-yagmur-suyu-kanali': [
    {
      question: 'Hacımehmet Köyü dere yataklarında balçık temizliği hangi kepçeyle yapılır?',
      answer: 'Uzun bomlu bekoloder veya ekskavatörümüzle dere setinden aşağı inmeden taban balçığı ve yabani sazlıklar temizlenir.'
    },
    {
      question: 'Yağmur suyu tahliye hendeklerine büz boru döşeme işlemi kepçeyle yapılır mı?',
      answer: 'Evet, hendek kazıldıktan sonra 300\'lük veya 400\'lük beton büzler kepçe sapanıyla hendek tabanına nizami eğimle döşenir.'
    },
    {
      question: 'Bahçe sınırlarına su birikmesini önleyen V kanal açımı ne kadar sürer?',
      answer: '100 metrelik standart bir çevre V kanalı operatörümüz tarafından ortalama 2-3 saat içinde tamamlanır.'
    },
    {
      question: 'Hacımehmet Köyü\'ne acil kepçe yönlendirme imkanı var mıdır?',
      answer: 'Yalova Merkez garajımıza çok yakın olan köye 15 dakika içinde acil iş makinesi sevk edebiliyoruz.'
    }
  ],
  'guneykoy-taslik-arazi-kirici-kepce-ve-derin-su-kuyusu': [
    {
      question: 'Güneyköy\'ün dik dağ yamaçlarında kepçe devrilme riski nasıl önlenir?',
      answer: 'Deneyimli operatörlerimiz ön yükleyici bıçağını ve arka ayak pabuçlarını zemine sabitleyerek üç nokta emniyetiyle güvenli kazı yapar.'
    },
    {
      question: 'Taşlık Güneyköy zemininde su kuyusu açarken kırıcı şart mıdır?',
      answer: 'İlk 2-3 metreden sonra kireçtaşı veya ana kaya çıktığı için hidrolik kırıcı ataşman ile taban kırılıp büzler indirilir.'
    },
    {
      question: 'Kaya kırma işlerinde fiyatlandırma nasıl belirlenir?',
      answer: 'Kırıcı ataşmanlı çalışma saatlik bazda veya metreküp/proje bazlı net fiyat üzerinden şeffafça sunulur.'
    },
    {
      question: 'Güneyköy orman sınırına tel örgü temel kazısı yapıyor musunuz?',
      answer: 'Evet, dik yamaç boyunca hat açılarak çit direği temelleri kepçemizle açılır.'
    }
  ],
  'sogucak-koyu-yamac-hafriyati-kademeli-bahce-tesviyesi': [
    {
      question: 'Soğucak Köyü yamaçlarında kademeli bahçe teraslaması nasıl yapılır?',
      answer: 'Üst kotun baskısını azaltmak için 1.5 - 2 metre yükseklikli kademeler oluşturulur ve her kademe tabanına ters eğim verilerek erozyon durdurulur.'
    },
    {
      question: 'Yamaç arazilerde mini ekskavatör nasıl güvenle çalışır?',
      answer: 'Kauçuk paletli mini kepçemiz düşük ağırlık merkezi ve dozer bıçağı desteğiyle %35 eğimli arazilerde dahi güvenle manevra yapar.'
    },
    {
      question: 'Teras tabanlarında su birikmesini önlemek için ne yapılır?',
      answer: 'Her terasın dip noktasına delikli drenaj borusu gömülüp mıcırla kaplanır ve su yan tahliye kanalına aktarılır.'
    },
    {
      question: 'Soğucak Köyü villalarında temel hafriyatı kaç günde biter?',
      answer: 'Orta büyüklükte bir villa temeli, kademeli şev kazısı dahil 1-2 iş günü içinde hafriyat kamyonuna yüklenerek teslim edilir.'
    }
  ]
};

// 2. Draft the 11 NEW high-value SEO & GEO Articles (Articles 20-30)
const newArticles = [
  {
    id: 'yalova-mini-kepce-dar-alan-kazilari',
    slug: 'yalova-mini-kepce-dar-alan-kazilari',
    title: 'Yalova Mini Kepçe Kiralama: Dar Sokak, Bahçe ve Bina İçi Kazı Rehberi',
    metaTitle: 'Yalova Mini Kepçe Kiralama: Dar Alan & Bahçe Kazısı | Adem Hafriyat',
    metaDesc: 'Yalova Merkez ve Çınarcık dar sokaklarında 1.5 - 3.5 tonluk kauçuk paletli mini kepçe kiralama. Bahçe, havuz, bodrum kırım ve sıfır zemin tahribatı.',
    excerpt: 'Geniş iş makinelerinin sığamadığı dar sokaklar, villa bahçeleri ve bina içi hafriyatlarda kauçuk paletli mini ekskavatör avantajları ve kullanım rehberi.',
    category: 'Mini Kepçe',
    author: 'Adem Hafriyat Saha Ekibi',
    date: '2026-04-01',
    readTime: '7 dk okuma',
    image: '/images/blog-mini-kepce.jpg',
    tags: [
      'Yalova Mini Kepçe',
      'Dar Alan Kazısı',
      'Mini Ekskavatör Kiralama',
      'Bahçe Kazma',
      'Çınarcık'
    ],
    faqs: [
      {
        question: 'Mini kepçe villa bahçe kapısından veya otopark girişinden geçebilir mi?',
        answer: 'Evet, filomuzdaki 1.8 ton ve 3.5 tonluk mini ekskavatörler 100 cm ile 155 cm genişliğindedir ve standart bahçe veya garaj kapılarından rahatça içeri girer.'
      },
      {
        question: 'Kauçuk paletler kilit parke, çim veya seramik zemine zarar verir mi?',
        answer: 'Hayır. Çelik paletli veya ağır lastikli makinelerin aksine kauçuk palet zemin basıncını geniş yüzeye yayar ve kilit parkeyi kırmaz, çim tabakasını ezmez.'
      },
      {
        question: 'Bina içi bodrum katında kırım ve hafriyat yapılabilir mi?',
        answer: 'Evet, kabini sökülebilen veya kompakt ebatlı mini kepçelerimiz bodrum katlara inerek beton şap kırma ve moloz yükleme işlemlerini hızlıca tamamlar.'
      },
      {
        question: 'Mini kepçe kiralama ücreti standart bekoloderden farklı mıdır?',
        answer: 'Mini kepçeler hafif çekici ile taşındığı ve düşük yakıt tükettiği için küçük bahçe ve kanal işlerinde toplam maliyet olarak çok daha ekonomiktir.'
      }
    ],
    content: `
## Yalova Şehir Dokusunda Dar Alan Kazı Zorlukları

Yalova Merkez'in Rüstempaşa, Fevziçakmak, Bahçelievler gibi köklü mahallelerinde veya Çınarcık ve Koru sahil sitelerinde sokaklar genellikle dar ve iki taraflı park eden araçlarla doludur. Bu noktalarda 9 tonluk büyük bir JCB bekoloderin sokağa girmesi bile trafiği kilitlerken; bir villa bahçesine girip havuz veya drenaj kazısı yapması fiziken imkansızdır.

İşte bu tür hassas ve sıkışık alanlarda **Adem Hafriyat Mini Kepçe (Mini Ekskavatör) Filosu** devreye girer.

---

## 1. Mini Ekskavatörlerin Teknik ve Operasyonel Üstünlükleri

### Sıfır Kuyruk Dönüşü (Zero Tail Swing)
Geleneksel ekskavatörler gövdesini döndürürken arka ağırlık çıkıntısı dışarı taşar ve duvarlara çarpar. Sıfır kuyruk dönüşlü mini makinelerimiz ise kendi palet izi genişliğinde 360 derece dönebilir. Bina cephesine 5 cm mesafede bile güvenle kazı yapabilir.

### Kauçuk Palet Güvencesi
Kilit taş, traverten veya granit kaplı bahçelerde lastikli büyük kepçelerin patinaj yapması zemin kaplamasını kırar ve çökertir. Kauçuk palet ise yumuşak temas sağlayarak zemine hiçbir zarar vermez.

### Değişken Kova Ataşmanları (20 cm - 100 cm)
- **20 - 30 cm Dar Kova:** Elektrik, doğalgaz ve fiber optik kanalları için milimetrik hendek açar.
- **50 - 60 cm Standart Kova:** Temel pabuçları ve su kuyusu kazıları için.
- **100 cm Tesviye / Drenaj Kovası:** Bahçe yüzeyini halı gibi düzlemek ve nebati toprak sermek için.
- **Hidrolik Kırıcı:** Beton merdiven, saha betonu ve kayalık zemin kırma işleri için.

---

## 2. Yalova'da Mini Kepçenin En Çok Tercih Edildiği Projeler

1. **Müstakil Villa Bahçe Düzenlemeleri:** Çim ekimi öncesi drenaj kanalı, toprak havalandırma ve ağaç çukuru açımı.
2. **Prefabrik ve Çelik Ev Pabuç Kazıları:** Arazinin doğal eğimini bozmadan yalnızca temel pabuçlarının nokta atışı kazılması.
3. **Bina İçi Şap ve Beton Kırımı:** Fabrika iç mekanlarında veya bodrumlarda eski beton zeminlerin hidrolik kırıcı ile kırılması.
4. **Site İçi Patlak Altyapı Onarımları:** Asfaltın veya bahçenin sadece patlayan boru kadar kısmının açılması ve geri kapatılması.

Adem Hafriyat olarak Yalova'nın tüm sokaklarına ve dar arazilerine özel mini kepçe çözümlerimizle hizmetinizdeyiz.
    `
  },
  {
    id: 'altinova-tersaneler-forklift-ve-agir-tonaj',
    slug: 'altinova-tersaneler-forklift-ve-agir-tonaj',
    title: 'Altınova Tersaneler Bölgesi Forklift Kiralama & Ağır Tonaj Elleçleme Rehberi',
    metaTitle: 'Altınova Tersaneler Forklift Kiralama: 3-5-7 Ton Dizel | Adem Hafriyat',
    metaDesc: 'Altınova tersaneleri, çelik konstrüksiyon ve gemi inşa sahaları için operatörlü ağır tonajlı forklift kiralama. Sac, profil, motor ve jeneratör tahliyesi.',
    excerpt: 'Altınova gemi inşa tersanelerinde sac, boru demetleri ve ağır makine bloklarının emniyetli taşınması için yüksek kapasiteli forklift kiralama rehberi.',
    category: 'Forklift Kiralama',
    author: 'Adem Hafriyat Lojistik Birimi',
    date: '2026-04-03',
    readTime: '8 dk okuma',
    image: '/images/blog-altinova-forklift.jpg',
    tags: [
      'Altınova Forklift',
      'Tersaneler Bölgesi',
      'Ağır Tonaj Forklift',
      'Gemi İnşa',
      'Taşköprü Sanayi'
    ],
    faqs: [
      {
        question: 'Altınova tersane bölgesine forklift intikal süresi ne kadardır?',
        answer: 'Altınova tersane hattına hazır çekici filomuz veya Taşköprü garajımız üzerinden 20-30 dakika içinde forklift sevk ediyoruz.'
      },
      {
        question: 'Tersanelerde çalışacak operatörlerin İSG ve ehliyet evrakları tam mıdır?',
        answer: 'Evet. Operatörlerimiz G sınıfı sürücü belgesi, mesleki yeterlilik ve tersane giriş İSG onay evraklarına eksiksiz sahiptir.'
      },
      {
        question: '5 ton ve üzeri ağır yükler (gemi sacı, makine dairesi blokları) için makineniz var mı?',
        answer: 'Evet, filomuzda 3 ton, 5 ton ve 7 tona kadar ağır sanayi tipi yüksek torklu dizel forkliftlerimiz bulunmaktadır.'
      },
      {
        question: 'Hafta sonu ve vardiyalı tersane operasyonlarında 7/24 hizmet veriyor musunuz?',
        answer: 'Evet, gemi indirme, yanaşma ve tır boşaltma vardiyalarına özel 7/24 kesintisiz operatörlü forklift sağlıyoruz.'
      }
    ],
    content: `
## Altınova Gemi İnşa ve Sanayi Havzasında Ağır Lojistik

Yalova'nın Altınova ilçesi, Türkiye'nin ve Avrupa'nın en büyük gemi inşa, bakım-onarım ve çelik konstrüksiyon merkezlerinden biridir. Tersanelerde sac levhalardan dev gemi motorlarına, hidrolik ünitelerden tonlarca ağırlıktaki boru demetlerine kadar aralıksız bir malzeme sirkülasyonu yaşanır.

Tersane sahasında yapılan en küçük operasyonel hata, milyonlarca dolarlık gemi parçalarının hasar görmesine veya vahim iş kazalarına yol açabilir. Bu sebeple tersanelerde çalışacak forkliftin hem **mekanik açıdan kusursuz** olması hem de **operatörünün ağır tonaj tecrübesine sahip olması** şarttır.

---

## 1. Altınova Tersanelerinde Kullanılan Forklift Donanımları

### Uzun Çatal Ataşmanı (2000 mm - 2400 mm)
Standart 1200 mm çatallar geniş gemi saclarını veya uzun boru demetlerini taşırken yükün sarkmasına ve devrilmesine yol açar. Filomuzda çift çatal kılıfı ve fabrika çıkışı uzun çatallı makineler yer alır.

### Entegre Çatal Kaydırma (Side-Shifter)
Makineyi ileri geri manevra yaptırmadan yükü milimetrik olarak sağa-sola kaydırabilme özelliği, tır kasalarındaki ve dar tersane atölyelerindeki istiflemelerde sıfır hata sağlar.

### Havalı ve Çift Ön Tekerlek Seçeneği
Tersane zeminleri genellikle çakıllı, cüruflu veya eğimli rampalardan oluşur. Geniş tabanlı dişli lastikler ağır yük altında makinenin batmasını önler.

---

## 2. Kiralama Modelleri: Saatlik mi, Vardiyalı mı, Aylık mı?

- **Saatlik ve Günlük Kiralama:** Şantiyenize tırla gelen sac plakaların, jeneratörlerin veya torna tezgahlarının 1-2 saatte indirilip atölyeye yerleştirilmesi için en ekonomik modeldir.
- **Haftalık / Proje Bazlı Kiralama:** Belirli bir blok montajı veya gemi donatım süresince operatörlü tam destek.
- **Aylık Operatörsüz Kiralama:** Kendi kadrolu personeli olan tersaneler için sıfır bakım maliyetli uzun dönem kiralama.

Adem Hafriyat olarak Altınova tersanelerindeki tüm ağır tonaj elleçleme ihtiyaçlarınızda 7/24 yanınızdayız.
    `
  },
  {
    id: 'foseptik-cukuru-kazma-ve-beton-buz-montaji',
    slug: 'foseptik-cukuru-kazma-ve-beton-buz-montaji',
    title: 'Yalova Foseptik Çukuru Kazma, Beton Büz Yerleşimi ve Montaj Kılavuzu',
    metaTitle: 'Yalova Foseptik Çukuru Kazma & Beton Büz Montajı | Adem Hafriyat',
    metaDesc: 'Yalova köyleri ve yazlık siteler için foseptik kuyu kazımı, beton büz dizimi, sızdırmazlık ve drenaj tabakası yapım rehberi. 15 dakikada keşif.',
    excerpt: 'Merkezi kanalizasyon hattı bulunmayan köy ve sitelerde çevre sağlığına uygun, koku yapmayan foseptik kuyusu açma ve beton büz montaj teknikleri.',
    category: 'Altyapı & Kazı',
    author: 'Adem Hafriyat Altyapı Uzmanı',
    date: '2026-04-05',
    readTime: '8 dk okuma',
    image: '/images/blog-foseptik.jpg',
    tags: [
      'Foseptik Kazma',
      'Beton Büz Montajı',
      'Yalova Altyapı',
      'Kanalizasyon',
      'Çiftlikköy Köyleri'
    ],
    faqs: [
      {
        question: 'Foseptik çukuru evden ve su kuyusundan ne kadar uzakta olmalıdır?',
        answer: 'Çevre sağlığı yönetmeliğine göre foseptik kuyusu bina temelinden en az 5 metre, içme ve kullanma suyu kuyularından ise en az 15-20 metre uzakta konumlandırılmalıdır.'
      },
      {
        question: 'Foseptik için hangi çapta beton büz tercih edilmelidir?',
        answer: 'Müstakil evler için 1000 mm (1 metre) çapındaki büzler yeterli olurken; 4-8 dairelik küçük sitelerde 1200 mm veya 1500 mm çaplı kuyu büzleri tercih edilir.'
      },
      {
        question: 'Sızdırmalı mı yoksa sızdırmaz foseptik mi yapılmalıdır?',
        answer: 'Yeraltı suyunun yüksek olduğu sahil bölgelerinde çevre kirliliğini önlemek için tabanı beton sızdırmaz fosseptik yapılır; killi dağ köylerinde ise kademeli süzdürme çakılıyla doğal drenaj uygulanabilir.'
      },
      {
        question: 'Foseptik çukuru kazısı ve büz montajı toplam ne kadar sürer?',
        answer: '3 - 4 metre derinliğindeki bir fosseptik çukurunun kazılması, büzlerin indirilmesi ve etrafının doldurulması bekoloderimizle 1 iş günü içinde tamamlanır.'
      }
    ],
    content: `
## Kanalizasyon Şebekesi Olmayan Parsellerde Doğru Foseptik Çözümü

Yalova'nın gelişmekte olan köylerinde (Laledere, Kabaklı, Gacık, Safran, Güneyköy) ve Çınarcık sırtlarındaki yeni müstakil villa projelerinde belediye ana kanalizasyon şebekesi her parsele ulaşamamaktadır. Bu arazilerde atık suyun sağlıklı tahliyesi için **foseptik (septik tank) kuyusu** açılması zorunludur.

Yanlış açılan veya büzleri hatalı döşenen foseptik kuyuları; yaz aylarında dayanılmaz kokulara, kuyu duvarının göçmesine veya yeraltı sularının kirlenmesine neden olur.

---

## 1. Foseptik Çukuru Kazımında Kritik Aşamalar

### 1. Doğru Kot ve Eğim Hesabı
Binanın atık su çıkış borusu (Ø150 veya Ø200 PVC) foseptik kuyusuna en az %2 eğimle bağlanmalıdır. Kuyu taban kazısı hesaplanırken boru giriş seviyesinin altında en az 2 metre depolama hacmi bırakılmalıdır.

### 2. Kademeli Emniyetli Kazı
Yumuşak ve dolgu zeminlerde 3-4 metre dik kuyu açmak toprak kayması riski taşır. Adem Hafriyat operatörlerimiz kuyu ağzını şevli genişleterek personelin güvenle büz montajı yapabileceği ortamı hazırlar.

### 3. Taban Beton / Mıcır Yastıklaması
Kuyunun tabanına 20 cm kalınlığında 2 No kırmataş mıcır serilir veya grobeton dökülerek büzlerin teraziye oturması sağlanır. Eğri konan büzler su sızdırır ve koku yapar.

---

## 2. Beton Büzlerin Yerleştirilmesi ve Dolgusu

- **Kepçe Bomu ile Hassas İndirme:** 800 kg ile 1.5 ton arasında değişen geçmeli beton büzler, özel kancalı zincirlerle kepçe koluna asılarak santimetrik hassasiyetle kuyuya indirilir.
- **Bileziklerin Birleşim Yalıtımı:** Büz ek yerleri çimento esaslı su yalıtım harcıyla sıvanır.
- **Etrafın Filtre Mıcırıyla Doldurulması:** Kuyu çeperi ile toprak arasındaki boşluğa hafriyat toprağı değil, drenaj çakılı doldurulmalıdır. Bu sayede toprak basıncının büzü kırması engellenir.
- **Beton Kapak ve Havalandırma Bacası:** En üste araç yüküne dayanıklı beton kapak konur ve koku gazlarının tahliyesi için 100 mm pimaş havalandırma borusu takılır.

Adem Hafriyat olarak Yalova köylerinde yüzlerce foseptik montajını başarıyla tamamladık. Keşif için bizi hemen arayın.
    `
  },
  {
    id: 'mustakil-villa-havuz-kazisi-ve-drenaj',
    slug: 'mustakil-villa-havuz-kazisi-ve-drenaj',
    title: 'Yalova Müstakil Villa Havuz Kazısı, Denge Tankı ve Bahçe Drenajı Rehberi',
    metaTitle: 'Yalova Villa Havuz Kazısı & Denge Tankı Hafriyatı | Adem Hafriyat',
    metaDesc: 'Yalova, Termal ve Kadıköy villa bahçelerinde skimmer ve taşmalı havuz kazısı. Denge tankı, makine dairesi ve çevre drenajı kazı standartları.',
    excerpt: 'Lüks müstakil konut projelerinde havuz çukuru, denge deposu ve makine dairesi kazılarının teraziye uygun, zemin yapısını bozmadan gerçekleştirilmesi.',
    category: 'Havuz & Peyzaj',
    author: 'Adem Hafriyat Saha Ekibi',
    date: '2026-04-07',
    readTime: '7 dk okuma',
    image: '/images/blog-havuz-kazisi.jpg',
    tags: [
      'Havuz Kazısı',
      'Yalova Villa',
      'Denge Tankı',
      'Bahçe Drenajı',
      'Kadıköy'
    ],
    faqs: [
      {
        question: 'Standart bir villa havuzu (4x8 metre) kazısı ne kadar sürede biter?',
        answer: 'Zemin durumuna ve giriş koşullarına bağlı olarak 4x8 metre (yaklaşık 1.50 m derinlik) bir havuz kazısı ve hafriyat yüklemesi 1 iş günü içinde tamamlanır.'
      },
      {
        question: 'Taşmalı havuz ile skimmer havuz arasında kazı farkı nedir?',
        answer: 'Taşmalı havuzlarda havuz çanağına ek olarak yanına en az 6-10 m³ hacminde bir denge tankı ve savak kanalı kazısı yapılması gerekir. Skimmer havuzda ise denge tankı kazısına ihtiyaç yoktur.'
      },
      {
        question: 'Havuz kazısı sırasında bahçe duvarları ve çim alan nasıl korunur?',
        answer: 'Gerektiğinde dar girişli kauçuk paletli mini kepçe kullanılır; palet altına koruyucu ahşap plakalar konularak mevcut çim ve kilit taş zemin korunur.'
      },
      {
        question: 'Havuz tabanına grobeton öncesi mıcır yastıklaması yapılmalı mıdır?',
        answer: 'Evet, taban suyunun betona baskı yapmasını önlemek için havuz tabanına 15-20 cm kalınlığında kırmataş mıcır serilmeli ve tahliye rögari bırakılmalıdır.'
      }
    ],
    content: `
## Yalova Müstakil Villa Projelerinde Havuz Kazısı Hassasiyeti

Yalova'nın Termal, Kadıköy, Safran ve Çiftlikköy bölgelerinde inşa edilen müstakil villalarda yüzme havuzları artık bir lüks değil, yaşam standardının temel bir parçasıdır. Ancak havuz kazısı, sıradan bir temel hafriyatından çok farklıdır; **santimetrik terazi, düzgün şakül ve zemin drenajı** gerektirir.

Hatalı veya aşırı kazılan bir havuz çukurunda gereksiz beton ve demir masrafı katlanırken; yetersiz kazıda kalıp sığmaz ve beton kırıcıyla kırım yapmak zorunda kalınır.

---

## 1. Havuz Kazısında Dikkat Edilmesi Gereken Kritik Kriterler

### 1. Kalıp ve Yalıtım Payı (+50 cm)
Eğer havuzunuzun net su ölçüsü 4x8 metre ve derinliği 1.50 metre olacaksa; kazı ebadı her kenardan en az 50 cm geniş tutularak 5x9 metre kazılmalıdır. Bu pay; perde kalıbının çakılması, dış su yalıtım membranının yapılması ve çevre drenaj borusunun döşenmesi için zorunludur.

### 2. Denge Tankı ve Makine Dairesi Kotu
Taşmalı havuzlarda denge tankı tabanı havuz tabanından daha derinde olmalıdır. Operatörümüz havuz çanağını kazarken aynı anda makine dairesi ve denge deposu çukurunu da projesindeki eksi kota indirir.

### 3. Zemin Suyuna Karşı Taban Drenajı (Kör Kuyu)
Kışın havuz boşaltıldığında taban suyunun havuz betonunu yukarı doğru kaldırmasını (hidrostatik patlama) engellemek için havuz tabanının altına drenaj borusu ve bir köşesine dalgıç pompa için kör kuyu açılmalıdır.

---

## 2. Çıkan Toprağın Değerlendirilmesi

Havuz kazısından ortalama 60 - 100 m³ toprak çıkar. Adem Hafriyat olarak:
- Üstteki temiz bahçe toprağını peyzaj alanına yayıyoruz.
- Derinden çıkan taşlı ve killi toprağı ise hafriyat kamyonlarımızla Yalova ruhsatlı döküm sahasına naklediyoruz.

Havuz projenizin kazı ve tesviye işleri için bizi arayarak yerinde hızlı keşif & şeffaf fiyat talep edebilirsiniz.
    `
  },
  {
    id: 'taskopru-ciftlikkoy-sanayi-tir-bosaltma-forklift',
    slug: 'taskopru-ciftlikkoy-sanayi-tir-bosaltma-forklift',
    title: 'Taşköprü ve Çiftlikköy Sanayi Tipi Tır Boşaltma ve Palet İstifleme Forklift Hizmetleri',
    metaTitle: 'Taşköprü & Çiftlikköy Tır Boşaltma Forklift Kiralama | Adem Hafriyat',
    metaDesc: 'Taşköprü Sanayi ve Çiftlikköy depolarında tır indirme, euro palet istifleme, makine tahliyesi. 15 dakikada operatörlü forklift adreste.',
    excerpt: 'Hammadde ve mamul tırlarının demuraj cezasına girmeden 30 dakikada boşaltılması, dar rampa manevraları ve emniyetli istifleme teknikleri.',
    category: 'Forklift Kiralama',
    author: 'Adem Hafriyat Lojistik Birimi',
    date: '2026-04-10',
    readTime: '6 dk okuma',
    image: '/images/blog-tir-bosaltma.jpg',
    tags: [
      'Tır Boşaltma',
      'Taşköprü Forklift',
      'Çiftlikköy Forklift',
      'Palet İstifleme',
      'Sanayi Lojistiği'
    ],
    faqs: [
      {
        question: 'Tır kapıya yanaştığında forklift ne kadar sürede şantiyede olur?',
        answer: 'Taşköprü Sanayi ve Çiftlikköy merkez garajımız sayesinde çağrınızdan sonra en geç 15 dakika içinde operatörlü forkliftimiz tırın başında olur.'
      },
      {
        question: 'Tam dolu bir kapalı kasa tır (33 palet) kaç dakikada boşaltılır?',
        answer: 'G sınıfı ehliyetli deneyimli operatörümüz ile standart euro paletli bir tır ortalama 25 ile 40 dakika içinde hasarsız boşaltılıp depoya dizilir.'
      },
      {
        question: 'Rampası olmayan açık sahada tırın her iki yanından indirme yapılabilir mi?',
        answer: 'Evet, forkliftlerimizin uzun çatalları ve yüksek direk (tripleks mast) özelliği sayesinde tır kasasının her iki cephesinden ve arkasından rahatça indirme yapılır.'
      },
      {
        question: 'Saatlik tır indirme kiralama bedeli nasıl hesaplanır?',
        answer: 'Tek tır indirme için sabit uygun paket fiyat veya saatlik tarife uygulanır; fabrika sabit forklift maliyetine katlanmadan yalnızca indirdiği tır kadar öder.'
      }
    ],
    content: `
## Sanayide Zaman Nakittir: Tır Boşaltmada Sıfır Gecikme

Yalova Taşköprü Sanayi Bölgesi ve Çiftlikköy çevresindeki fabrikalar, lojistik depolar ve yapı marketler için gelen tırların hızla tahliye edilmesi hayati önem taşır. Nakliye firmaları belirli bir bekleme süresinden sonra saatlik **demuraj (bekleme) cezası** yazar; daha da önemlisi fabrikanın hammadde eksikliği sebebiyle üretim bandı yavaşlayabilir.

İşletmelerin kendi bünyesinde tam zamanlı forklift ve şoför barındırması ise yüksek amortisman, sigorta, yakıt ve bakım maliyeti yaratır.

---

## 1. Adem Hafriyat Tır Boşaltma Modelinin Avantajları

### 1. 15 Dakikada Adreste Olma Garantisi
Taşköprü Sanayi Caddesi'ndeki stratejik garajımız sayesinde, tır şoförünüz otobandan çıkıp fabrikanıza yanaştığı anda bizi aramanız yeterlidir. Forkliftimiz tır kapakları açılana kadar kapınızda hazır bekler.

### 2. Milyonluk Yüklerde Sıfır Hasar Politikası
Çatalların palet tabanına doğru açıyla sokulmaması palet altındaki ürünlerin delinmesine yol açar. Operatörlerimiz tekstil balyaları, kimyasal variller, cam kasaları ve elektronik panolar gibi hassas yüklerin elleçlenmesinde yılların tecrübesine sahiptir.

### 3. Tripleks Direk ile Yüksek Tavan İstifleme
Makinelerimiz 4.5 metreye kadar kaldırma yüksekliğine (tripleks asansör mast) sahiptir. Tırdan indirilen paletler sadece yere bırakılmaz; depo raflarına nizami olarak yerleştirilir.

---

## 2. Ağır Sanayi Makinelerinin İndirilmesi

Sadece standart paletler değil; torna tezgahları, CNC makineleri, trafolar ve kazanlar gibi 3 - 5 tonluk yekpare ağır bloklar için vinç çağırmanıza gerek kalmadan yüksek tonajlı forkliftlerimizle indirme ve fabrika içine sürme hizmeti veriyoruz.

Taşköprü ve Çiftlikköy'deki işletmeniz için 7/24 hızlı forklift hattımızı kaydedin: **0532 720 20 10**.
    `
  },
  {
    id: 'yalova-kentsel-donusum-temel-hafriyati-ve-moloz',
    slug: 'yalova-kentsel-donusum-temel-hafriyati-ve-moloz',
    title: 'Yalova Kentsel Dönüşüm Temel Hafriyatı, Yıkım Sonrası Kazı ve Moloz Nakliyesi',
    metaTitle: 'Yalova Kentsel Dönüşüm Hafriyatı & Moloz Nakliyesi | Adem Hafriyat',
    metaDesc: 'Yalova kentsel dönüşüm projelerinde bina yıkımı sonrası temel kazısı, bodrum hafriyatı ve belediye döküm sahasına moloz nakliyesi çözümleri.',
    excerpt: 'Deprem dirençli Yalova için kentsel dönüşümde eski temel sökümü, fore kazık başı kırım, derin bodrum kazıları ve moloz taşıma standartları.',
    category: 'Kentsel Dönüşüm',
    author: 'Adem Hafriyat Zemin Uzmanı',
    date: '2026-04-12',
    readTime: '8 dk okuma',
    image: '/images/blog-kentsel-donusum.jpg',
    tags: [
      'Kentsel Dönüşüm',
      'Yalova Hafriyat',
      'Temel Kazısı',
      'Moloz Nakliyesi',
      'Yıkım Kazısı'
    ],
    faqs: [
      {
        question: 'Kentsel dönüşümde eski bina temeli sökülmeden yeni temel kazılabilir mi?',
        answer: 'Hayır. 1999 öncesi eski betonarme temeller ve pabuçlar hidrolik kırıcı ile tamamen sökülmeli, zemin ana taşıyıcı tabakaya kadar temizlenmelidir.'
      },
      {
        question: 'Yıkım sonrası çıkan molozlar nereye dökülür?',
        answer: 'Hafriyat ve moloz atıkları Yalova İl Özel İdaresi ve ilgili belediyenin belirlediği resmi lisanslı hafriyat döküm sahalarına taşıma izin belgeli kamyonlarla dökülür.'
      },
      {
        question: 'Komşu binalara bitişik kentsel dönüşüm kazısında göçük nasıl önlenir?',
        answer: 'Bitişik nizam parsellerde kademeli şev veya mini kazıklı iksa sistemi uygulanır; bekoloder operatörümüz komşu bina temeline sıfır mesafede titreşimsiz kazı yapar.'
      },
      {
        question: 'Kentsel dönüşüm hafriyatında metreküp hesabı nasıl yapılır?',
        answer: 'Lazer nivo veya harita mühendisi rölevesi ile mevcut zemin kotu ile temel taban kotu arasındaki hacim hesaplanır; şeffaf metreküp birim fiyatı üzerinden sözleşme yapılır.'
      }
    ],
    content: `
## Yalova'nın Deprem Gerçeği ve Kentsel Dönüşüm Hafriyatı

Marmara Depremi'ni yaşamış olan Yalova'da kentsel dönüşüm, binaların deprem güvenliği açısından en kritik konudur. Eski 3-4 katlı binaların yıkılıp yerine radye jeneral temelli, fore kazıklı veya perdeli yeni yapıların inşa edilmesi sürecinde ilk ve en önemli aşama **temel hafriyatıdır**.

Kentsel dönüşüm şantiyeleri genellikle etrafı dolu, bitişik nizam sokaklarda yer alır. Bu nedenle kazı esnasında çevre binaların temellerine, yoldaki doğalgaz-su şebekelerine asla zarar verilmemelidir.

---

## 1. Kentsel Dönüşüm Hafriyatında Uygulanan Adımlar

### 1. Eski Temel ve Subasman Sökümü
Yıkım bittikten sonra toprak altında kalan eski taş ve cüruflu beton temeller hidrolik kırıcılı kepçelerimizle parçalanır. Temel altındaki gevşek dolgu tabaka tamamen sıyrılarak sağlam ana zemine ulaşılır.

### 2. İksa ve Mini Kazık Başlarının Açılması
Derin bodrumlu yeni projelerde toprak kaymasını önlemek için çakılan fore kazık veya mini kazıkların başları kırıcı ataşmanlı mini ekskavatörle temizlenerek başlık kirişi betonuna hazır hale getirilir.

### 3. Radye Temel Kotunun Lazer Nivo ile Ayarlanması
Temel tabanının her noktasında aynı kotun yakalanması gerekir. Operatörümüz lazer alıcılı terazi kontrolüyle kazı yaparak müteahhit firmanın fazla grobeton dökmesini önler; binlerce liralık beton tasarrufu sağlar.

---

## 2. Çevreye Duyarlı Moloz Nakliyesi

Şehir merkezindeki şantiyelerden çıkan molozların taşınmasında:
- Kamyon kasalarına branda çekilerek yola taş ve toz dökülmesi engellenir.
- Lastik yıkama sistemiyle hafriyat kamyonlarının şehir içi asfalta çamur taşıması önlenir.
- Yalova Belediyesi döküm fişleri eksiksiz olarak müteahhit firmaya teslim edilir.

Adem Hafriyat olarak Yalova'nın geleceğini güvenle inşa eden kentsel dönüşüm projelerinde güçlü makine filomuzla hizmet veriyoruz.
    `
  },
  {
    id: 'cinarcik-koru-yazlik-site-altyapi-ve-kanalizasyon',
    slug: 'cinarcik-koru-yazlik-site-altyapi-ve-kanalizasyon',
    title: 'Çınarcık ve Koru Yazlık Sitelerde Kanalizasyon, Su Hattı ve Altyapı Kazıları',
    metaTitle: 'Çınarcık & Koru Yazlık Site Altyapı ve Kanalizasyon Kazısı | Adem Hafriyat',
    metaDesc: 'Çınarcık, Esenköy ve Koru beldelerindeki yazlık sitelerde patlak su borusu, kanalizasyon hattı yenileme, kilit taş söküm ve geri dolgu kazı hizmetleri.',
    excerpt: 'Yaz sezonu öncesi tatil sitelerinde su şebekesi patlakları, kanalizasyon ana arter bağlantıları ve site içi yolların bozulmadan tamiri.',
    category: 'Altyapı & Kazı',
    author: 'Adem Hafriyat Altyapı Uzmanı',
    date: '2026-04-15',
    readTime: '7 dk okuma',
    image: '/images/blog-cinarcik-altyapi.jpg',
    tags: [
      'Çınarcık Altyapı',
      'Koru Beldesi',
      'Yazlık Site Kazısı',
      'Kanalizasyon Yenileme',
      'Su Hattı Patlağı'
    ],
    faqs: [
      {
        question: 'Yaz sezonu öncesi sitelerde su ve kanalizasyon hattı kontrolü nasıl yapılır?',
        answer: 'Basınç testi veya gözlemle patlak şüphesi olan hatlar tespit edilir; kepçemizle kilit parkeler özenle sökülerek arızalı boru noktası açılır.'
      },
      {
        question: 'Site içi yollardaki kilit parke taşları kazıdan sonra tekrar döşenebilir mi?',
        answer: 'Evet. Operatörümüz taşları kırmadan kenara istifler; boru değişimi sonrası kademeli mıcır dolgu yapılıp kilit parkeler eski haline getirilir.'
      },
      {
        question: 'Çınarcık sahil bandında yüksek tuzlu yeraltı suyu borulara zarar verir mi?',
        answer: 'Evet, eski pik ve demir borular tuzlu sahil zemininde çürür. Kazı sırasında bunları yüksek yoğunluklu polietilen (HDPE) veya koruge borularla yeniliyoruz.'
      },
      {
        question: 'Site yönetimi acil patlak durumunda aynı gün kepçe çağırabilir mi?',
        answer: 'Evet, Çınarcık ve Koru bölgesine özel nöbetçi mobil kepçemizle acil arıza çağrılarına aynı gün birkaç saat içinde müdahale ediyoruz.'
      }
    ],
    content: `
## Çınarcık ve Koru Sahil Şeridinde Yazlık Sitelerin Altyapı İhtiyacı

Yalova'nın turizm kalbi olan Çınarcık, Esenköy, Teşvikiye ve Koru beldeleri; yaz aylarında nüfusu on katına çıkan onlarca kooperatif ve tatil sitesine ev sahipliği yapar. Kış boyunca boş kalan bu sitelerde don olayları, yeraltı suyu hareketleri veya eskiyen borular sebebiyle bahar aylarında **su patlakları ve kanalizasyon tıkanıklıkları** baş gösterir.

Yaz sezonu başlamadan önce site sakinleri gelmeden bu altyapının hızla, çevreye en az rahatsızlığı vererek çözülmesi gerekir.

---

## 1. Yazlık Sitelerde Karşılaşılan Temel Altyapı Problemleri

### 1. Kış Donu Sebebiyle Patlayan Ana Su Hatları
Derine gömülmemiş temiz su boruları kış aylarında donarak çatlar. Baharda vanalar açıldığında sitenin yolları ve bahçeleri su altında kalır. Dar kovalı kepçemizle patlak nokta hızla açılır ve tesisat ustasına kuru çalışma ortamı sağlanır.

### 2. Ağaç Köklerinin Tıkadığı Kanalizasyon Hatları
Yıllar içinde büyüyen çam ve palmiye kökleri beton büzlerin ek yerlerinden içeri girerek kanalizasyon borusunu tamamen tıkar. Eski beton hatlar sökülerek kök geçirmez modern koruge borularla yenilenir.

### 3. Foseptik Taşmaları ve Terfi İstasyonu Kazıları
Kanal kotu düşük kalan sitelerde atık suyu belediye ana kollektörüne basmak için dalgıç pompalı terfi istasyonu kuyusu açılması gerekir.

---

## 2. Zemin Peyzajını ve Kilit Taşları Koruyan Çalışma Prensibi

Yazlık sitelerde en büyük endişe, kepçenin bahçeleri ve yolları harabeye çevirmesidir. Adem Hafriyat olarak:
- Lastik izi bırakmayan makineler tercih ediyoruz.
- Kilit parke taşlarını elle söküp paletlere diziyoruz.
- Hendek kapatılırken 0-38 mekanik malzeme ile tokmaklayarak sonradan çökme (oturtma) oluşmasını engelliyoruz.

Çınarcık ve Koru'daki sitenizin altyapı bakım ve kazı işleri için site yönetimlerine özel avantajlı keşif hizmetimizden faydalanın.
    `
  },
  {
    id: 'otopark-ve-santiye-zemin-dolgusu-micir-sikistirma',
    slug: 'otopark-ve-santiye-zemin-dolgusu-micir-sikistirma',
    title: 'Otopark ve Şantiye Zemin Dolgusu: Mıcır Serme, Loder Tesviye ve Kompaksiyon',
    metaTitle: 'Otopark & Şantiye Zemin Dolgusu: Mıcır Serme & Sıkıştırma | Adem Hafriyat',
    metaDesc: 'Yalova ticari otopark, fabrika sahası ve şantiye yollarında 0-38 mekanik stabilize dolgu, mıcır serme ve silindirle zemin sıkıştırma çözümleri.',
    excerpt: 'Ağır tonajlı kamyon ve tırların batmasını önleyen profesyonel zemin dolgusu, malzeme serme teknikleri ve su drenajı eğimleri.',
    category: 'Dolgu & Tesviye',
    author: 'Adem Hafriyat Saha Ekibi',
    date: '2026-04-18',
    readTime: '7 dk okuma',
    image: '/images/blog-micir-dolgu.jpg',
    tags: [
      'Zemin Dolgusu',
      'Mıcır Serme',
      'Otopark Kazısı',
      'Mekanik Stabilize',
      'Kompaksiyon'
    ],
    faqs: [
      {
        question: 'Otopark zemininde çamurlaşmayı ve batmayı önlemek için dolgu kalınlığı ne olmalıdır?',
        answer: 'Binek araç otoparkları için 15-20 cm stabilize mıcır yeterli olurken; ağır tır ve iş makinesi sahalarında en az 35-50 cm kademeli kırmataş dolgu yapılmalıdır.'
      },
      {
        question: 'Dolgu yapılmadan önce ham toprağın sıyrılması şart mıdır?',
        answer: 'Evet. Bitkisel nebati çamur tabakası sıyrılmadan üzerine mıcır dökülürse, yağmurda mıcır çamura batar ve zemin kısa sürede tekrar balçık haline gelir.'
      },
      {
        question: 'Balıksırtı eğim ne anlama gelir ve neden önemlidir?',
        answer: 'Geniş açık otoparklarda yağmur suyunun göllenmesini önlemek için yol ekseninden her iki yana %1.5 - %2 eğim verilir; su doğrudan kenar hendeklerine akar.'
      },
      {
        question: 'Mıcır ve stabilize malzeme teminini de siz sağlıyor musunuz?',
        answer: 'Evet, Yalova ve çevresindeki kaliteli taş ocaklarından nakliye dahil anahtar teslim malzeme serme ve sıkıştırma hizmeti veriyoruz.'
      }
    ],
    content: `
## Sağlam Bir Üst Yapı İçin Tavizsiz Zemin Dolgusu

Yalova'da inşa edilen fabrika stok sahalarında, lojistik tır parklarında, açık oto pazarlarında veya şantiye servis yollarında en sık yaşanan felaket; yağmurlu kış aylarında ağır kamyonların zemine gömülüp batmasıdır. Zeminin batması, çekici masraflarına, yük gecikmelerine ve prestij kaybına yol açar.

Bu sorunun yegane çözümü, toprağın üzerine gelişigüzel mıcır dökmek değil; **mühendislik kurallarına uygun katmanlı dolgu ve sıkıştırma (kompaksiyon)** yapmaktır.

---

## 1. Kusursuz Bir Zemin Dolgusunun 4 Katmanı

### 1. Zemin Sıyırma (Reglaj)
Arazinin en üstündeki yumuşak, organik ve su tutan 20-30 cm'lik gevşek toprak tabakası bekoloderimizin ön bıçağıyla sıyrılarak uzaklaştırılır. Sert taban ortaya çıkarılır.

### 2. Blokaj / Kaba Taş Tabakası (0-60 mm veya Tüvenan)
Bataklık veya yumuşak arazilerde taşıyıcılığı artırmak için tabana 20-30 cm kaba kırmataş blokaj serilir. Bu tabaka yükü geniş tabana yayar.

### 3. Mekanik Stabilize Tabakası (0-38 mm)
İnce taş tozu ve orta boy kırmataş karışımı olan 0-38 mekanik malzeme, su ile ıslatılarak serilir. Taş tozu boşlukları doldurarak adeta bir doğal beton kilitlenmesi oluşturur.

### 4. Yüzey Kaplama Mıcırı (1 No veya 2 No Kırmataş)
Araç tekerleklerine çamur yapışmasını engelleyen, toz tutmayan ve temiz bir görünüm sağlayan 10 cm kalınlığında kırmataş serilerek son reglaj yapılır.

---

## 2. Bekoloder ve Loder ile Hassas Tesviye

Geniş otoparklarda kepçemizin 4'ü 1 arada açılır ön dozer bıçağıyla malzeme eşit kalınlıkta yayılır. Lazer nivo ve eğim kontrolü yapılarak arazide su göllenmesi oluşması engellenir.

Adem Hafriyat olarak Yalova genelinde otopark, şantiye yolu ve fabrika sahası dolgu işlerinizi en uygun tonajlı malzeme ve profesyonel işçilikle teslim ediyoruz.
    `
  },
  {
    id: 'tarimsal-arazi-islahi-kivi-ve-zeytinlik-tesviye',
    slug: 'tarimsal-arazi-islahi-kivi-ve-zeytinlik-tesviye',
    title: 'Yalova Tarımsal Arazi Islahı: Kivi ve Zeytinlik Tesviye, Kök Sökümü ve Kanal Kazısı',
    metaTitle: 'Yalova Tarımsal Arazi Islahı: Kivi & Zeytinlik Tesviyesi | Adem Hafriyat',
    metaDesc: 'Yalova kivi bahçeleri ve zeytinliklerde eski ağaç kökü sökümü, riperle derin toprak patlatma, damla sulama ve drenaj kanalı kazı hizmetleri.',
    excerpt: 'Yalova\'nın dünyaca ünlü kivi ve zeytin üretiminde verimi artıran modern arazi tesviyesi, taban suyu tahliyesi ve fidan dikim çukuru açımı.',
    category: 'Tarımsal Islah',
    author: 'Adem Hafriyat Zemin Uzmanı',
    date: '2026-04-20',
    readTime: '8 dk okuma',
    image: '/images/blog-tarimsal-islah.jpg',
    tags: [
      'Tarımsal Islah',
      'Kivi Bahçesi Tesviye',
      'Zeytinlik Islahı',
      'Kök Sökümü',
      'Samanlı'
    ],
    faqs: [
      {
        question: 'Eski verimsiz fidan ve ağaç kökleri kepçe ile nasıl sökülür?',
        answer: 'Bekoloder kazıcı koluna takılan dar kova veya riper ucuyla ana kökler derinlemesine kesilir ve ağaç kök gövdesiyle birlikte tek hamlede topraktan sökülür.'
      },
      {
        question: 'Riper ile derin toprak patlatma (altüst etme) ne işe yarar?',
        answer: 'Yıllarca traktör geçişiyle 50-60 cm derinde oluşan geçirimsiz sert taban (pulluk tabanı) kırılır; böylece kivi fidanlarının kökleri derine iner ve su drenajı sağlanır.'
      },
      {
        question: 'Kivi bahçesinde fidan dikim çukurları ne kadar sürede açılır?',
        answer: 'Kepçemizin dar kovası ile 1 dekarlık arazideki yaklaşık 60-80 adet dikim çukuru 2-3 saat içinde nizami aks ölçüsünde açılır.'
      },
      {
        question: 'Meyilli arazide zeytin ağaçları için teraslama yapmak erozyonu önler mi?',
        answer: 'Evet, yamaç boyunca yapılan kademeli teraslama yağmur sularının toprağı süpürmesini engeller ve her terasta ağacın dibine su birikmesini sağlar.'
      }
    ],
    content: `
## Yalova'nın Yeşil Altını: Kivi ve Zeytin Bahçelerinde Zemin Hazırlığı

Yalova, Türkiye kivi üretiminin yaklaşık %40'ını karşılayan ve Marmara'nın en kaliteli zeytinlerine sahip bereketli topraklara sahiptir. Ancak kivi de zeytin de kök yapısı açısından **zemin kusurlarını asla affetmeyen** hassas bitkilerdir.

Kivi taban suyunun göllenmesini sevmez; kökleri havasız kalarak kurur. Zeytin ise dik ve taşlık yamaçlarda tutunabilmek için sağlam kademelere ve derin toprak çatlatmasına ihtiyaç duyar.

---

## 1. Tarımsal Islah Sürecinde Uygulanan Teknikler

### 1. Eski Kök ve Taş Temizliği
Yeni bir kapama kivi veya zeytin bahçesi kurmadan önce arazideki eski kurumuş kavak, söğüt veya çalı kökleri kepçeyle temizlenir. Toprak altındaki iri taş blokları yüzeye çıkarılarak arazi sınırına dizilir.

### 2. Riper ile Taban Taşı Kırma
Toprağın 50 cm altındaki geçirimsiz killi sert tabakayı (hardpan) kırmak için riper kullanılır. Bu sayede yağmur suyu toprağın derinliklerine süzülür ve fidan köklerinin boğulması engellenir.

### 3. Organik Nebati Toprak Korunarak Tesviye
Operatörümüz üstteki 25-30 cm verimli humuslu toprağı sıyırıp kenara alır; alt kottaki çukurları doldurup düzelttikten sonra verimli toprağı tekrar yüzeye homojen yayar.

---

## 2. Damla Sulama ve Drenaj Hendekleri

- **Ana Drenaj Kanalı:** Kış taşkınlarında bahçeyi su basmaması için arazinin en düşük kenarına 1.20 m derinliğinde açık tahliye hendekleri açıyoruz.
- **Damla Sulama Boru Kanalları:** Ana boruların donmaması ve traktör tekerleğiyle patlamaması için 60 cm derinlikte kılcal boru kanalları kazıyoruz.

Adem Hafriyat olarak Samanlı, Gacık, Kocadere, Çiftlikköy ve Subaşı'ndaki üreticilerimizin topraktan maksimum verim alması için tarımsal kazı desteği sunuyoruz.
    `
  },
  {
    id: 'acil-patlak-su-borusu-ve-altyapi-tamirat-kazisi',
    slug: 'acil-patlak-su-borusu-ve-altyapi-tamirat-kazisi',
    title: '7/24 Acil Patlak Su Borusu ve Kanalizasyon Arıza Kazı Müdahalesi — Yalova',
    metaTitle: '7/24 Acil Patlak Su Borusu & Kanalizasyon Kazısı | Adem Hafriyat',
    metaDesc: 'Yalova genelinde gece ve gündüz acil patlak su borusu, kanalizasyon çökmesi ve altyapı arızalarına 15 dakikada kepçe müdahalesi. 7/24 kesintisiz servis.',
    excerpt: 'Ani su baskınları, yol çökmeleri ve patlayan ana şebeke borularında tesisatçıların müdahale edebilmesi için acil dar hendek kazımı ve su tahliyesi.',
    category: 'Acil Altyapı',
    author: 'Adem Hafriyat Acil Müdahale Ekibi',
    date: '2026-04-22',
    readTime: '6 dk okuma',
    image: '/images/blog-acil-tamir.jpg',
    tags: [
      'Acil Kepçe Servisi',
      'Patlak Su Borusu',
      'Kanalizasyon Arıza',
      'Yalova Acil Kazı',
      '7/24 Hizmet'
    ],
    faqs: [
      {
        question: 'Gece veya tatil gününde acil arama yaptığımda kepçe ne kadar sürede gelir?',
        answer: 'Nöbetçi operatörümüz ve hazır bekoloderimiz sayesinde çağrınızdan sonra Yalova Merkez, Çiftlikköy ve Taşköprü bölgelerine ortalama 15-20 dakika içinde ulaşıyoruz.'
      },
      {
        question: 'Borunun tam yerini bilmediğimizde patlak nasıl bulunur?',
        answer: 'Operatörümüz su çıkış noktası ve şebeke hattı istikametine göre kademeli ve hassas kazı yaparak diğer hatlara zarar vermeden patlak boruyu açığa çıkarır.'
      },
      {
        question: 'Kazı çukuruna dolan suyun tahliyesi nasıl yapılır?',
        answer: 'Aracımızda hazır bulunan yüksek debili dalgıç ve benzinli motopomp sistemiyle kazı çukurundaki su tahliye edilerek tesisatçıya kuru çalışma ortamı sağlanır.'
      },
      {
        question: 'Boru tamiri bittikten sonra çukur kapatılıp asfalt/kilit taş tamir edilir mi?',
        answer: 'Evet. Boru etrafı ince kumla yastıklandıktan sonra 0-38 malzeme sıkıştırılır ve üst kilit taş kaplaması yapılarak yol trafiğe açılır.'
      }
    ],
    content: `
## Altyapı Arızalarında Saniyelerin Önemi

Şehir şebekesindeki ani basınç artışları, zemin oturmaları veya don olayları sebebiyle bir ana su borusu patladığında; dakikalar içinde tonlarca su çevre binaların bodrum katlarına dolabilir, yolun altını oyarak ani asfalt çökmelerine yol açabilir. Aynı şekilde çöken bir kanalizasyon hattı çevre sağlığını tehdit eden bir krize dönüşür.

Bu tür durumlarda en büyük engel; tesisat ustasının boruya ulaşamamasıdır. Kazmanın kürekle saatler süreceği bu kritik noktada **Adem Hafriyat 7/24 Acil İş Makinesi Servisi** devreye girer.

---

## 1. Acil Kazı Müdahale Protokolümüz

### 1. 15 Dakikada Olay Yerine İntikal
Yalova'nın merkez noktasındaki garajımızda gece-gündüz nöbetçi operatörümüz hazır bekler. Çağrı merkezimize gelen ihbarla birlikte makinemiz tepe lambası eşliğinde derhal arıza noktasına hareket eder.

### 2. Diğer Altyapı Hatlarının Emniyeti
Su patlağının olduğu yerde genellikle elektrik kablosu, doğalgaz hattı veya fiber optik kablolar da geçer. Operatörümüz dişsiz hassas tesviye kovasıyla diğer şebekelere temas etmeden kontrollü sıyırma kazısı yapar.

### 3. Tesisat Ustasına Güvenli Çalışma Havuzu
Boruya ulaşıldığında etrafı en az 1 metre genişletilir ve şev verilerek ustanın göçük tehlikesi olmadan boruyu manşon veya kaynakla tamir edebileceği emniyetli ortam oluşturulur.

---

## 2. Tamirat Sonrası Zemin Restorasyonu

Tamirat tamamlandıktan sonra suyun tekrar patlamasını önlemek için boru üzerine doğrudan sert taş veya hafriyat atılmaz.
1. Borunun altına ve üstüne 15 cm ince taş tozu yastıklaması yapılır.
2. Üzerine uyarı ikaz bandı çekilir.
3. Stabilize malzeme serilerek kompaktörle dövülür ve yol çökmeyecek şekilde teslim edilir.

Yalova'da 7/24 acil kepçe ve kazı hattımız: **0532 720 20 10**.
    `
  },
  {
    id: '2026-yalova-kepce-ve-forklift-kiralama-fiyatlari',
    slug: '2026-yalova-kepce-ve-forklift-kiralama-fiyatlari',
    title: '2026 Yalova Kepçe ve Forklift Kiralama Fiyat Analizi: Saatlik, Günlük ve Proje Bazlı Maliyet Rehberi',
    metaTitle: '2026 Yalova Kepçe & Forklift Kiralama Fiyatları | Adem Hafriyat',
    metaDesc: '2026 güncel Yalova kepçe kiralama, forklift kiralama, temel kazısı ve hafriyat fiyat analizi. Saatlik, günlük ve anahtar teslim maliyet kriterleri.',
    excerpt: 'Yalova genelinde iş makinesi kiralarken bütçenizi koruyacak fiyat dinamikleri, operatör ve yakıt dahil maliyetler ve hızlı keşif & şeffaf fiyat rehberi.',
    category: 'Fiyat & Maliyet',
    author: 'Adem Hafriyat Mali İşler Birimi',
    date: '2026-04-25',
    readTime: '8 dk okuma',
    image: '/images/blog-fiyat-rehberi.jpg',
    tags: [
      'Kepçe Kiralama Fiyatları',
      'Yalova Forklift Fiyatları',
      '2026 Hafriyat Fiyat',
      'Saatlik Kepçe Ücreti',
      'Maliyet Analizi'
    ],
    faqs: [
      {
        question: 'İş makinesi kiralama fiyatlarına operatör ve yakıt dahil midir?',
        answer: 'Saatlik ve günlük kiralamalarda standart olarak profesyonel G sınıfı operatör ve mazot gideri fiyata dahildir; iş sahibine ek sürpriz masraf çıkarılmaz.'
      },
      {
        question: 'Bekoloder kepçe ile mini ekskavatör arasında saatlik ücret farkı var mıdır?',
        answer: 'Genellikle yakın tarifelere sahiptir ancak mini kepçeler çekici ile nakledildiği için proje süresine göre toplam maliyet avantajı sağlayabilir.'
      },
      {
        question: 'Fiyat teklifi almadan önce şantiyeye gelip keşif yapıyor musunuz?',
        answer: 'Evet, Yalova, Çiftlikköy ve Taşköprü genelinde şantiyenize gelerek yapılacak kazı veya dolgu işini yerinde inceliyor, %100 hızlı keşif & şeffaf fiyat raporu veriyoruz.'
      },
      {
        question: 'Büyük hafriyat veya uzun süreli projelerde iskonto uygulanır mı?',
        answer: 'Evet, haftalık, aylık veya götürü (anahtar teslim) temel projelerinde saatlik tarifeye kıyasla önemli oranda toplu proje iskontosu sağlanmaktadır.'
      }
    ],
    content: `
## 2026 Yılında İş Makinesi Kiralarken Doğru Bütçe Nasıl Yapılır?

İster bir villa temeli kazdıracak bir müteahhit olun, ister tarlasını düzeltecek bir çiftçi ya da tır boşaltacak bir fabrika müdürü... Bir işe başlamadan önce ilk sorulan soru: **"Bu iş bana kaça mal olur?"**

Hafriyat ve iş makinesi sektöründe sabit bir fiyat listesi yerine işin niteliğine göre şekillenen dinamik fiyatlama uygulanır. Fiyatı doğrudan etkileyen unsurları bilmek, iş sahiplerinin gereksiz binlerce lira fazla ödemesini engeller.

---

## 1. Kiralama Fiyatını Belirleyen Temel Kriterler

### 1. Kiralama Modeli (Saatlik, Günlük, Götürü)
- **Saatlik Kiralama:** 2-4 saat sürecek küçük kanal, çit çukuru veya tek tır boşaltma işleri için en uygun modeldir.
- **Günlük Kiralama (8 Saatlik Vardiya):** Villa temeli, havuz kazısı veya tarla tesviyesi gibi tam gün süren operasyonlarda saatlik fiyata kıyasla %20-30 avantaj sağlar.
- **Götürü / Anahtar Teslim Proje:** Kazı, hafriyatın kamyona yüklenmesi, döküm sahası harcı ve mıcır dolgunun tek paket fiyat üzerinden sözleşmeye bağlanmasıdır.

### 2. Ataşman İhtiyacı (Kırıcı, Dar Kova, Riper)
Kaya kırma veya kalın beton sökme işlerinde hidrolik kırıcı ataşmanı kullanılır. Kırıcının yüksek hidrolik güç harcaması ve aşınma payı sebebiyle standart kovalı kazıya göre farklı birim fiyat uygulanır.

### 3. Zemin Türü ve Coğrafi Konum
Çiftlikköy merkezdeki bir zemin ile Güneyköy'ün dağlık kayalık arazisindeki çalışma temposu aynı değildir. Sert kayalıkta iş makinesinin ilerleme hızı düşerken yakıt sarfiyatı artar.

---

## 2. Adem Hafriyat Şeffaf Fiyat Politikası

Sektörde en çok şikayet edilen konu; işe başlarken düşük fiyat verip işin ortasında "mazot bitti, kırıcı parası ekstradır, nakliye ücreti verin" gibi ek masraflar çıkarılmasıdır.

Adem Hafriyat olarak:
- **Net Fiyat Garantisi:** Sözleşmede veya telefonda ne konuşulduysa o geçerlidir.
- **Gizli Masraf Yok:** Operatör, mazot ve makine amortismanı teklife dahildir.
- **Yerinde Keşif & Net Fiyatlandırma:** İşinize gelip bakıyor, nakliye ve yakıt dahil en uygun makineyi ve en net süreyi şeffafça belirliyoruz.

2026 yılı güncel şantiye fiyatlarımız için bizi hemen arayın: **0532 720 20 10**.
    `
  }
];

// 3. Merge FAQs into existing 19 posts
existingPosts.forEach(post => {
  if (existingFaqs[post.id]) {
    post.faqs = existingFaqs[post.id];
  }
});

// 4. Combine all 30 posts
const fullLibrary = [...existingPosts, ...newArticles];

console.log('Total blog posts assembled:', fullLibrary.length);

// 5. Write to data/blog.js cleanly formatted
const outputCode = `/**
 * Blog / Makaleler Veri Modeli - Adem Hafriyat
 * %100 İnsan Editör Kalitesinde, Kapsamlı, Gerçek Şantiye Deneyimli SEO & GEO Makaleleri (30 Makale)
 * Her Makale İçin Özel Teknik ve Coğrafi (GEO) SSS / FAQ Bileşenleri ve Schema.org Verisi
 */

module.exports = ${JSON.stringify(fullLibrary, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'data', 'blog.js'), outputCode, 'utf8');
console.log('Successfully written data/blog.js with all 30 articles and faqs!');

