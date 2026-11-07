/**
 * Bölgeler Controller
 * Çiftlikköy, Taşköprü, Yalova Merkez ve Tüm İlçeler / Mahalleler / Köyler İçin %100 GEO SEO Sayfaları
 */

const siteConfig = require('../../config/site');
const districts = require('../../data/districts');
const services = require('../../data/services');
const machinery = require('../../data/machinery');
const blogPosts = require('../../data/blog');
const { generateSeoData } = require('../helpers/seoHelper');
const { getLocalBusinessSchema, getServiceSchema, getBreadcrumbSchema, getFaqSchema } = require('../helpers/schemaHelper');

exports.detail = (req, res, next) => {
  const { districtSlug } = req.params;
  const district = districts.find(d => d.slug === districtSlug);

  if (!district) {
    return next();
  }

  // All services tailored for this district
  const districtServices = services;
  const otherDistricts = districts.filter(d => d.id !== district.id);

  const localFaqs = [
    {
      question: `${district.name} bölgesine kepçe veya forklift ne kadar sürede ulaşır?`,
      answer: `Adem Hafriyat olarak merkez garajımızın konumu sayesinde ${district.name} sınırları içindeki adresinize ortalama ${district.responseMinutes} dakika içinde iş makinesi ve operatör sevk ediyoruz.`
    },
    {
      question: `${district.name} mahalle ve köylerinde keşif ve nakliye nasıl hesaplanır?`,
      answer: `${district.name} ilçe merkezi, mahalleleri ve köylerinde yapılacak kanal kazma, temel, arazi düzleme veya forklift işlerinizde şantiye mesafesi ve makine çalışma süresine göre en makul yakıt/nakliye maliyeti planlanır ve iş öncesinde net teklif sunulur.`
    },
    {
      question: `${district.name} bölgesinde hangi zemin türlerine uygun kepçeleriniz var?`,
      answer: `Bölgemizdeki killi, taşlı veya sahil dolgu zeminler için hidrolik kırıcılı ve teleskopik bomlu JCB bekoloderler, dar sokaklar ve siteler için ise kauçuk paletli mini ekskavatörlerimiz hazır bulunmaktadır.`
    }
  ];

  const seo = generateSeoData({
    title: district.metaTitle,
    description: district.metaDesc,
    keywords: [
      `${district.name.toLowerCase()} kepçe kiralama`,
      `${district.name.toLowerCase()} forklift kiralama`,
      `${district.name.toLowerCase()} hafriyat`,
      `${district.name.toLowerCase()} temel kazma`,
      'yalova iş makineleri',
      'adem hafriyat'
    ],
    canonicalPath: `/bolgeler/${district.slug}`,
    breadcrumbs: [
      { label: 'Hizmet Bölgelerimiz', url: '/#bolgeler' },
      { label: district.name, url: `/bolgeler/${district.slug}` }
    ]
  });

  const schemas = [
    getLocalBusinessSchema(),
    getBreadcrumbSchema(seo.breadcrumbs),
    getFaqSchema(localFaqs)
  ];

  res.render('pages/districtDetail', {
    siteConfig,
    seo,
    schemas,
    district,
    districtServices,
    otherDistricts,
    machinery,
    localFaqs,
    activeNav: 'districts'
  });
};

exports.districtService = (req, res, next) => {
  const { districtSlug, serviceSlug } = req.params;
  const district = districts.find(d => d.slug === districtSlug);
  const service = services.find(s => s.slug === serviceSlug);

  if (!district || !service) {
    return next();
  }

  const cleanServiceTitle = (service.shortTitle || service.title).replace(/^Yalova\s+/i, '');
  const crossTitle = `${district.name} ${cleanServiceTitle}`;
  
  let customSuffix = `${district.responseMinutes} Dk Hızlı İntikal`;
  if (service.id === 'operatorlu-forklift-kiralama') {
    customSuffix = `Sanayi & Şantiye (${district.responseMinutes} Dk)`;
  } else if (service.id === 'operatorsuz-forklift-kiralama') {
    customSuffix = `Sürücüsüz Filo & Depo`;
  } else if (service.id === 'su-kuyusu-kazma') {
    customSuffix = `Keson Kuyu & Filtre Mıcırı`;
  }

  const metaTitle = `${district.name} ${cleanServiceTitle} — ${customSuffix} | Adem Hafriyat`;
  const metaDesc = `${district.name} genelinde ve tüm mahallelerinde profesyonel ${cleanServiceTitle.toLowerCase()}. Operatörlü uygun fiyatlı kiralık iş makineleri. ${district.responseMinutes} dakikada adreste!`;

  const otherServices = services.filter(s => s.id !== service.id).slice(0, 4);
  const otherDistricts = districts.filter(d => d.id !== district.id);

  const localServiceFaqs = [
    {
      question: `${district.name} bölgesinde ${service.shortTitle} fiyatı nasıl hesaplanır?`,
      answer: `${district.name} için fiyatlandırma çalışma saati, kazılacak alanın zemin sertliği ve kullanılacak ataşmana göre şeffaf biçimde belirlenir. En uygun fiyat teklifi için bizi hemen arayabilirsiniz.`
    },
    {
      question: `${district.name} mahallelerine servis süresi ne kadardır?`,
      answer: `Garajımızdan ${district.name} ve çevre mahallelere intikal süremiz ortalama ${district.responseMinutes} dakikadır.`
    }
  ];

  const seo = generateSeoData({
    title: metaTitle,
    description: metaDesc,
    keywords: [
      `${district.name.toLowerCase()} ${service.shortTitle.toLowerCase()}`,
      `${district.name.toLowerCase()} kepçe kiralama`,
      `${district.name.toLowerCase()} hafriyat`,
      'adem hafriyat',
      'operatörlü kepçe'
    ],
    canonicalPath: `/bolgeler/${district.slug}/${service.slug}`,
    breadcrumbs: [
      { label: 'Bölgeler', url: '/#bolgeler' },
      { label: district.name, url: `/bolgeler/${district.slug}` },
      { label: service.shortTitle || service.title, url: `/bolgeler/${district.slug}/${service.slug}` }
    ]
  });

  const schemas = [
    getServiceSchema(service, district),
    getBreadcrumbSchema(seo.breadcrumbs),
    getFaqSchema(localServiceFaqs)
  ];

  res.render('pages/districtService', {
    siteConfig,
    seo,
    schemas,
    district,
    service,
    crossTitle,
    otherServices,
    otherDistricts,
    machinery,
    localServiceFaqs,
    activeNav: 'districts'
  });
};


