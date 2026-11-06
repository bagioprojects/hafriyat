/**
 * Makaleler Controller
 * %100 İnsan Editör Kalitesinde SEO Makaleleri ve Rehberler
 */

const siteConfig = require('../../config/site');
const blogPosts = require('../../data/blog');
const services = require('../../data/services');
const districts = require('../../data/districts');
const { generateSeoData } = require('../helpers/seoHelper');
const { getArticleSchema, getBreadcrumbSchema, getFaqSchema } = require('../helpers/schemaHelper');

exports.list = (req, res) => {
  const seo = generateSeoData({
    title: 'Hafriyat, Kepçe ve Forklift Rehberi | Makaleler',
    description: 'Yalova hafriyat, kanal kazma, temel açma, drenaj ve forklift kiralama hakkında gerçek şantiye tecrübesine dayalı uzman makaleler ve sektörel rehberler.',
    keywords: [
      'yalova kepçe rehberi',
      'forklift kiralama ipuçları',
      'çiftlikköy temel kazısı',
      'kanalizasyon kazı standartları',
      'keson su kuyusu nasıl açılır'
    ],
    canonicalPath: '/makaleler',
    breadcrumbs: [{ label: 'Makaleler & Rehber', url: '/makaleler' }]
  });

  res.render('pages/blogList', {
    siteConfig,
    seo,
    schemas: [getBreadcrumbSchema(seo.breadcrumbs)],
    posts: blogPosts,
    districts,
    activeNav: 'blog'
  });
};

exports.detail = (req, res, next) => {
  const { slug } = req.params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return next();
  }

  const otherPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);
  const featuredServices = services.slice(0, 4);

  const seo = generateSeoData({
    title: post.metaTitle,
    description: post.metaDesc,
    keywords: post.tags || [],
    ogType: 'article',
    canonicalPath: `/makaleler/${post.slug}`,
    breadcrumbs: [
      { label: 'Makaleler', url: '/makaleler' },
      { label: post.title, url: `/makaleler/${post.slug}` }
    ]
  });

  const schemas = [
    getArticleSchema(post),
    getBreadcrumbSchema(seo.breadcrumbs)
  ];

  if (post.faqs && post.faqs.length > 0) {
    const faqSchema = getFaqSchema(post.faqs);
    if (faqSchema) schemas.push(faqSchema);
  }

  res.render('pages/blogDetail', {
    siteConfig,
    seo,
    schemas,
    post,
    otherPosts,
    featuredServices,
    districts,
    activeNav: 'blog'
  });
};

