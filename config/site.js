/**
 * Site ve Kurumsal Bilgi Yapılandırması
 * Firma: Adem Hafriyat - Yalova Kepçe ve Forklift Kiralama
 */

module.exports = {
  companyName: 'Adem Hafriyat',
  tradeName: 'Yalova Kepçe ve Forklift Kiralama Hizmetleri',
  siteUrl: process.env.SITE_URL || 'https://yalovakepcehafriyat.com.tr',
  phone: process.env.COMPANY_PHONE || '0532 720 20 10',
  phoneRaw: process.env.COMPANY_PHONE_RAW || '+905327202010',
  whatsapp: process.env.COMPANY_WHATSAPP || '905327202010',
  whatsappMessage: 'Merhaba Adem Hafriyat, Yalova kepçe / forklift kiralama hizmetiniz hakkında bilgi ve fiyat teklifi almak istiyorum.',
  email: process.env.COMPANY_EMAIL || 'info@yalovakepcehafriyat.com.tr',
  address: {
    streetAddress: 'Taşköprü Sanayi Caddesi No: 18 / Çiftlikköy',
    addressLocality: 'Çiftlikköy',
    addressRegion: 'Yalova',
    postalCode: '77600',
    addressCountry: 'TR'
  },
  geo: {
    latitude: 40.6628,
    longitude: 29.3512
  },
  openingHours: 'Mo-Su 00:00-24:00', // 7/24 Acil Kepçe & Forklift Hizmeti
  priceRange: '₺₺',
  establishedYear: 2012,
  social: {
    instagram: 'https://instagram.com/ademhafriyat_yalova',
    facebook: 'https://facebook.com/ademhafriyatyalova'
  },
  badges: [
    '7/24 Acil Kepçe & Forklift Servisi',
    'G Sınıfı Ehliyetli Uzman Operatörler',
    'Son Model JCB & Mini Ekskavatör Filosu',
    'Yalova & Tüm İlçelerde Hızlı Keşif & Şeffaf Fiyat'
  ]
};

