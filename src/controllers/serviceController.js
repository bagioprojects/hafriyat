/**
 * Hizmetler Controller
 * Kepçe ve Forklift Hizmet Listeleme ve Detay Sayfaları
 */

const siteConfig = require('../../config/site');
const services = require('../../data/services');
const districts = require('../../data/districts');
const machinery = require('../../data/machinery');
const { generateSeoData } = require('../helpers/seoHelper');
const { getServiceSchema, getBreadcrumbSchema, getFaqSchema } = require('../helpers/schemaHelper');

exports.list = (req, res) => {
  const seo = generateSeoData({
    title: 'Hizmetlerimiz | Yalova Kepçe ve Forklift Kiralama',
    description: 'Adem Hafriyat profesyonel hizmetleri: Kanal kazma, su kuyusu açma, yağmur suyu kanalizasyon, altyapı tamiratı, arazi tesviye, dolgu mıcır yayma, elektrik kanalı, bina çevre düzenleme, temel kazma ve forklift kiralama.',
    keywords: [
      'yalova hafriyat hizmetleri',
      'yalova kanal kazma',
      'yalova su kuyusu',
      'yalova temel kazma',
      'yalova kepçe kiralama',
      'yalova forklift kiralama'
    ],
    canonicalPath: '/hizmetlerimiz',
    breadcrumbs: [{ label: 'Hizmetlerimiz', url: '/hizmetlerimiz' }]
  });

  res.render('pages/services', {
    siteConfig,
    seo,
    schemas: [getBreadcrumbSchema(seo.breadcrumbs)],
    services,
    districts,
    activeNav: 'services'
  });
};

exports.detail = (req, res, next) => {
  const { slug } = req.params;
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return next();
  }

  // Related machinery
  const relatedMachines = machinery.filter(m =>
    service.machineryUsed.some(name => m.name.toLowerCase().includes(name.toLowerCase().split(' ')[0]))
  );

  // Other services for internal linking
  const otherServices = services.filter(s => s.id !== service.id).slice(0, 4);

  const seo = generateSeoData({
    title: service.metaTitle,
    description: service.metaDesc,
    keywords: [
      service.title.toLowerCase(),
      `yalova ${service.shortTitle.toLowerCase()}`,
      `çiftlikköy ${service.shortTitle.toLowerCase()}`,
      `taşköprü ${service.shortTitle.toLowerCase()}`,
      'adem hafriyat',
      'operatörlü iş makinesi'
    ],
    canonicalPath: `/hizmetlerimiz/${service.slug}`,
    breadcrumbs: [
      { label: 'Hizmetlerimiz', url: '/hizmetlerimiz' },
      { label: service.shortTitle || service.title, url: `/hizmetlerimiz/${service.slug}` }
    ]
  });

  const schemas = [
    getServiceSchema(service),
    getBreadcrumbSchema(seo.breadcrumbs),
    getFaqSchema(service.faqs || [])
  ].filter(Boolean);

  res.render('pages/serviceDetail', {
    siteConfig,
    seo,
    schemas,
    service,
    districts,
    relatedMachines,
    otherServices,
    activeNav: 'services'
  });
};

