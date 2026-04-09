importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

if (workbox) {
  console.log('[SW] BASSWOODS Workbox loaded');

  // Cache names
  const CACHE_VERSION = 'v35';
  const PRECACHE_NAME = `basswoods-precache-${CACHE_VERSION}`;
  const IMAGE_CACHE_NAME = `basswoods-images-${CACHE_VERSION}`;

  // 1. Pre-caching Core UI Assets
  workbox.precaching.precacheAndRoute([
    { url: './', revision: CACHE_VERSION },
    { url: 'index.html', revision: CACHE_VERSION },
    { url: 'about.html', revision: CACHE_VERSION },
    { url: 'camping.html', revision: CACHE_VERSION },
    { url: 'enquiries.html', revision: CACHE_VERSION },
    { url: 'offbeat.html', revision: CACHE_VERSION },
    { url: 'privacy.html', revision: CACHE_VERSION },
    { url: 'rentals.html', revision: CACHE_VERSION },
    { url: 'tours.html', revision: CACHE_VERSION },
    { url: 'trekking.html', revision: CACHE_VERSION },
    { url: 'vehicle-rentals.html', revision: CACHE_VERSION },
    { url: 'assets/css/premium.css', revision: CACHE_VERSION },
    { url: 'assets/css/basswoods-menu.css', revision: CACHE_VERSION },
    { url: 'assets/js/basswoods-menu.js', revision: CACHE_VERSION },
    { url: 'assets/js/responsive.js', revision: CACHE_VERSION },
    { url: 'wp-content/IMAGES/backgrounds/green-artistic.jpeg', revision: CACHE_VERSION },
    { url: 'offline.html', revision: CACHE_VERSION },
    { url: '404.html', revision: CACHE_VERSION },
    { url: 'menu_snippet.html', revision: CACHE_VERSION },
    { url: 'map_snippet.html', revision: CACHE_VERSION }
  ]);

  // 2. CSS & JS (Stale-While-Revalidate)
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'style' || request.destination === 'script',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'basswoods-static-resources',
    })
  );

  // 3. Images (Cache First)
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: IMAGE_CACHE_NAME,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );

  // 4. Navigation Fallback
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    async ({ event }) => {
      try {
        return await new workbox.strategies.NetworkFirst({
          cacheName: 'basswoods-pages',
        }).handle({ event, request: event.request });
      } catch (error) {
        return caches.match('offline.html');
      }
    }
  );

} else {
  console.log('[SW] Workbox failed to load');
}



