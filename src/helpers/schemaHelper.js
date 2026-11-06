/**
 * Schema.org Yapısal Veri Üreticisi (JSON-LD)
 * Google Zengin Sonuçları (Rich Results) için %100 Uyumlu
 */

const siteConfig = require('../../config/site');

function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'],
    '@id': `${siteConfig.siteUrl}/#localbusiness`,
    name: siteConfig.companyName,
    legalName: `${siteConfig.companyName} Hafriyat Kepçe ve Forklift Hizmetleri`,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/images/logo.png`,
    image: `${siteConfig.siteUrl}/images/hero-kepce.jpg`,
    description: 'Yalova, Çiftlikköy ve Taşköprü genelinde 7/24 saatlik ve günlük kiralık kepçe (JCB bekoloder, mini ekskavatör), operatörlü/operatörsüz forklift kiralama, temel ve kanal kazma hizmetleri.',
    telephone: siteConfig.phoneRaw,
    priceRange: siteConfig.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '00:00',
        closes: '23:59'
      }
    ],
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Yalova' },
      { '@type': 'AdministrativeArea', name: 'Çiftlikköy' },
      { '@type': 'AdministrativeArea', name: 'Taşköprü' },
      { '@type': 'AdministrativeArea', name: 'Yalova Merkez' },
      { '@type': 'AdministrativeArea', name: 'Altınova' },
      { '@type': 'AdministrativeArea', name: 'Çınarcık' },
      { '@type': 'AdministrativeArea', name: 'Termal' },
      { '@type': 'AdministrativeArea', name: 'Armutlu' }
    ],
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook
    ]
  };
}

function getServiceSchema(service, district = null) {
  const areaName = district ? district.name : 'Yalova ve Tüm İlçeleri';
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteConfig.siteUrl}/hizmetlerimiz/${service.slug}#service`,
    name: district ? `${district.name} ${service.title}` : service.title,
    serviceType: service.category === 'forklift' ? 'Forklift Kiralama' : 'Hafriyat ve Kepçe Kiralama',
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.companyName,
      telephone: siteConfig.phoneRaw,
      url: siteConfig.siteUrl
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: areaName
    },
    description: service.excerpt,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01'
    }
  };
}

function getBreadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.url.startsWith('http') ? item.url : `${siteConfig.siteUrl}${item.url}`
    }))
  };
}

function getFaqSchema(faqs = []) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

function getArticleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image.startsWith('http') ? article.image : `${siteConfig.siteUrl}${article.image}`,
    author: {
      '@type': 'Organization',
      name: siteConfig.companyName,
      url: siteConfig.siteUrl
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.companyName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.siteUrl}/images/logo.png`
      }
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.siteUrl}/makaleler/${article.slug}`
    }
  };
}

module.exports = {
  getLocalBusinessSchema,
  getServiceSchema,
  getBreadcrumbSchema,
  getFaqSchema,
  getArticleSchema
};

