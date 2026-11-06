/**
 * Dinamik XML Sitemap ve robots.txt Üretici
 * Google, Bing ve Yandex botları için %100 Taranabilirlik
 */

const siteConfig = require('../../config/site');
const services = require('../../data/services');
const districts = require('../../data/districts');
const machinery = require('../../data/machinery');
const blogPosts = require('../../data/blog');

exports.sitemapXml = (req, res) => {
  const baseUrl = siteConfig.siteUrl;
  const currentDate = new Date().toISOString().split('T')[0];

  const urls = [];

  // Ana Sayfa
  urls.push({ loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily', lastmod: currentDate });

  // Hizmetlerimiz Ana & Detaylar
  urls.push({ loc: `${baseUrl}/hizmetlerimiz`, priority: '0.9', changefreq: 'weekly', lastmod: currentDate });
  services.forEach(service => {
    urls.push({
      loc: `${baseUrl}/hizmetlerimiz/${service.slug}`,
      priority: service.isHero ? '0.95' : '0.85',
      changefreq: 'weekly',
      lastmod: currentDate
    });
  });

  // İlçeler & Bölgeler
  districts.forEach(district => {
    urls.push({
      loc: `${baseUrl}/bolgeler/${district.slug}`,
      priority: district.priority <= 2 ? '0.9' : '0.8',
      changefreq: 'weekly',
      lastmod: currentDate
    });

    // İlçe x Hizmet Çapraz SEO Linkleri (Örn: Çiftlikköy Kanal Kazma, Taşköprü Forklift Kiralama)
    services.forEach(service => {
      urls.push({
        loc: `${baseUrl}/bolgeler/${district.slug}/${service.slug}`,
        priority: '0.75',
        changefreq: 'monthly',
        lastmod: currentDate
      });
    });
  });

  // Makinelerimiz
  urls.push({ loc: `${baseUrl}/makinelerimiz`, priority: '0.8', changefreq: 'weekly', lastmod: currentDate });
  machinery.forEach(machine => {
    urls.push({
      loc: `${baseUrl}/makinelerimiz/${machine.slug}`,
      priority: '0.75',
      changefreq: 'monthly',
      lastmod: currentDate
    });
  });

  // Makaleler / Blog
  urls.push({ loc: `${baseUrl}/makaleler`, priority: '0.85', changefreq: 'weekly', lastmod: currentDate });
  blogPosts.forEach(post => {
    urls.push({
      loc: `${baseUrl}/makaleler/${post.slug}`,
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: post.date || currentDate
    });
  });

  // Kurumsal Sayfalar
  urls.push({ loc: `${baseUrl}/hakkimizda`, priority: '0.6', changefreq: 'monthly', lastmod: currentDate });
  urls.push({ loc: `${baseUrl}/iletisim`, priority: '0.7', changefreq: 'monthly', lastmod: currentDate });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
};

exports.robotsTxt = (req, res) => {
  const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteConfig.siteUrl}/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  res.send(robots);
};

