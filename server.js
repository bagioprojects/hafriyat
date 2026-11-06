/**
 * Adem Hafriyat — Yalovakepcehafriyat.com.tr
 * MVC Sunucu Başlatıcı (Server Core)
 */

const express = require('express');
const path = require('path');
const compression = require('compression');
const expressLayouts = require('express-ejs-layouts');
const { EventEmitter } = require('events');

// Max Listeners Sınırını Yükselt (Memory Leak Uyarılarını Önle)
EventEmitter.defaultMaxListeners = 30;

const siteConfig = require('./config/site');
const webRoutes = require('./src/routes/web');
const { generateSeoData } = require('./src/helpers/seoHelper');
const { cacheMiddleware } = require('./src/middleware/cacheMiddleware');

const app = express();
const PORT = process.env.PORT || 7450;

// Express Performans & Güvenlik Çekirdeği
app.disable('x-powered-by');
app.enable('view cache');
app.set('trust proxy', 1);

// Gzip Sıkıştırma (Ultra Hızlı Yüklenme & Core Web Vitals - Level 9)
app.use(compression({
  level: 9,
  threshold: 0
}));

// URL Encoded & JSON Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Performans & Güvenlik Başlıkları (CSP: Eval & Inline İzinli - DevTools & Eklenti Uyumlu)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' https: data:; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; " +
    "style-src 'self' 'unsafe-inline' https:; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' https: data:; " +
    "connect-src 'self' https:; " +
    "frame-src 'self' https:;"
  );
  next();
});

// Statik Dosyalar (CSS, JS, Görseller - 1 Yıl Agresif Immutable Önbellekleme)
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '365d',
  immutable: true,
  etag: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// EJS & Layout Ayarları
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Global Değişkenler (Tüm view'larda erişilebilir)
app.use((req, res, next) => {
  res.locals.siteConfig = siteConfig;
  res.locals.currentPath = req.path;
  next();
});

// In-Memory Microcache Katmanı (Sub-Millisecond TTFB Hızlandırması)
app.use(cacheMiddleware());

// Web Rotaları
app.use('/', webRoutes);

// 404 Sayfa Bulunamadı Yönetimi
app.use((req, res) => {
  res.status(404);
  const seo = generateSeoData({
    title: '404 Sayfa Bulunamadı',
    description: 'Aradığınız sayfa bulunamadı. Adem Hafriyat Yalova kepçe ve forklift kiralama hizmetlerimize ana sayfadan ulaşabilirsiniz.',
    canonicalPath: req.path
  });
  res.render('pages/404', {
    siteConfig,
    seo,
    schemas: [],
    activeNav: ''
  });
});

// 500 Genel Hata Yönetimi
app.use((err, req, res, next) => {
  console.error('[Sunucu Hatası]:', err);
  res.status(500).send('Sunucuda bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz.');
});

// Sunucuyu Başlat
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚜 Adem Hafriyat Web Platformu Yayında!`);
    console.log(`🌐 Site Adresi: http://localhost:${PORT}`);
    console.log(`📁 Ortam: ${process.env.NODE_ENV || 'development'}`);
    console.log(`⏱  7/24 Kesintisiz Kepçe & Forklift Servisi`);
    console.log(`====================================================`);
  });
}

module.exports = app;
