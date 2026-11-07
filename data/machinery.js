/**
 * Makine Parkuru Veri Modeli - Adem Hafriyat
 * Yalova Kepçe ve Forklift Filosu
 */

module.exports = [
  {
    id: 'jcb-3cx-bekoloder',
    slug: 'jcb-3cx-bekoloder',
    category: 'kepce',
    name: 'JCB 3CX Eco Bekoloder (Kazıcı Yükleyici)',
    title: 'Yalova Kiralık JCB Bekoloder Kepçe',
    type: 'Kazıcı Yükleyici',
    tag: 'En Çok Tercih Edilen Kepçe',
    image: '/images/jcb-3cx.jpg',
    tonnage: '8.5 Ton',
    enginePower: '100 HP Turbo EcoMax',
    diggingDepth: '5.46 Metre (Teleskopik Bom İle)',
    bucketCapacity: 'Ön: 1.2 m³ / Arka: 0.35 m³',
    bestFor: [
      'Kanal Kazma (Su, Doğalgaz, Elektrik)',
      'Temel ve Subasman Kazıları',
      'Arazi Düzleme ve Parsel Tesviyesi',
      'Dolgu, Mıcır ve Hafriyat Yükleme',
      'Bina Çevre Düzenleme ve Temizlik'
    ],
    features: [
      'Teleskopik uzayan arka kazıcı bom ile ekstra derinlik',
      '4 ü 1 arada açılır çeneli ön dozer bıçağı',
      'Hidrolik kırıcı takılabilir altyapı (kaya ve beton kırma)',
      'Tork kilitli hızlı şantiye intikal kabiliyeti'
    ],
    operatorIncluded: true,
    rentalTerms: 'Saatlik, Günlük, Haftalık veya Aylık Kiralama'
  },
  {
    id: 'mini-ekskavator-35-ton',
    slug: 'mini-ekskavator-35-ton',
    aliases: ['cat-303-mini-ekskavator'],
    category: 'kepce',
    name: 'Cat 303.5E Mini Ekskavatör',
    title: 'Yalova Dar Alan Kiralık Mini Kepçe',
    type: 'Mini Ekskavatör',
    tag: 'Dar Sokak & Bahçe Uzmanı',
    image: '/images/mini-ekskavator.jpg',
    tonnage: '3.6 Ton',
    enginePower: '32 HP Dizel',
    diggingDepth: '3.18 Metre',
    bucketCapacity: '0.15 m³ (Dar kanal kovaları: 25cm - 40cm)',
    bestFor: [
      'Yalova Merkez dar sokak altyapı kazıları',
      'Site içi ve villa bahçesi peyzaj düzenlemesi',
      'Bina içi ve bodrum katı kırım / kazı işleri',
      'Kauçuk palet ile kaldırım ve asfalta sıfır zarar'
    ],
    features: [
      'Sıfır kuyruk dönüşü (Zero Tail Swing) ile duvara sıfır dönüş',
      'Kauçuk paletler sayesinde kilit parke ve çimeni bozmaz',
      '30 cm süper dar kova ile minimum asfalt kesme maliyeti',
      'Kapalı bahçe kapılarından rahatça geçebilen kompakt gövde'
    ],
    operatorIncluded: true,
    rentalTerms: 'Saatlik, Günlük ve Haftalık Kiralama'
  },
  {
    id: 'paletli-ekskavator-22-ton',
    slug: 'paletli-ekskavator-22-ton',
    aliases: ['22-ton-paletli-ekskavator'],
    category: 'kepce',
    name: '22 Ton Paletli Ağır Hizmet Ekskavatör',
    title: 'Yalova Büyük Tonajlı Temel Kazma Ekskavatörü',
    type: 'Ağır Paletli Ekskavatör',
    tag: 'Büyük Temel & Şantiye Gücü',
    image: '/images/paletli-ekskavator.jpg',
    tonnage: '22 Ton',
    enginePower: '160 HP',
    diggingDepth: '6.70 Metre',
    bucketCapacity: '1.20 m³ Ağır Hizmet Kovası',
    bestFor: [
      'Büyük fabrika ve toplu konut temel kazıları',
      'Taş ocağı ve dağ arazisi yol açma işleri',
      'Yüksek metrajlı derin kanalizasyon kolektör hatları',
      'Ağır kaya kırma ve taş tahkimat yerleştirme'
    ],
    features: [
      'Çelik palet ile en ağır çamurlu ve kayalık zeminlerde tutunma',
      'Ağır hizmet tipi hidrolik kaya kırıcısı (1.5 tonluk kırıcı)',
      'Günde 1.500 m³ hafriyat yükleme hızı'
    ],
    operatorIncluded: true,
    rentalTerms: 'Günlük, Haftalık ve Proje Bazlı Kiralama'
  },
  {
    id: 'forklift-3-ton-dizel',
    slug: 'forklift-3-ton-dizel',
    aliases: ['3-ton-dizel-forklift'],
    category: 'forklift',
    name: '3 Ton Dizel Triplex Forklift',
    title: 'Yalova 3 Tonluk Kiralık Forklift (Taşköprü & Sanayi)',
    type: 'Dizel Endüstriyel Forklift',
    tag: 'En Çok Kiralanan Forklift',
    image: '/images/forklift-3ton.jpg',
    tonnage: '3.000 kg (3 Ton)',
    enginePower: 'Dizel 55 HP',
    diggingDepth: 'N/A',
    liftingHeight: '4.50 Metre Triplex Asansör',
    bestFor: [
      'Taşköprü ve Altınova sanayi fabrikalarında tır yükleme-boşaltma',
      'Konteyner içi palet çekme ve istifleme',
      'Şantiye alanlarına gelen tuğla, kiremit ve çimento paletleri',
      'Açık saha depolama ve lojistik aktarma'
    ],
    features: [
      'Triplex serbest kaldırmalı asansör (alçak tavanlı tırlara rahat girer)',
      'Side-shifter (sağa-sola hidrolik kaydırma) ile hızlı palet yerleşimi',
      'Dolgu lastik ile çivi ve metal talaşına karşı patlamaz güvence',
      'Kendi çekicimiz ile Taşköprü içine 15 dakikada anında teslim'
    ],
    operatorIncluded: true,
    rentalTerms: 'Saatlik, Günlük, Haftalık ve Aylık (Operatörlü/Operatörsüz)'
  },
  {
    id: 'forklift-5-ton-agir-sanayi',
    slug: 'forklift-5-ton-agir-sanayi',
    aliases: ['5-ton-agir-sanayi-forklift'],
    category: 'forklift',
    name: '5 Ton Ağır Sanayi Tipi Dizel Forklift',
    title: 'Yalova & Altınova 5 Tonluk Ağır Hizmet Kiralık Forklift',
    type: 'Ağır Hizmet Forklifti',
    tag: 'Tersane & Ağır Yük Canavarı',
    image: '/images/forklift-5ton.jpg',
    tonnage: '5.000 kg (5 Ton)',
    enginePower: 'Ağır Sanayi Turbo Dizel 85 HP',
    diggingDepth: 'N/A',
    liftingHeight: '4.80 Metre Asansör',
    bestFor: [
      'Altınova tersanelerinde saç levha, profil ve gemi blokları',
      'Ağır mermer blokları ve taş paletleri indirme',
      'Fabrika tezgâhları ve ağır makine yer değiştirme',
      'Endüstriyel döküm ve çelik sanayi lojistiği'
    ],
    features: [
      'Çift ön tekerlek (Double Drive) ile maksimum denge ve zemin tutuşu',
      '1.80 m uzunluğunda güçlendirilmiş çatal ataşmanı',
      'G sınıfı tersane deneyimli uzman operatör seçeneği'
    ],
    operatorIncluded: true,
    rentalTerms: 'Saatlik, Günlük, Aylık (Operatörlü veya Operatörsüz)'
  },
  {
    id: 'forklift-25-ton-akulu',
    slug: 'forklift-25-ton-akulu',
    category: 'forklift',
    name: '2.5 Ton Tam Elektrikli / Akülü Depo Forklifti',
    title: 'Yalova Kapalı Depo İçin Kiralık Akülü Forklift',
    type: 'Akülü Depo Forklifti',
    tag: 'Sıfır Emisyon & Sessiz Güç',
    image: '/images/forklift-akulu.jpg',
    tonnage: '2.500 kg',
    enginePower: 'AC Elektrik Motoru & Endüstriyel Traksiyonel Akü',
    diggingDepth: 'N/A',
    liftingHeight: '4.50 Metre',
    bestFor: [
      'Gıda, ilaç, kimya ve tekstil kapalı fabrikaları (Sıfır egzoz gazı)',
      'İz bırakmayan beyaz dolgu tekerleklerle epoksi zemin koruması',
      'Sessiz ve kokusuz kapalı depo operasyonları'
    ],
    features: [
      'İz yapmayan özel tekerlekler ile tertemiz fabrika zeminleri',
      'Tam şarj ile 8 saat kesintisiz vardiya performansı',
      'Şarj cihazı ve teknik periyodik bakım Adem Hafriyat garantisinde'
    ],
    operatorIncluded: false,
    rentalTerms: 'Aylık ve Yıllık Kurumsal Kiralama'
  }
];

