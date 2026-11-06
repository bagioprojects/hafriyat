/**
 * Bölgeler Controller
 * Çiftlikköy, Taşköprü, Yalova Merkez ve Tüm İlçeler / Mahalleler / Köyler İçin %100 GEO SEO Sayfaları
 */

const siteConfig = require('../../config/site');
const districts = require('../../data/districts');
const services = require('../../data/services');
const machinery = require('../../data/machinery');
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
      question: `${district.name} mahalle ve köylerinde keşif ücreti alıyor musunuz?`,
      answer: `Hayır. ${district.name} ilçe merkezi, tüm mahalleleri ve köylerinde yapılacak kanal kazma, temel, arazi düzleme veya forklift kiralama işlerinizde keşif hizmetimiz %100 ücretsizdir.`
    },
    {
      question: `${district.name} bölgesinde hangi zemin türlerine uygun kepçeleriniz var?`,
      answer: `Bölgemizdeki killi, taşlı veya sahil dolgu zeminler için hidrolik kırıcılı ve teleskopik bomlu JCB bekoloderler, dar sokaklar ve siteler için ise kauçuk paletli mini ekskavatörlerimiz hazır bulunmaktadır.`
    }
  ];

  const seo = generateSeoData({
    title: district.metaTitle,
    description: district.metaDesc,
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

  const crossTitle = `${district.name} ${service.shortTitle || service.title}`;
  const metaTitle = `${district.name} ${service.title} | Adem Hafriyat 7/24`;
  const metaDesc = `${district.name} genelinde ve tüm mahallelerinde profesyonel ${service.title.toLowerCase()}. Operatörlü uygun fiyatlı kiralık iş makineleri. ${district.responseMinutes} dk içinde adreste!`;

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

