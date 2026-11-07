/**
 * SEO Yardımcısı
 * Dinamik Meta Başlıkları, Açıklamaları, Breadcrumb ve Canonical URL Üretici
 */

const siteConfig = require('../../config/site');
const defaultSeo = require('../../config/seo');

function generateSeoData({
  title,
  description,
  keywords,
  canonicalPath = '',
  ogType = 'website',
  ogImage = '/images/hero-kepce.jpg',
  robots,
  breadcrumbs = []
}) {
  let finalTitle;
  if (!title) {
    finalTitle = defaultSeo.defaultTitle;
  } else if (title.includes(siteConfig.companyName)) {
    finalTitle = title;
  } else {
    finalTitle = `${title} | ${siteConfig.companyName}`;
  }

  const finalDescription = description || defaultSeo.defaultDescription;
  const finalKeywords = keywords
    ? Array.from(new Set([...keywords, ...defaultSeo.defaultKeywords])).join(', ')
    : defaultSeo.defaultKeywords.join(', ');

  const canonicalUrl = `${siteConfig.siteUrl}${canonicalPath}`;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    canonicalUrl,
    ogType,
    ogImage: ogImage.startsWith('http') ? ogImage : `${siteConfig.siteUrl}${ogImage}`,
    robots: robots || defaultSeo.robots,
    language: defaultSeo.language,
    themeColor: defaultSeo.themeColor,
    breadcrumbs: [
      { label: 'Ana Sayfa', url: '/' },
      ...breadcrumbs
    ]
  };
}

module.exports = {
  generateSeoData
};

