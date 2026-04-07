const CACHE_NAME = 'basswoods-cache-v24';
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'assets/css/premium.css',
  'assets/css/basswoods-menu.css',
  'assets/js/basswoods-menu.js',
  'assets/js/responsive.js',
  'assets/pwa-icon.png',
  'wp-content/IMAGES/basswoods-logo.png',
  'offline.html'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching core BASSWOODS assets');
      return Promise.all(
        ASSETS_TO_CACHE.map(url => {
          return cache.add(url).catch(err => console.error(`[SW] Failed to cache: ${url}`, err));
        })
      );
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('offline.html');
        }
      });
    })
  );
});

