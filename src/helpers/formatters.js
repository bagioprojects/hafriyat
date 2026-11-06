/**
 * Metin ve Veri Biçimlendirme Yardımcıları
 */

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function truncate(text, length = 160) {
  if (!text || text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

function slugify(text) {
  const trMap = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u'
  };
  return text
    .split('')
    .map(char => trMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

module.exports = {
  formatDate,
  truncate,
  slugify
};

