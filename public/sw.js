/**
 * Adem Hafriyat - Progressive Web App (PWA) Service Worker
 * Yalova Kepçe ve Forklift Kiralama Çevrimdışı / Hızlı Önbellek Motoru
 */

const CACHE_NAME = 'adem-hafriyat-v1.3.4';
const STATIC_ASSETS = [
  '/',
  '/css/theme.css?v=1.3.3',
  '/css/main.css?v=1.3.3',
  '/js/main.js',
  '/images/logo.svg?v=1.3.4',
  '/images/favicon.svg',
  '/favicon.ico',
  '/manifest.json'
];

// 1. Service Worker Kurulumu (Install)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. Eski Önbellekleri Temizleme (Activate)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Ağ İsteklerini Yakalama (Stale-While-Revalidate & Network-First)
self.addEventListener('fetch', (event) => {
  const req = event.request;
  
  // Sadece GET isteklerini işle, API veya harici servislere dokunma
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) {
    return;
  }

  // HTML sayfaları için: Network-First (Her zaman güncel içerik)
  if (req.headers.get('accept') && req.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(req).catch(() => caches.match(req).then((cached) => cached || caches.match('/')))
    );
    return;
  }

  // Statik dosyalar (CSS, JS, Görseller) için: Cache-First + Arka Planda Güncelle
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req).then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        }
        return networkRes;
      }).catch(() => {});
      return cached || fetchPromise;
    })
  );
});
