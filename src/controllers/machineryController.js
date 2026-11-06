/**
 * Makine Parkuru Controller
 * Kiralık Kepçe, Bekoloder ve Forklift Filosu
 */

const siteConfig = require('../../config/site');
const machinery = require('../../data/machinery');
const services = require('../../data/services');
const districts = require('../../data/districts');
const { generateSeoData } = require('../helpers/seoHelper');
const { getBreadcrumbSchema } = require('../helpers/schemaHelper');

exports.list = (req, res) => {
  const seo = generateSeoData({
    title: 'Makine Parkurumuz | Yalova Kiralık Kepçe ve Forklift Filosu',
    description: 'Adem Hafriyat makine filosu: JCB 3CX Bekoloder, Cat Mini Ekskavatör, 22 Ton Paletli Ekskavatör, 3-5 Ton Dizel ve Akülü Forkliftler. 7/24 hizmetinizde.',
    keywords: [
      'yalova makine parkuru',
      'kiralık jcb yalova',
      'mini kepçe kiralama yalova',
      'kiralık forklift modelleri yalova',
      'paletli ekskavatör yalova'
    ],
    canonicalPath: '/makinelerimiz',
    breadcrumbs: [{ label: 'Makine Parkurumuz', url: '/makinelerimiz' }]
  });

  res.render('pages/machineryList', {
    siteConfig,
    seo,
    schemas: [getBreadcrumbSchema(seo.breadcrumbs)],
    machinery,
    districts,
    activeNav: 'machinery'
  });
};

exports.detail = (req, res, next) => {
  const { slug } = req.params;
  const machine = machinery.find(m => m.slug === slug);

  if (!machine) {
    return next();
  }

  const otherMachines = machinery.filter(m => m.id !== machine.id);

  const seo = generateSeoData({
    title: machine.title,
    description: `${machine.name} saatlik, günlük ve aylık kiralama. ${machine.bestFor.join(', ')} için Yalova ve Çiftlikköy genelinde hizmetinizde.`,
    canonicalPath: `/makinelerimiz/${machine.slug}`,
    breadcrumbs: [
      { label: 'Makine Parkurumuz', url: '/makinelerimiz' },
      { label: machine.name, url: `/makinelerimiz/${machine.slug}` }
    ]
  });

  res.render('pages/machineDetail', {
    siteConfig,
    seo,
    schemas: [getBreadcrumbSchema(seo.breadcrumbs)],
    machine,
    otherMachines,
    services,
    districts,
    activeNav: 'machinery'
  });
};

