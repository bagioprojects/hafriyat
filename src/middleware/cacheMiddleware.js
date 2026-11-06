/**
 * In-Memory Microcache Middleware
 * Sub-Millisecond (<1ms) TTFB, ETag, 304 Not Modified ve Stale-While-Revalidate Desteği
 */

const crypto = require('crypto');

// Basit ve ultra hızlı bellek içi önbellek deposu (RAM)
const cacheStore = new Map();
const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 Dakika TTL
const MAX_CACHE_ENTRIES = 500; // Bellek sızıntısını önleyen üst sınır

function generateETag(body) {
  return `"${crypto.createHash('md5').update(body).digest('hex')}"`;
}

function cacheMiddleware(ttlMs = DEFAULT_TTL_MS) {
  return (req, res, next) => {
    // Sadece GET istekleri önbelleğe alınır
    if (req.method !== 'GET') {
      return next();
    }

    // Geliştirici veya kullanıcı bypass parametresi (?nocache=1)
    if (req.query.nocache === '1') {
      res.setHeader('X-Cache', 'BYPASS');
      return next();
    }

    const cacheKey = req.originalUrl || req.url;
    const now = Date.now();
    const cached = cacheStore.get(cacheKey);

    if (cached && (now - cached.timestamp < ttlMs)) {
      // ETag Kontrolü - 304 Not Modified Desteği (0 Bayt Veri Transferi)
      const clientETag = req.headers['if-none-match'];
      if (clientETag && clientETag === cached.etag) {
        res.status(304).end();
        return;
      }

      // Cache Hit - Bellekten Anında Gönderim (<1ms)
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('ETag', cached.etag);
      res.setHeader('Last-Modified', cached.lastModified);
      res.setHeader('Cache-Control', 'public, max-age=120, s-maxage=600, stale-while-revalidate=86400');
      if (cached.contentType) {
        res.setHeader('Content-Type', cached.contentType);
      }
      return res.send(cached.body);
    }

    // Cache Miss - Yanıtı yakala ve belleğe kaydet
    res.setHeader('X-Cache', 'MISS');
    const originalSend = res.send.bind(res);

    res.send = (body) => {
      // Sadece başarılı yanıtlar (200 OK) önbelleğe alınır
      if (res.statusCode === 200 && (typeof body === 'string' || Buffer.isBuffer(body))) {
        // Bellek sınırını koru
        if (cacheStore.size >= MAX_CACHE_ENTRIES) {
          const firstKey = cacheStore.keys().next().value;
          cacheStore.delete(firstKey);
        }

        const etag = generateETag(body);
        const lastModified = new Date().toUTCString();
        const contentType = res.getHeader('Content-Type');

        cacheStore.set(cacheKey, {
          body,
          etag,
          lastModified,
          contentType,
          timestamp: now
        });

        res.setHeader('ETag', etag);
        res.setHeader('Last-Modified', lastModified);
        res.setHeader('Cache-Control', 'public, max-age=120, s-maxage=600, stale-while-revalidate=86400');
      }

      return originalSend(body);
    };

    next();
  };
}

module.exports = {
  cacheMiddleware,
  clearCache: () => cacheStore.clear()
};
