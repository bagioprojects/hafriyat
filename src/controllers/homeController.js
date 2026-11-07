/**
 * Ana Sayfa Controller
 * Yalova Kepçe Kiralama, Yalova Kepçe ve Yalova Forklift Kiralama Odaklı
 */

const siteConfig = require('../../config/site');
const services = require('../../data/services');
const districts = require('../../data/districts');
const machinery = require('../../data/machinery');
const blogPosts = require('../../data/blog');
const { generateSeoData } = require('../helpers/seoHelper');
const { getLocalBusinessSchema, getBreadcrumbSchema, getFaqSchema } = require('../helpers/schemaHelper');

exports.index = (req, res) => {
  const homeFaqs = [
    {
      question: 'Yalova ve ilçelerinde kepçe kiralama için ne kadar önceden haber vermeliyim?',
      answer: 'Adem Hafriyat ana garajımız Çiftlikköy ve Taşköprü sanayi bölgesine komşudur. Acil durumlarda Çiftlikköy ve Taşköprü içine 15-20 dakika, Yalova Merkez ve köylerine ortalama 25-30 dakikada intikal ediyoruz. Planlı hafriyat ve temel kazıları için 1 gün önceden aramanız en ideal makine ve operatör planlamasını sağlar.'
    },
    {
      question: 'Operatörlü forklift kiralama saatlik yapılabiliyor mu?',
      answer: 'Evet. Fabrikanıza veya şantiyenize yanaşan nakliye tırlarının indirilmesi, ağır makinelerin fabrika içi taşınması veya konteyner boşaltma işleri için saatlik, yarım günlük ve tam günlük operatörlü forklift kiralayabilirsiniz.'
    },
    {
      question: 'Kepçe kiralama fiyatına mazot ve operatör dahil mi?',
      answer: 'Talebinize göre hem yakıt dahil anahtar teslim hem de sadece operatörlü makine kiralama seçenekleri sunuyoruz. İş başlamadan önce net ve şeffaf fiyat verilir, iş bitiminde sürpriz ek masraflarla karşılaşmazsınız.'
    },
    {
      question: 'Çiftlikköy, Taşköprü ve köylerde keşif ve intikal nasıl planlanır?',
      answer: 'İş makinelerimizde intikal ve keşif planlaması şantiyenizin mesafesine, zemin şartlarına ve yapılacak işin büyüklüğüne göre en makul yakıt ve nakliye maliyeti gözetilerek hesaplanır. İş öncesinde tüm detaylar konuşulur, sürpriz veya gizli masraf olmadan net ve şeffaf fiyat teklifi sunulur.'
    },
    {
      question: 'Dar sokaklarda ve müstakil bahçelerde büyük kepçe zarar verir mi?',
      answer: 'Dar sokaklar, bitişik nizam binalar ve villa bahçeleri için 3.5 tonluk kauçuk paletli Mini Ekskavatörümüzü kullanıyoruz. Kauçuk paletler asfaltı, kilit parkeyi ve çimleri ezmez; sıfır kuyruk dönüşü sayesinde duvarlara sürtünmeden 360 derece çalışabilir.'
    }
  ];

  const seo = generateSeoData({
    title: 'Yalova Kepçe Kiralama & Forklift Kiralama | Adem Hafriyat 7/24',
    description: 'Yalova kepçe kiralama, Çiftlikköy, Taşköprü ve tüm ilçelerde kanal kazma, temel hafriyatı, arazi düzleme, su kuyusu ve operatörlü forklift kiralama. En uygun fiyat & 15 dk servis!',
    keywords: [
      'yalova kepçe kiralama',
      'yalova kepçe',
      'yalova forklift kiralama',
      'çiftlikköy kepçe kiralama',
      'taşköprü forklift kiralama',
      'yalova jcb kiralama',
      'operatörlü kepçe yalova',
      'adem hafriyat'
    ],
    canonicalPath: '',
    breadcrumbs: []
  });

  const schemas = [
    getLocalBusinessSchema(),
    getBreadcrumbSchema(seo.breadcrumbs),
    getFaqSchema(homeFaqs)
  ];

  res.render('pages/home', {
    siteConfig,
    seo,
    schemas,
    services,
    districts,
    machinery,
    blogPosts: blogPosts.slice(0, 3),
    faqs: homeFaqs,
    activeNav: 'home'
  });
};

