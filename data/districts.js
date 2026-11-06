/**
 * Yalova ve Tüm İlçeleri, Mahalleleri, Köyleri ve Sanayi Bölgeleri Veri Modeli
 * %100 Yerel (GEO) Odaklı ve SEO Uyumlu
 */

module.exports = [
  {
    id: 'ciftlikkoy',
    slug: 'ciftlikkoy',
    name: 'Çiftlikköy',
    title: 'Çiftlikköy Kepçe Kiralama & Hafriyat Hizmetleri',
    h1: 'Çiftlikköy Kepçe Kiralama & Operatörlü Hafriyat Hizmetleri',
    metaTitle: 'Çiftlikköy Kepçe Kiralama & Forklift | Adem Hafriyat 7/24',
    metaDesc: 'Çiftlikköy sahil, siteler, Sultaniye ve tüm köylerinde acil kanal kazma, bina temel kazısı, arazi düzleme ve kepçe kiralama. 15 dakikada sahada!',
    excerpt: 'Çiftlikköy ilçe merkezi, sahil şeridi, Sultaniye, Siteler ve bağlı 7 köyün tamamında profesyonel bekoloder kepçe, mini ekskavatör ve forklift kiralama.',
    priority: 1,
    tag: 'En Yoğun Hizmet Bölgesi',
    responseMinutes: 15,
    distanceFromBaseKm: 2,
    description: `Çiftlikköy, Yalova'nın hem hızla genişleyen modern konut projeleriyle hem de Taşköprü sanayi aksına komşu konumuyla hafriyat ve iş makinesi talebinin en yüksek olduğu merkezidir. Adem Hafriyat merkez üssümüz Çiftlikköy sınırlarında yer aldığından; Çiftlikköy'ün her noktasına **en geç 15-20 dakika içinde** makine ve uzman operatör sevk edebiliyoruz.

Çiftlikköy zemin yapısı deniz kenarına yakın alanlarda kumlu-alüvyon zemin özellikleri taşırken, üst mahallelerde ve köylerde killi-sert toprak yapısına sahiptir. Sahil bandındaki sitelerde su yalıtımı ve drenaj kanal kazıları hayati önem taşırken; Sultaniye ve Siteler mahallelerinde yeni bina temel kazıları ve çevre düzenlemeleri öne çıkmaktadır. Kabaklı, Çukurköy ve Gacık gibi köylerde ise tarımsal arazi düzleme, sulama kanalı açma ve su kuyusu çevre kazısı ihtiyaçlarına güçlü JCB bekoloder filomuzla çözüm sunuyoruz.`,
    neighborhoods: [
      { name: 'Çiftlikköy Merkez', slug: 'ciftlikkoy-merkez', type: 'mahalle', focus: 'Bina alt yapı, su kanalı, acil kepçe' },
      { name: 'Sahil Mahallesi', slug: 'sahil-mahallesi', type: 'mahalle', focus: 'Drenaj kazısı, villa çevre düzenleme, sahil dolgu' },
      { name: 'Siteler Mahallesi', slug: 'siteler-mahallesi', type: 'mahalle', focus: 'Site içi tretuvar, kanalizasyon tamir, mini kepçe' },
      { name: 'Sultaniye Mahallesi', slug: 'sultaniye-mahallesi', type: 'mahalle', focus: 'Yeni inşaat temel kazısı, dolgu mıcır serme' },
      { name: 'Mehmet Akif Ersoy Mahallesi', slug: 'mehmet-akif-ersoy', type: 'mahalle', focus: 'Elektrik kablo kanalı, parsel tesviye, kazı' }
    ],
    villages: [
      { name: 'Kabaklı Köyü', slug: 'kabakli-koyu', focus: 'Arazi düzleme, tarla yolu açma, taş kırma' },
      { name: 'Çukurköy', slug: 'cukurkoy', focus: 'Su kuyusu kazma, bahçe tesviyesi, drenaj' },
      { name: 'Dereköy', slug: 'derekoy', focus: 'Dere yatağı ıslahı, kanal kazma, dolgu' },
      { name: 'Gacık Köyü', slug: 'gacik-koyu', focus: 'Zeytinlik ve bahçe temizleme, kök sökümü, temel' },
      { name: 'Laledere Köyü', slug: 'laledere-koyu', focus: 'Bağ bahçe drenajı, fosseptik çukuru açma' },
      { name: 'İlyasköy', slug: 'ilyaskoy', focus: 'Parsel çevre tel örgü dibi kazma, mıcır serimi' },
      { name: 'Denizçalı Köyü', slug: 'denizcali-koyu', focus: 'Sanayi yakını depo hafriyatı, forklift, kazı' }
    ],
    commonProjects: [
      'Sahil sitelerinde bina temel su basman izolasyonu ve drenaj kazısı',
      'Sultaniye ve Siteler mahallelerinde yağmur suyu büz döşeme hatları',
      'Çiftlikköy köylerinde tarımsal su kuyusu ve elektrik kablo hatları',
      'Yazlık site bahçelerinde kilit parke altı mıcır serme ve tesviye'
    ]
  },
  {
    id: 'taskopru',
    slug: 'taskopru',
    name: 'Taşköprü',
    title: 'Taşköprü Kepçe Kiralama, Forklift Kiralama & Sanayi Hafriyatı',
    h1: 'Taşköprü Kepçe Kiralama & Sanayi Tipi Forklift Kiralama',
    metaTitle: 'Taşköprü Forklift Kiralama & Kepçe Hizmetleri | Adem Hafriyat',
    metaDesc: 'Taşköprü Organize Sanayi Bölgesi ve çevresinde operatörlü kiralık forklift, fabrika kanal kazısı, ağır yük yükleme-boşaltma ve kepçe kiralama.',
    excerpt: 'Taşköprü sanayi bölgesi, Yalkim OSB hattı, fabrikalar ve çevre köylerde uzman operatörlü forklift ve JCB kepçe kiralama hizmetleri.',
    priority: 2,
    tag: 'Sanayi & Ağır Yük Merkezi',
    responseMinutes: 10,
    distanceFromBaseKm: 1,
    description: `Taşköprü, Yalova'nın sanayi, üretim ve organize tesislerinin kalbidir. Tekstil fabrikaları, kimya tesisleri (Akkim, DowAksa vb. yakın sanayi aksı), ambalaj üreticileri ve lojistik antrepoların yer aldığı Taşköprü bölgesinde hem **Forklift Kiralama (Operatörlü & Operatörsüz)** hem de **Sanayi Altyapı Kepçe Kazıları** 1. önceliğimizdir.

Fabrika içi zemin revizyonları, yüksek tonajlı tır yükleme-boşaltma işleri, paletli hammadde ve makine taşımacılığında 3 tondan 5 tona kadar modern forklift filomuzla 7/24 hizmet veriyoruz. Ayrıca fabrika yangın hidrant hatları kazısı, atık su ve yağmur kanalları, trafo elektrik hattı açma işlerinde hassas çalışan operatörlerimiz ve dar alan mini ekskavatörlerimiz ile sıfır kaza prensibiyle sahadayız.`,
    neighborhoods: [
      { name: 'Taşköprü Merkez Mahallesi', slug: 'taskopru-merkez', type: 'mahalle', focus: 'Altyapı kazıları, bina tamirat, kepçe' },
      { name: 'Taşköprü Sanayi Bölgesi', slug: 'taskopru-sanayi', type: 'sanayi', focus: 'Forklift kiralama, fabrika yükleme, tır boşaltma' },
      { name: 'Taşköprü Yeni Mahalle', slug: 'taskopru-yeni-mahalle', type: 'mahalle', focus: 'Temel kazma, dolgu mıcır serme, tesviye' }
    ],
    villages: [
      { name: 'Kılıç Köyü', slug: 'kilic-koyu', focus: 'Arazi düzleme, sera altyapısı, su kanalı kazma' },
      { name: 'Çukurköy Bağlantısı', slug: 'cukurkoy-baglantisi', focus: 'Tarım arazisi hafriyatı, yol açma' },
      { name: 'Denizçalı Sanayi Hattı', slug: 'denizcali-sanayi', focus: 'Ağır yük forklift, fabrika atık su hattı' }
    ],
    commonProjects: [
      'Sanayi tesislerinde tır ve konteyner paletli yük boşaltma (Forklift)',
      'Fabrika sahası yağmur suyu ızgara ve kanalizasyon kazı tamirleri',
      'Trafo ve yüksek gerilim yer altı elektrik hattı kazıları',
      'Ağır iş makineleri ile fabrika otoparkı beton altı mıcır dolgusu'
    ]
  },
  {
    id: 'yalova-merkez',
    slug: 'yalova-merkez',
    name: 'Yalova Merkez',
    title: 'Yalova Merkez Kepçe Kiralama & Kentsel Hafriyat İşleri',
    h1: 'Yalova Merkez Kepçe Kiralama & Temel / Kanal Kazma İşleri',
    metaTitle: 'Yalova Merkez Kepçe Kiralama | Adem Hafriyat 7/24 Acil Servis',
    metaDesc: 'Yalova Merkez tüm mahallelerinde dar alan mini kepçe, bekoloder kiralama, temel kazma, su patlağı tamiri, elektrik kanalı ve bina çevre düzenleme.',
    excerpt: 'Bahçelievler, Gaziosmanpaşa, İsmetpaşa, Paşakent, Kadıköy ve Yalova Merkez mahallelerinin tamamında dar sokaklara uygun mini kepçe ve JCB filosu.',
    priority: 3,
    tag: 'Tüm Mahallelerde 7/24',
    responseMinutes: 20,
    distanceFromBaseKm: 5,
    description: `Yalova Merkez, kentsel dönüşüm projeleri, bina çevre düzenlemeleri, dar sokaklarda acil altyapı arızaları ve doğalgaz/elektrik kanal açma işlerinin en yoğun yaşandığı alandır. Şehir merkezindeki dar sokaklar, kaldırımlar ve bitişik nizam yapılar nedeniyle **Mini Ekskavatör** ve kompakt **Bekoloder Kepçelerimiz** büyük avantaj sağlamaktadır.

Bina temel kazıları, kentsel dönüşüm parsel temizliği, subasman dolgusu, tretuvar altı kazıları ve yağmur suyu rögarlarına bağlantı kanalları açma konularında uzman operatör kadromuzla hizmet veriyoruz. Yalova Merkez'in 14 mahallesinin tamamına günün her saati bir telefonla ulaşıyor, keşif yaparak en uygun makineyi yönlendiriyoruz.`,
    neighborhoods: [
      { name: 'Bahçelievler Mahallesi', slug: 'bahcelievler-mahallesi', type: 'mahalle', focus: 'Bina çevre düzenleme, otopark kazısı, mini kepçe' },
      { name: 'Gaziosmanpaşa Mahallesi', slug: 'gaziosmanpasa-mahallesi', type: 'mahalle', focus: 'Kanalizasyon büz hattı, temel kazma' },
      { name: 'İsmetpaşa Mahallesi', slug: 'ismetpasa-mahallesi', type: 'mahalle', focus: 'Dar alan kanal kazma, acil altyapı tamiratı' },
      { name: 'Rüstempaşa Mahallesi', slug: 'rustempasa-mahallesi', type: 'mahalle', focus: 'Çarşı içi dükkan ve bina tadilat hafriyatı' },
      { name: 'Süleymanbey Mahallesi', slug: 'suleymanbey-mahallesi', type: 'mahalle', focus: 'Kablo ve su borusu kanalı açma' },
      { name: 'Adnan Menderes Mahallesi', slug: 'adnan-menderes-mahallesi', type: 'mahalle', focus: 'Yeni konut temel kazısı, dolgu mıcır serme' },
      { name: 'Bağlarbaşı Mahallesi', slug: 'baglarbasi-mahallesi', type: 'mahalle', focus: 'Parsel tesviyesi, bahçe temizleme, hafriyat' },
      { name: 'Kazım Karabekir Mahallesi', slug: 'kazim-karabekir-mahallesi', type: 'mahalle', focus: 'İstinat duvarı kazısı, çevre düzenleme' },
      { name: 'Paşakent Mahallesi', slug: 'pasakent-mahallesi', type: 'mahalle', focus: 'Toplu konut altyapı, peyzaj ve dolgu' },
      { name: 'Seyrantepe Mahallesi', slug: 'seyrantepe-mahallesi', type: 'mahalle', focus: 'Eğimli arazi kademelendirme, temel hafriyatı' },
      { name: 'Fevziçakmak Mahallesi', slug: 'fevzicakmak-mahallesi', type: 'mahalle', focus: 'Kanal kazma, yağmur suyu giderleri, kepçe' },
      { name: 'Kadıköy Beldesi', slug: 'kadikoy-beldesi', type: 'belde', focus: 'Villa temeli, havuz kazısı, peyzaj hafriyatı' },
      { name: 'Samanlı Köyü', slug: 'samanli-koyu', focus: 'Kivi ve bahçe arazisi tesviyesi, kuyu kazma' },
      { name: 'Safran Köyü', slug: 'safran-koyu', focus: 'Arazi düzleme, yol açma, taş kırma' },
      { name: 'Hacımehmet Köyü', slug: 'hacimehmet-koyu', focus: 'Dere ıslahı, su kanalı, dolgu malzemesi serme' },
      { name: 'Güneyköy', slug: 'guneykoy', focus: 'Taşlık arazi kırıcı ataşmanlı kepçe, su kuyusu' },
      { name: 'Soğucak Köyü', slug: 'sogucak-koyu', focus: 'Yamaç hafriyatı, kademeli bahçe, drenaj' }
    ],
    villages: [],
    commonProjects: [
      'Kadıköy ve Samanlı villa projelerinde havuz ve temel kazıları',
      'Bahçelievler ve Paşakent sitelerinde yağmur suyu drenaj hattı açma',
      'Yalova Merkez mahallelerinde patlak su borusu ve doğalgaz kanalı tamirleri',
      'Kentsel dönüşüm binalarında temel altı grobeton öncesi zemin tesviyesi'
    ]
  },
  {
    id: 'altinova',
    slug: 'altinova',
    name: 'Altınova',
    title: 'Altınova Kepçe Kiralama & Tersane Forklift Kiralama',
    h1: 'Altınova Tersane Forklift Kiralama & Ağır Tonajlı Kepçe Hizmetleri',
    metaTitle: 'Altınova Forklift Kiralama & Kepçe | Adem Hafriyat Tersane',
    metaDesc: 'Altınova Tersaneler Bölgesi, Subaşı ve Tavşanlı için operatörlü ağır tonaj forklift, fabrika temel kazma ve kepçe kiralama. Güvenilir ve sertifikalı!',
    excerpt: 'Altınova Tersaneler Bölgesi, Tavşanlı, Subaşı ve Kaytazdere aksında ağır sanayi tipi forklift kiralama ve büyük tonajlı ekskavatör hafriyatı.',
    priority: 4,
    tag: 'Tersane & Ağır Sanayi',
    responseMinutes: 25,
    distanceFromBaseKm: 12,
    description: `Altınova, Türkiye'nin ve Yalova'nın en büyük gemi inşa ve tersane merkezidir. Tersane sahasında sac levhalar, gemi motor parçaları, kablo makaraları ve konteynerlerin taşınması için **Ağır Tonajlı Forklift Kiralama** hizmetimiz bölgenin 1 numaralı tercihidir. Tüm operatörlerimiz G sınıfı iş makinesi ehliyetine, tersane İSG sertifikalarına ve liman sahası deneyimine sahiptir.

Ayrıca Tavşanlı, Subaşı ve Kaytazdere beldelerindeki sanayi fabrikaları, kivi seraları ve konut projelerinde temel kazma, fabrika saha beton altı mıcır dolgusu ve yağmur suyu kolektör hattı kazıları yapmaktayız.`,
    neighborhoods: [
      { name: 'Tersaneler Bölgesi', slug: 'altinova-tersaneler', type: 'sanayi', focus: 'Ağır tonaj forklift kiralama, tersane lojistiği' },
      { name: 'Tavşanlı Beldesi', slug: 'tavsanli-beldesi', type: 'belde', focus: 'Sanayi altyapı kazısı, fabrika temeli' },
      { name: 'Subaşı Beldesi', slug: 'subasi-beldesi', type: 'belde', focus: 'Sera tesviyesi, kuyu kazma, kepçe kiralama' },
      { name: 'Kaytazdere Beldesi', slug: 'kaytazdere-beldesi', type: 'belde', focus: 'Yazlık site kanalizasyon, peyzaj, kepçe' },
      { name: 'Fevziye Köyü', slug: 'fevziye-koyu', focus: 'Tarım arazisi düzleme, su kanalı açma' },
      { name: 'Tokmak Köyü', slug: 'tokmak-koyu', focus: 'Mıcır dolgu yayma, arazi tesviye' }
    ],
    villages: [],
    commonProjects: [
      'Altınova Tersaneler bölgesinde sac, profil ve paletli malzeme yükleme/boşaltma',
      'Tavşanlı sanayi tesislerinde fabrika temel ve yangın hidrant kazısı',
      'Kaytazdere ve Subaşı arazilerinde sulama göleti ve kuyu hafriyatı'
    ]
  },
  {
    id: 'cinarcik',
    slug: 'cinarcik',
    name: 'Çınarcık',
    title: 'Çınarcık Kepçe Kiralama & Yazlık Site Hafriyat Hizmetleri',
    h1: 'Çınarcık Kepçe Kiralama & Villa Temel / Drenaj Kazma',
    metaTitle: 'Çınarcık Kepçe Kiralama | Adem Hafriyat Sahil & Yayla',
    metaDesc: 'Çınarcık, Teşvikiye, Koru ve Esenköy bölgelerinde kiralık kepçe, villa havuz/temel kazısı, foseptik kuyu açma ve arazi tesviyesi. Hızlı servis!',
    excerpt: 'Çınarcık merkez, Koru, Teşvikiye ve Esenköy hattında yazlık konutlar, villa temelleri, istinat duvarları ve sahil drenajı için kiralık kepçe filosu.',
    priority: 5,
    tag: 'Turizm & Villa Projeleri',
    responseMinutes: 30,
    distanceFromBaseKm: 18,
    description: `Çınarcık ve çevresindeki Koru, Teşvikiye, Esenköy beldelerinde yazlık sitelerin altyapı bakımları, foseptik kuyusu kazıları, villa havuz ve temel kazıları ile dik yamaçlardaki istinat duvarı hafriyatları uzmanlık gerektirir. Eğimli arazide devrilme riskini sıfıra indiren tecrübeli operatörlerimiz ve kırıcı ataşmanlı makinelerimizle Çınarcık genelinde hizmetinizdeyiz.`,
    neighborhoods: [
      { name: 'Çınarcık Merkez (Taşliman / Hasanbaba)', slug: 'cinarcik-merkez', type: 'mahalle', focus: 'Bina çevre düzenleme, istinat duvarı' },
      { name: 'Koru Beldesi', slug: 'koru-beldesi', type: 'belde', focus: 'Seracılık hafriyatı, drenaj kanalı, tesviye' },
      { name: 'Teşvikiye Beldesi', slug: 'tesvikiye-beldesi', type: 'belde', focus: 'Yayla yolu açma, taş kırma, villa temeli' },
      { name: 'Esenköy Beldesi', slug: 'esenkoy-beldesi', type: 'belde', focus: 'Sahil dolgusu, kanalizasyon kazısı, kepçe' }
    ],
    villages: [],
    commonProjects: [
      'Yazlık sitelerde çöken foseptik çukurlarının yenilenmesi ve kazısı',
      'Teşvikiye yayla arazilerinde taş ayıklama ve parsel düzleme',
      'Koru beldesi çiçek seralarında tesviye ve drenaj kanalı açma'
    ]
  },
  {
    id: 'termal',
    slug: 'termal',
    name: 'Termal',
    title: 'Termal Kepçe Kiralama & Butik Otel Hafriyat İşleri',
    h1: 'Termal Kepçe Kiralama & Hassas Çevre Düzenleme İşleri',
    metaTitle: 'Termal Kepçe Kiralama | Adem Hafriyat Doğa & Otel Projeleri',
    metaDesc: 'Termal, Üvezpınar, Gökçedere ve Akköy bölgelerinde peyzaj hafriyatı, termal su borusu kanalı kazma, mini kepçe kiralama.',
    excerpt: 'Termal tesisler, butik oteller ve doğa evleri için çevreye duyarlı, sessiz ve dar alanda kıvrak mini kepçe ve hafriyat hizmetleri.',
    priority: 6,
    tag: 'Termal Su Hatları & Doğa',
    responseMinutes: 25,
    distanceFromBaseKm: 14,
    description: `Termal ilçesi ve Gökçedere, Üvezpınar gibi turistik bölgelerde termal su borusu kanal kazıları, çevreye ve ağaçlara zarar vermeyen hassas peyzaj düzenlemeleri büyük özen ister. Kompakt mini kepçelerimizle dar otel bahçelerinde bile sıfır hasarla kazı ve düzleme yapıyoruz.`,
    neighborhoods: [
      { name: 'Gökçedere', slug: 'gokcedere', type: 'mahalle', focus: 'Termal boru hattı, peyzaj hafriyatı' },
      { name: 'Üvezpınar', slug: 'uvezpinar', type: 'mahalle', focus: 'Taş duvar temeli, bahçe kademelendirme' },
      { name: 'Akköy', slug: 'akkoy', type: 'koy', focus: 'Fidanlık ve bahçe tesviyesi, kuyu kazma' }
    ],
    villages: [],
    commonProjects: [
      'Termal su nakil boruları için derin ve korumalı kanal kazısı',
      'Butik otel havuz ve spa altyapısı temel kazıları'
    ]
  },
  {
    id: 'armutlu',
    slug: 'armutlu',
    name: 'Armutlu',
    title: 'Armutlu Kepçe Kiralama & Hafriyat Hizmetleri',
    h1: 'Armutlu Kepçe Kiralama & Temel Kazma Hizmetleri',
    metaTitle: 'Armutlu Kepçe Kiralama | Adem Hafriyat 7/24 Hizmet',
    metaDesc: 'Armutlu, Fıstıklı ve Kapaklı sahil hattında kiralık kepçe, temel kazma, zeytinlik tarla düzleme ve kanalizasyon kazı işleri.',
    excerpt: 'Armutlu ilçe merkezi ve köylerinde yazlık inşaatları, zeytinlik tesviyesi ve altyapı işleri için kepçe ve iş makinesi kiralama.',
    priority: 7,
    tag: 'Sahil & Zeytinlik Arazileri',
    responseMinutes: 45,
    distanceFromBaseKm: 40,
    description: `Armutlu ve Fıstıklı bölgesinde deniz kenarı taş tahkimat işleri, zeytinliklerde teraslama ve taş kırma, yazlık site kanalizasyon hatları için operatörlü kepçe çözümleri sunuyoruz.`,
    neighborhoods: [
      { name: 'Armutlu Merkez', slug: 'armutlu-merkez', type: 'mahalle', focus: 'Temel kazma, dolgu serimi' },
      { name: 'Fıstıklı Köyü', slug: 'fistikli-koyu', focus: 'Sahil dolgusu, arazi düzleme' },
      { name: 'Kapaklı Köyü', slug: 'kapakli-koyu', focus: 'Zeytinlik teraslama, su kuyusu kazma' }
    ],
    villages: [],
    commonProjects: [
      'Zeytinliklerde eğimli arazi teraslama ve su havuzu açma',
      'Armutlu sahil sitelerinde kanalizasyon hattı kazısı'
    ]
  }
];

