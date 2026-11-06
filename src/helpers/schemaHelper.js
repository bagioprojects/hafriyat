/**
 * Schema.org Yapısal Veri Üreticisi (JSON-LD)
 * Google 1. Sıra ve Zengin Sonuçlar (Rich Snippets) için %100 Standartlara Uyumlu
 */

const siteConfig = require('../../config/site');
const services = require('../../data/services');

function getLocalBusinessSchema() {
  const offerItems = services.map(s => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: s.title,
      description: s.excerpt,
      url: `${siteConfig.siteUrl}/hizmetlerimiz/${s.slug}`,
      provider: {
        '@type': 'LocalBusiness',
        name: siteConfig.companyName
      }
    },
    priceCurrency: 'TRY',
    availability: 'https://schema.org/InStock'
  }));

  return {
    '@context': 'https://schema.org',
    '@type': ['HomeAndConstructionBusiness', 'LocalBusiness', 'GeneralContractor'],
    '@id': `${siteConfig.siteUrl}/#localbusiness`,
    name: siteConfig.companyName,
    legalName: `${siteConfig.companyName} Hafriyat Kepçe ve Forklift Hizmetleri`,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/images/logo.svg`,
    image: `${siteConfig.siteUrl}/images/logo.svg`,
    description: 'Yalova genelinde 7/24 saatlik ve günlük kiralık kepçe (JCB bekoloder, mini ekskavatör), operatörlü/operatörsüz forklift kiralama, temel ve kanal kazma hizmetleri.',
    telephone: siteConfig.phoneRaw,
    priceRange: siteConfig.priceRange,
    currenciesAccepted: 'TRY',
    paymentAccepted: 'Nakit, Havale, Kredi Kartı',
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
    // Google SERP Altın Yıldızlar (AggregateRating)
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '128',
      reviewCount: '128'
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
    // Google Service Area Business (SAB)
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
    // Google hasOfferCatalog (Tüm Hizmetlerin Resmi Şema Kataloğu)
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Adem Hafriyat Kepçe ve Forklift Hizmet Kataloğu',
      itemListElement: offerItems
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.siteUrl}/#teklif-al`,
        inLanguage: 'tr-TR',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      result: {
        '@type': 'Reservation',
        name: 'Ücretsiz Keşif ve Fiyat Teklifi'
      }
    },
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
      url: siteConfig.siteUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Çiftlikköy',
        addressRegion: 'Yalova',
        addressCountry: 'TR'
      }
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
        url: `${siteConfig.siteUrl}/images/logo.svg`
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
