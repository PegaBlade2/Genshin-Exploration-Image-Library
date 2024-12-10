const cacheName = 'genshin-images-cache-v1';
const assets = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/img/Chasca Mondstadt-Liyue.png',
    '/img/Waypoint Sunset Liyue.png',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(assets);
        })
    );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [cacheName];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch assets from cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
