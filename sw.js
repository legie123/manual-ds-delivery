const CACHE_NAME = 'ds-manual-v4';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './dragon-logo.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('api.open-meteo.com') || event.request.url.includes('events-live.json')) {
    return;
  }
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cache or fetch fresh
        return response || fetch(event.request).then(fetchRes => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchRes.clone());
            return fetchRes;
          });
        });
      })
  );
});
