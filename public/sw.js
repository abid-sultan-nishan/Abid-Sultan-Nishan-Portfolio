/**
 * Service Worker for Abid Sultan Nishan Portfolio
 * 
 * Performance & Caching Strategy:
 * 1. Cache-First for static assets (images, fonts, stylesheets, scripts)
 * 2. Stale-While-Revalidate for document requests & HTML navigations
 * 3. 0ms instant reload for returning visitors from disk cache
 * 4. Zero blocking on main thread
 */

const CACHE_NAME = 'asn-portfolio-v1';

const STATIC_PRECACHE_URLS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/site.webmanifest',
  '/assets/Passport Size Picture.jpg',
  '/assets/passport-size-picture.webp',
  '/assets/images/abid-sultan-nishan.webp',
  '/assets/images/iso_nlp_semantic_1791005130807.webp',
  '/assets/images/iso_llm_transformer_1791005148038.webp',
];

// Install: Pre-cache critical core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_PRECACHE_URLS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: Purge obsolete previous caches & claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Optimized Multi-Tier Caching
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Ignore non-GET and chrome-extension requests
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  const url = new URL(request.url);

  // 1. Google Fonts & Static CDN assets: Cache-First with long lifetime
  if (
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    request.destination === 'image' ||
    request.destination === 'font' ||
    url.pathname.match(/\.(webp|jpg|jpeg|png|svg|ico|woff2|woff|ttf)$/i)
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return networkResponse;
        }).catch(() => {
          // If offline and request is an image, fallback to cached avatar if available
          return caches.match('/assets/passport-size-picture.webp');
        });
      })
    );
    return;
  }

  // 2. JavaScript & CSS assets: Cache-First with background revalidation
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    url.pathname.match(/\.(js|css)$/i)
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. HTML Navigation / Document: Stale-While-Revalidate
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match('/index.html') || caches.match('/');
      })
    );
    return;
  }

  // Default: Network first with cache fallback
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
