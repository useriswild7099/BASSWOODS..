const CACHE_NAME = 'basswoods-cache-v29';
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'about.html',
  'camping.html',
  'enquiries.html',
  'offbeat.html',
  'privacy.html',
  'rentals.html',
  'tours.html',
  'trekking.html',
  'vehicle-rentals.html',
  'assets/css/premium.css',
  'assets/css/basswoods-menu.css',
  'assets/js/basswoods-menu.js',
  'assets/js/responsive.js',
  'assets/pwa-icon.png',
  'wp-content/IMAGES/global/basswoods-logo.png',
  'wp-content/IMAGES/tours/ziro-festival.jpeg',
  'wp-content/IMAGES/tours/green-scenery.jpeg',
  'wp-content/IMAGES/tours/northeast-culture.jpeg',
  'wp-content/IMAGES/tours/bonfire-lake.jpeg',
  'wp-content/IMAGES/backgrounds/road-biker.jpeg',
  'wp-content/IMAGES/backgrounds/van.jpeg',
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

// Fetch Event - Stale While Revalidate / Dynamic Caching
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // Exclude chrome-extension, APIs, etc.
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Dynamically cache successful responses
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Network failed (offline). If we have a cached response, it was already handled above? No, we return it either way.
        return null;
      });

      // Return cached response immediately if available (stale), while network fetch happens in background
      // If not in cache, wait for the network fetch
      return cachedResponse || fetchPromise.then(res => res || Promise.reject('no-network-and-no-cache'));
    }).catch(() => {
      // If both cache and network fail, show offline fallback for navigation requests
      if (event.request.mode === 'navigate') {
        return caches.match('offline.html');
      }
    })
  );
});

