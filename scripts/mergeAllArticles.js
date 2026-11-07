const fs = require('fs');
const path = require('path');

const currentBlog = require('../data/blog.js');
const phase1 = require('./generatePhase1Articles.js');
const phase2 = require('./generatePhase2Articles.js');
const phase3 = require('./generatePhase3Articles.js');

console.log('Current articles count:', currentBlog.length);
console.log('Phase 1 articles count:', phase1.length);
console.log('Phase 2 articles count:', phase2.length);
console.log('Phase 3 articles count:', phase3.length);

const allArticles = [...currentBlog, ...phase1, ...phase2, ...phase3];
console.log('Combined total articles:', allArticles.length);

// ID re-sequencing and unique slug check
const seenSlugs = new Set();
allArticles.forEach((article, index) => {
  article.id = index + 1;
  if (seenSlugs.has(article.slug)) {
    throw new Error(`Duplicate slug detected: ${article.slug}`);
  }
  seenSlugs.add(article.slug);

  // Validate required fields
  if (!article.title || !article.metaTitle || !article.metaDesc || !article.content) {
    throw new Error(`Article ${article.id} (${article.slug}) is missing critical fields`);
  }
  if (!article.faqs || article.faqs.length === 0) {
    throw new Error(`Article ${article.id} (${article.slug}) has no FAQs`);
  }
});

const fileHeader = `/**
 * Blog & Sektörel Rehber Külliyatı - Adem Hafriyat
 * Yalova Kepçe, Kiralık Kepçe, Operatörlü Kepçe ve Forklift Çözümleri
 * Toplam ${allArticles.length} Adet %100 SEO & GEO Uyumlu Makale ve Özel FAQ Külliyatı
 */

module.exports = `;

const content = fileHeader + JSON.stringify(allArticles, null, 2) + ';\n';
fs.writeFileSync(path.join(__dirname, '../data/blog.js'), content, 'utf8');
console.log(`Successfully merged and saved ${allArticles.length} articles into data/blog.js!`);