exports.neighborhoodDetail = (req, res, next) => {
  const { districtSlug, neighborhoodSlug } = req.params;
  const district = districts.find(d => d.slug === districtSlug);

  if (!district) {
    return next();
  }

  const allLocalities = [...(district.neighborhoods || []), ...(district.villages || [])];
  const locality = allLocalities.find(n => n.slug === neighborhoodSlug);

  if (!locality) {
    return next();
  }

  const isVillage = locality.type === 'koy' || (district.villages && district.villages.some(v => v.slug === neighborhoodSlug));
  const cleanLocalityName = locality.name
    .replace(new RegExp(`^${district.name}\\s*`, 'i'), '')
    .replace(/\s*\([^)]*\)/g, '')
    .trim();
  const localityDisplayName = cleanLocalityName ? `${district.name} ${cleanLocalityName}` : locality.name;
  const pageTitle = `${localityDisplayName} Kepçe Kiralama & Hafriyat Hizmetleri`;
  const metaTitle = `${localityDisplayName} Kiralık Kepçe & Forklift | Adem Hafriyat`;
  const metaDesc = `${localityDisplayName} mevkiinde profesyonel kepçe kiralama, kanal kazma, temel hafriyatı, su kuyusu ve arazi tesviye. ${district.responseMinutes} dakikada kapınızda!`;

  const localityFaqs = [
    {
      question: `${district.name} ${locality.name} adresine kepçe ne kadar sürede gelir?`,
      answer: `Adem Hafriyat olarak merkez garajımızdan ${district.name} ${locality.name} noktasına ortalama ${district.responseMinutes} dakika içinde iş makinesi ve operatör ulaştırıyoruz.`
    },
    {
      question: `${locality.name} bölgesinde dar sokak veya bahçelere uygun makineniz var mı?`,
      answer: `Evet, dar sokaklar, villa bahçeleri ve bitişik parseller için kauçuk paletli 3.5 tonluk Mini Ekskavatörümüzle çit ve kaldırımlara sıfır hasarla çalışıyoruz.`
    },
    {
      question: `${locality.name} için keşif ve fiyatlandırma nasıl yapılır?`,
      answer: `${district.name} ${locality.name} genelindeki tüm kazı, temel, kanal ve tesviye işlerinizde konum ve zemin incelenerek en ekonomik nakliye ve şeffaf çalışma maliyeti çıkarılır; sürpriz masraf olmadan net fiyat verilir.`
    }
  ];

  const seo = generateSeoData({
    title: metaTitle,
    description: metaDesc,
    keywords: [
      `${locality.name.toLowerCase()} kepçe kiralama`,
      `${locality.name.toLowerCase()} hafriyat`,
      `${district.name.toLowerCase()} ${locality.name.toLowerCase()}`,
      'yalova kepçe kiralama',
      'adem hafriyat'
    ],
    canonicalPath: `/bolgeler/${district.slug}/mahalle/${locality.slug}`,
    breadcrumbs: [
      { label: 'Bölgeler', url: '/#bolgeler' },
      { label: district.name, url: `/bolgeler/${district.slug}` },
      { label: locality.name, url: `/bolgeler/${district.slug}/mahalle/${locality.slug}` }
    ]
  });

  const schemas = [
    getLocalBusinessSchema(),
    getBreadcrumbSchema(seo.breadcrumbs),
    getFaqSchema(localityFaqs)
  ];

  const otherLocalities = allLocalities.filter(n => n.slug !== locality.slug);
  const relatedArticle = blogPosts.find(p => p.villageSlug === locality.slug);

  res.render('pages/neighborhoodDetail', {
    siteConfig,
    seo,
    schemas,
    district,
    locality,
    isVillage,
    pageTitle,
    districtServices: services,
    machinery,
    otherLocalities,
    localityFaqs,
    relatedArticle,
    activeNav: 'districts'
  });
};
