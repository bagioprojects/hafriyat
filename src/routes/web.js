/**
 * Web Rotaları
 * SEO Uyumlu, Temiz, Anlamlı URL Yapısı ve LLM/AI Uç Noktaları
 */

const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const serviceController = require('../controllers/serviceController');
const districtController = require('../controllers/districtController');
const machineryController = require('../controllers/machineryController');
const blogController = require('../controllers/blogController');
const pageController = require('../controllers/pageController');
const sitemapController = require('../controllers/sitemapController');

// Ana Sayfa
router.get('/', homeController.index);

// Hizmetlerimiz
router.get('/hizmetlerimiz', serviceController.list);
router.get('/hizmetlerimiz/:slug', serviceController.detail);

// Bölgelerimiz (İlçe, Mahalle ve Köy Sayfaları)
router.get('/bolgeler/:districtSlug', districtController.detail);
router.get('/bolgeler/:districtSlug/mahalle/:neighborhoodSlug', districtController.neighborhoodDetail);
router.get('/bolgeler/:districtSlug/:serviceSlug', districtController.districtService);

// Makine Parkuru
router.get('/makinelerimiz', machineryController.list);
router.get('/makinelerimiz/:slug', machineryController.detail);

// Makaleler / Bilgi Merkezi
router.get('/makaleler', blogController.list);
router.get('/makaleler/:slug', blogController.detail);

// Kurumsal Sayfalar
router.get('/hakkimizda', pageController.about);
router.get('/iletisim', pageController.contact);
router.get('/site-haritasi', sitemapController.htmlSitemap);

// XML Sitemap İndeksi & Alt Modüller
router.get('/sitemap.xml', sitemapController.sitemapIndex);
router.get('/sitemap-main.xml', sitemapController.sitemapMain);
router.get('/sitemap-services.xml', sitemapController.sitemapServices);
router.get('/sitemap-districts.xml', sitemapController.sitemapDistricts);
router.get('/sitemap-localities.xml', sitemapController.sitemapLocalities);
router.get('/sitemap-machinery.xml', sitemapController.sitemapMachinery);
router.get('/sitemap-blog.xml', sitemapController.sitemapBlog);

// Yapay Zeka (AI / LLM) ve Arama Motoru Dosyaları
router.get('/robots.txt', sitemapController.robotsTxt);
router.get('/llms.txt', sitemapController.llmsTxt);
router.get('/llms-full.txt', sitemapController.llmsFullTxt);
router.get('/ai.json', sitemapController.aiJson);

module.exports = router;
