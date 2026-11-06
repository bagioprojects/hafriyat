/**
 * Kurumsal Sayfalar Controller (Hakkımızda, İletişim, Fiyat Teklifi)
 */

const siteConfig = require('../../config/site');
const services = require('../../data/services');
const districts = require('../../data/districts');
const machinery = require('../../data/machinery');
const { generateSeoData } = require('../helpers/seoHelper');
const { getLocalBusinessSchema, getBreadcrumbSchema } = require('../helpers/schemaHelper');

exports.about = (req, res) => {
  const seo = generateSeoData({
    title: 'Hakkımızda | Adem Hafriyat Yalova',
    description: 'Adem Hafriyat: 2012 yılından bu yana Yalova, Çiftlikköy ve Taşköprü bölgesinde güvenilir kepçe kiralama, forklift kiralama ve altyapı hafriyat çözümleri.',
    keywords: [
      'adem hafriyat hakkımızda',
      'yalova hafriyat firması',
      'çiftlikköy kepçe firmaları',
      'taşköprü iş makineleri',
      'güvenilir hafriyat yalova'
    ],
    canonicalPath: '/hakkimizda',
    breadcrumbs: [{ label: 'Hakkımızda', url: '/hakkimizda' }]
  });

  res.render('pages/about', {
    siteConfig,
    seo,
    schemas: [getLocalBusinessSchema(), getBreadcrumbSchema(seo.breadcrumbs)],
    machinery,
    districts,
    activeNav: 'about'
  });
};

exports.contact = (req, res) => {
  const seo = generateSeoData({
    title: 'İletişim & Ücretsiz Keşif | Adem Hafriyat',
    description: 'Adem Hafriyat iletişim bilgileri: Telefon 0532 720 20 10, 7/24 WhatsApp hattı, Çiftlikköy Taşköprü garajı. Yalova genelinde ücretsiz keşif talep edin.',
    keywords: [
      'adem hafriyat iletişim',
      'yalova kepçe telefon',
      'çiftlikköy forklift iletişim',
      'yalova hafriyat acil numara',
      '0532 720 20 10'
    ],
    canonicalPath: '/iletisim',
    breadcrumbs: [{ label: 'İletişim', url: '/iletisim' }]
  });

  res.render('pages/contact', {
    siteConfig,
    seo,
    schemas: [getLocalBusinessSchema(), getBreadcrumbSchema(seo.breadcrumbs)],
    services,
    districts,
    activeNav: 'contact'
  });
};

